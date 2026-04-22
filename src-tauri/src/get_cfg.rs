use std::path::PathBuf;
use std::fs::{self, DirEntry};
use anyhow::{Result, anyhow};
use super::model::ShadowSocksConfigList;
use super::model::ShadowsocksConfigReceive;
use super::model::ShadowsocksConfig;
use super::get_path::home_dir;
use std::fs::create_dir_all;
/**
 * 获取存在的配置文件的列表
 * 返回ShadowSocksConfigList的json字符串
 */
pub fn get_cfg_list() -> Result<String> {
    let path = home_dir();
    // 若文件夹不存在则创建文件夹
    if !path.exists() {
        create_dir_all(path.clone())?
    };
    let entries = fs::read_dir(path)?;

    let mut list = Vec::<String>::new();
    for entry in entries {
        match entry {
            Ok(entry) => {
                let file_type = entry.file_type()?;
                // 只读取类型为文件的列表
                if file_type.is_file() {
                    let file_name = entry.file_name();
                    if let Some(filename) = file_name.to_str() {
                        // 只读取文件名后缀为.json的文件名
                        if filename.ends_with(".json") {
                            let config_name = &filename[..filename.len() - 5].to_string();
                            list.push(config_name.to_string());
                        }
                    }
                }
            },
            Err(_) => {}
        }
    }
    let config_list = ShadowSocksConfigList {cfg_list: list};
    let config_list = serde_json::to_string(&config_list)?;
    return Ok(config_list);
}
/**
 * 根据配置文件名，获取给配置文件名的配置的详细信息
 * 返回ShadowsocksConfigReceive的json字符串
 */
pub fn get_cfg_info(cfg_name: &str) -> Result<String> {
    let path = home_dir();
    let file_name = format!("{}.json", cfg_name);
    let path = path.join(file_name);
    if !path.exists() {
        return Err(anyhow!("can not find config file"));
    }
    let config_str = fs::read_to_string(path)?;
    let ssr_cfg: ShadowsocksConfig = serde_json::from_str(&config_str)?;
    let ssr_cfg = ShadowsocksConfigReceive {
        cfg_name: cfg_name.to_string(),
        password: ssr_cfg.password,
        method: ssr_cfg.method,
        protocol: ssr_cfg.protocol,
        protocol_param: ssr_cfg.protocol_param,
        obfs: ssr_cfg.obfs,
        obfs_param: ssr_cfg.obfs_param,
        udp: ssr_cfg.udp,
        idle_timeout: ssr_cfg.idle_timeout,
        connect_timeout: ssr_cfg.connect_timeout,
        udp_timeout: ssr_cfg.udp_timeout,
        client_settings: ssr_cfg.client_settings
    };
    let ssr_str = serde_json::to_string(&ssr_cfg)?;

    return Ok(ssr_str);
}