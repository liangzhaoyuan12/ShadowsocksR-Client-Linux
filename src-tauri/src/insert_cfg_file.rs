// {
//     "cfg_name": "xxxxx",
//     "password": "password",
//     "method": "aes-128-ctr",
//     "protocol": "auth_aes128_md5",
//     "protocol_param": "",
//     "obfs": "tls1.2_ticket_auth",
//     "obfs_param": "",

//     "udp": true,
//     "idle_timeout": 300,
//     "connect_timeout": 6,
//     "udp_timeout": 6,

//     "client_settings": {
//         "server": "12.34.56.78",
//         "server_port": 12475,
//         "listen_address": "0.0.0.0",
//         "listen_port": 1080
//     }
// }
// 对前端（写死在前端）的要求：listen_address必须为0.0.0.0
//                             cfg_name的内容只允许包含大小写英文字母和数字的组成
use std::{fs::{File, create_dir_all}, io::Write};
use super::model::*;
use anyhow::Result;
use super::get_path::home_dir;
pub fn insert_cfg_file(cfg_json: String) -> Result<()> {
    let path = home_dir();
    // 若文件夹不存在则创建文件夹
    if !path.exists() {
        create_dir_all(path.clone())?
    };
    let json_receive: ShadowsocksConfigReceive  = serde_json::from_str(&cfg_json)?;
    let cfg_file_name = format!("{}.json", json_receive.cfg_name);
    // 配置文件的路径
    let cfg_file = path.join(cfg_file_name);
    // 若文件不存在则创建文件，若文件存在则重新完全写入
    let mut cfg_file = File::create(cfg_file)?;
    let ssr_cfg = ShadowsocksConfig {
        password : json_receive.password,
        method : json_receive.method,
        protocol : json_receive.protocol,
        protocol_param : json_receive.protocol_param,
        obfs : json_receive.obfs,
        obfs_param: json_receive.obfs_param,
        udp: json_receive.udp,
        idle_timeout: json_receive.idle_timeout,
        connect_timeout: json_receive.connect_timeout,
        udp_timeout: json_receive.udp_timeout,
        client_settings: json_receive.client_settings
    };
    let ssr_cfg_str = serde_json::to_string_pretty(&ssr_cfg)?;

    // 写入配置文件
    cfg_file.write(ssr_cfg_str.as_bytes())?;

    return Ok(());
}