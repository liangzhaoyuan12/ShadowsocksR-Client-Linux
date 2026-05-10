use std::fs;

use anyhow::{Result, anyhow};
use tauri::async_runtime::Mutex;
use tauri_plugin_shell::{ShellExt, process::CommandChild};
use once_cell::sync::OnceCell;
use super::get_path::home_dir;
use super::proxy;
use super::model::{ShadowsocksConfig, RouteMode};
use super::router;

struct ProcState {
    child: CommandChild,
    ssr_port: u16,
    listen_port: u16,
    temp_cfg_path: std::path::PathBuf,
}

static GLOBAL_PROC: OnceCell<Mutex<Option<ProcState>>> = OnceCell::new();

fn get_global_proc() -> &'static Mutex<Option<ProcState>> {
    GLOBAL_PROC.get_or_init(|| Mutex::new(None))
}

fn kill_ssr_sidecar() {
    // SIGTERM 先尝试优雅退出
    let _ = std::process::Command::new("pkill")
        .arg("-f").arg("ssr-native-client")
        .output();
    // 等 500ms 后 SIGKILL 强杀
    std::thread::sleep(std::time::Duration::from_millis(500));
    let _ = std::process::Command::new("pkill")
        .arg("-9").arg("-f").arg("ssr-native-client")
        .output();
}

pub async fn enable(
    cfg_name: &str,
    app: tauri::AppHandle,
    modify_env: bool,
    route_mode: RouteMode,
) -> Result<()> {
    let path = home_dir();
    let cfg_file_name = format!("{}.json", cfg_name);
    let path = path.join(cfg_file_name);
    if !path.exists() {
        return Err(anyhow!("the config file doesn't exist"));
    }

    let proc_guard = get_global_proc();
    let mut guard = proc_guard.lock().await;
    if guard.is_some() {
        return Err(anyhow!("ssr client has been already run"));
    }

    let config_str = fs::read_to_string(path.clone())?;
    let mut config: ShadowsocksConfig = serde_json::from_str(&config_str)?;
    let listen_port = config.client_settings.listen_port;
    let ssr_port = config.client_settings.ssr_service_port;

    // 路由端口与 SSR 服务端口不能相同
    if listen_port == ssr_port {
        return Err(anyhow!(
            "router port ({}) and SSR service port ({}) must be different",
            listen_port, ssr_port
        ));
    }

    // 创建临时配置文件，将 listen_port 改为 ssr_port 给 ssr-native-client 用
    config.client_settings.listen_port = ssr_port;
    let temp_cfg_path = path.with_file_name(format!("{}.tmp.json", cfg_name));
    let temp_cfg_str = serde_json::to_string_pretty(&config)?;
    fs::write(&temp_cfg_path, temp_cfg_str)?;

    // 设置路由器分流模式
    router::set_route_mode(route_mode);

    // 用临时配置启动 ssr-native-client（监听 ssr_port）
    let sidecar_command = app.shell()
        .sidecar("ssr-native-client")?
        .arg("-c")
        .arg(&temp_cfg_path)
        .arg("-d");
    let (mut _rx, mut _child) = sidecar_command.spawn()?;

    // 在 listen_port 上启动路由器，转发到 ssr_port
    if let Err(e) = router::start(listen_port, ssr_port).await {
        // 路由器启动失败，清理 sidecar 和临时配置文件
        let _ = _child.kill();
        kill_ssr_sidecar();
        let _ = fs::remove_file(&temp_cfg_path);
        return Err(anyhow!("router start failed: {}", e));
    }

    *guard = Some(ProcState { child: _child, ssr_port, listen_port, temp_cfg_path });
    // 系统代理设置全部指向路由端口（listen_port）
    proxy::enable(listen_port, modify_env).await;

    Ok(())
}

pub async fn disable(modify_env: bool) -> Result<()> {
    let mut guard = get_global_proc().lock().await;
    if guard.is_none() {
        return Err(anyhow!("ssr client isn't running"));
    }
    let proc_state = guard.take().unwrap();

    // 先停路由器
    router::stop().await;

    // 杀死 tracked 进程
    let _ = proc_state.child.kill();
    // 由于 -d daemon 模式，需要强制杀死 daemon 子进程
    kill_ssr_sidecar();

    // 删除临时配置文件
    let _ = fs::remove_file(&proc_state.temp_cfg_path);

    proxy::disable(modify_env).await;

    Ok(())
}
