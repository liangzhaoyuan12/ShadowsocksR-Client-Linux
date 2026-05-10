use std::fs;

use anyhow::{Result, anyhow};
use tauri::async_runtime::Mutex;
use tauri_plugin_shell::{ShellExt, process::CommandChild};
use once_cell::sync::OnceCell;
use super::get_path::home_dir;
use super::proxy;
use super::model::ShadowsocksConfig;
static GLOBAL_PROC: OnceCell<Mutex<Option<CommandChild>>> = OnceCell::new();
// 设置和获取GLOBAL_PROC
fn get_global_proc() -> &'static Mutex<Option<CommandChild>> {
    GLOBAL_PROC.get_or_init(|| Mutex::new(None))
}
pub async fn enable(cfg_name: &str, app: tauri::AppHandle) -> Result<()> {
    let path = home_dir();
    let cfg_file_name = format!("{}.json", cfg_name);
    let path = path.join(cfg_file_name);
    if !path.exists() {
        // 文件不存在
        return Err(anyhow!("the config file doesn't exist"));
    }

    // 判断ssr-native实例是否已经在运行
    // 只允许同时运行一个实例
    let proc_guard = get_global_proc();
    let mut guard = proc_guard.lock().await;
    if guard.is_some() {
        return Err(anyhow!("ssr client has been already run"));
    }
    // 从指定的配置文件中获得代理端口
    let config_str = fs::read_to_string(path.clone())?;
    let config: ShadowsocksConfig = serde_json::from_str(&config_str)?;
    let port = config.client_settings.listen_port;
    let sidecar_command = app.shell()
        .sidecar("ssr-native-client")?
        .arg("-c")
        .arg(path)
        .arg("-d");
    let (mut _rx, mut _child) = sidecar_command.spawn()?;
    
    *guard = Some(_child);
    proxy::enable(port).await;

    return Ok(());
}

pub async fn disable() -> Result<()> {
    let mut guard = get_global_proc().lock().await;
    if guard.is_none() {
        // 没有已运行的实例
        return Err(anyhow!("ssr client isn't running"));
    }
    if let Some(child) = guard.take() {
        let _ = child.kill();
    }
    // 由于 ssr-native-client 使用 -d 参数以 daemon 模式运行，
    // 父进程 fork 后退出，CommandChild 跟踪的是已退出的父进程，
    // 因此需要通过进程名强制杀死 daemon 子进程。
    let _ = std::process::Command::new("pkill")
        .arg("-9")
        .arg("-f")
        .arg("ssr-native-client")
        .output();
    proxy::disable().await;
    return Ok(());
}