use serde::{Serialize, Deserialize};

/**
 * 从后端返回的处理结果
 * 通用结构体
 */
#[derive(Serialize, Deserialize)]
pub struct status_response {
    pub status_type: status_type,
    pub msg: String,
}
#[derive(Serialize, Deserialize)]
pub enum status_type {
    success,
    failure,
}
impl status_response {
    /**
     * 新建
     */
    pub fn new(status_type: status_type, msg: &str) -> Self {
        let msg = msg.to_string();
        status_response { status_type,  msg}
    }
    /**
     * 转换为字符串
     */
    pub fn to_string(self) -> String {
        let status_str = serde_json::to_string(&self).unwrap();
        return status_str;
    }
}

/**
 * 1. 插入配置文件时，从前端请求的json
 * 2. 前端发送根据配置名字获取配置详细参数的时候，后端返回给前端的详细数据
 */
#[derive(Debug, Serialize, Deserialize)]
pub struct ShadowsocksConfigReceive {
    pub cfg_name: String,
    pub password: String,
    pub method: String,
    pub protocol: String,
    pub protocol_param: String,
    pub obfs: String,
    pub obfs_param: String,
    pub udp: bool,
    pub idle_timeout: u32,
    pub connect_timeout: u32,
    pub udp_timeout: u32,
    pub client_settings: ClientSettings,
}
/**
 * 写进配置文件的json
 */
#[derive(Debug, Serialize, Deserialize)]
pub struct ShadowsocksConfig {
    pub password: String,
    pub method: String,
    pub protocol: String,
    pub protocol_param: String,
    pub obfs: String,
    pub obfs_param: String,
    pub udp: bool,
    pub idle_timeout: u32,
    pub connect_timeout: u32,
    pub udp_timeout: u32,
    pub client_settings: ClientSettings,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct ClientSettings {
    pub server: String,
    pub server_port: u16,
    pub listen_address: String,
    pub listen_port: u16,
    #[serde(default = "default_ssr_port")]
    pub ssr_service_port: u16,
}

fn default_ssr_port() -> u16 { 1081 }
/**
 * 用于获取总共的配置文件的配置文件名的列表
 */
#[derive(Debug, Serialize, Deserialize)]
pub struct ShadowSocksConfigList {
    pub cfg_list: Vec<String>
}

/**
 * 代理路由模式
 */
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum RouteMode {
    #[serde(rename = "global")]
    Global,
    #[serde(rename = "bypass_lan")]
    BypassLan,
    #[serde(rename = "bypass_china")]
    BypassChina,
    #[serde(rename = "bypass_lan_china")]
    BypassLanChina,
}

impl RouteMode {
    pub fn from_str(s: &str) -> Option<RouteMode> {
        match s {
            "global" => Some(RouteMode::Global),
            "bypass_lan" => Some(RouteMode::BypassLan),
            "bypass_china" => Some(RouteMode::BypassChina),
            "bypass_lan_china" => Some(RouteMode::BypassLanChina),
            _ => None,
        }
    }
}