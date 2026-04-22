use std::{fs::remove_file, path::PathBuf};

use super::model::*;
use anyhow::{Result, anyhow};
use super::get_path::home_dir;
/**
 * 删除指定配置文件名的配置文件
 */
pub fn remove_cfg_file(config_name: &str) -> Result<()> {
    let cfg_file_name = format!("{}.json", config_name);
    let config_file_path = home_dir().join(cfg_file_name);
    // 文件不存在时返回错误
    if !config_file_path.exists() {
        return Err(anyhow!("config file doesn't exist"));
    }
    remove_file(config_file_path)?;
    return Ok(());
}