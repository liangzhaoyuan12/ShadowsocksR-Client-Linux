mod insert_cfg_file;
mod model;
mod remove_cfg_file;
mod get_cfg;
mod ssr_process;
mod proxy;
mod router;
mod china_ip;
mod get_path;
mod notification;
use model::*;
use insert_cfg_file as insert_cfg_file_static;
use remove_cfg_file as remove_cfg_file_static;
use get_cfg::get_cfg_list as get_cfg_list_static;
use get_cfg::get_cfg_info as get_cfg_info_static;
use tauri::{Manager, WindowEvent};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // 在关闭前执行关闭ssr进程程序
        .setup(|app|{
            let main_window = app.get_webview_window("main").unwrap();
            let app_handle = app.handle().clone();
            main_window.clone().on_window_event(move |event| {
                match event {
                    WindowEvent::CloseRequested { api, .. } => {
                        api.prevent_close();
                        let app_handle = app_handle.clone();
                        let window = main_window.clone();
                        // 执行关闭ssr进程程序
                        tauri::async_runtime::spawn(async move {
                            let _ = ssr_process::disable(true).await;
                            drop(window);
                            app_handle.exit(0);
                        });
                    }
                    _ => {}
                }
            });
            Ok(())
        })
        .plugin(tauri_plugin_window_state::Builder::new().build())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_single_instance::init(|_app, _args, _cwd| {}))
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            insert_cfg_file, 
            remove_cfg_file, 
            get_cfg_list, 
            get_cfg_info,
            enable_proxy,
            disable_proxy])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


/**
 * 传入json数据
 * 对原有的配置文件进行覆盖修改也是这个函数
 * 要求：
 * cfg_name只能存在英文大小写字母
 * listen_address锁死为0.0.0.0
{
    "cfg_name": "xxxxxx",
    "password": "password",
    "method": "aes-128-ctr",
    "protocol": "auth_aes128_md5",
    "protocol_param": "",
    "obfs": "tls1.2_ticket_auth",
    "obfs_param": "",

    "udp": true,
    "idle_timeout": 300,
    "connect_timeout": 6,
    "udp_timeout": 6,

    "client_settings": {
        "server": "12.34.56.78",
        "server_port": 12475,
        "listen_address": "0.0.0.0",
        "listen_port": 1080
    }
}
 */
#[tauri::command]
async fn insert_cfg_file(data: &str) -> Result<String,String> {
    match insert_cfg_file_static::insert_cfg_file(data.to_string()) {
        Ok(_) => {
            let response = status_response::new(status_type::success, "");
            return Ok(response.to_string());
        },
        Err(_) => {
            let response = status_response::new(status_type::failure, "failed to create the config file");
            return Err(response.to_string());
        }
    }
}
/**
 * 删除配置文件
 * 直接传入配置文件名字
 */
#[tauri::command]
async fn remove_cfg_file(cfg_name: &str) -> Result<String, String> {
    match remove_cfg_file_static::remove_cfg_file(cfg_name) {
        Ok(_) => {
            let response = status_response::new(status_type::success, "");
            return Ok(response.to_string());
        },
        Err(_) => {
            let response = status_response::new(status_type::failure, "failed to remove the config file");
            return Err(response.to_string());
        }
    }
}
/**
 * 获得配置列表
{
  "status_type": "success",
  "msg": "
    {
        "cfg_list": ["config1", "config2", "config3"]
    }
  "
}
 */
#[tauri::command]
async fn get_cfg_list() -> Result<String, String> {
    match get_cfg_list_static() {
        Ok(data) => {
            let response = status_response::new(status_type::success, &data);
            return Ok(response.to_string());
        },
        Err(_) => {
            let response = status_response::new(status_type::failure, "failed to get config list");
            return Err(response.to_string());
        }
    }
}

/**
 * 获得单个配置的详细信息
{
  "status_type": "success",
  "msg": "
        {
            "cfg_name": "xxxxxx",
            "password": "password",
            "method": "aes-128-ctr",
            "protocol": "auth_aes128_md5",
            "protocol_param": "",
            "obfs": "tls1.2_ticket_auth",
            "obfs_param": "",

            "udp": true,
            "idle_timeout": 300,
            "connect_timeout": 6,
            "udp_timeout": 6,

            "client_settings": {
                "server": "12.34.56.78",
                "server_port": 12475,
                "listen_address": "0.0.0.0",
                "listen_port": 1080
            }
        }
  "
}
 */
#[tauri::command]
async fn get_cfg_info(cfg_name: &str) -> Result<String, String> {
    match get_cfg_info_static(cfg_name) {
        Ok(data) => {
            let response = status_response::new(status_type::success, &data);
            return Ok(response.to_string());
        },
        Err(_) => {
            let response = status_response::new(status_type::failure, "failed to get the config info");
            return Err(response.to_string());
        }
    }
}

#[tauri::command]
async fn enable_proxy(app: tauri::AppHandle, cfg_name: &str, modify_env: bool, route_mode: &str) -> Result<String, String> {
    let mode = RouteMode::from_str(route_mode).unwrap_or(RouteMode::Global);
    match ssr_process::enable(cfg_name, app, modify_env, mode).await {
        Ok(_) => {
            let response = status_response::new(status_type::success, "");
            return Ok(response.to_string());
        },
        Err(_) => {
            let response = status_response::new(status_type::failure, "failed to enable proxy");
            return Err(response.to_string());
        }
    }
}

#[tauri::command]
async fn disable_proxy(modify_env: bool) -> Result<String, String> {
    match ssr_process::disable(modify_env).await {
        Ok(_) => {
            let response = status_response::new(status_type::success, "");
            return Ok(response.to_string());
        },
        Err(_) => {
            let response = status_response::new(status_type::failure, "failed to disable proxy");
            return Err(response.to_string());
        }
    }
}