// 用于向电脑发送消息
use tokio::process::Command;

/**
 * 发送通知
 * 仅支持linux
 */
#[cfg(target_os = "linux")]
pub async fn send(title: &str, body: &str) {
    let (title, body) = (title.to_string(), body.to_string());
    tokio::spawn(async move {
        let _ = Command::new("notify-send")
            .arg("--app-name")
            .arg("shadowsocksr-client-linux")
            .arg(title)
            .arg(body).status().await.unwrap();
    });
}
/**
 * 非linux系统下不发送任何通知
 */
#[cfg(not(target_os = "linux"))]
pub async fn send(title: &str, body: &str) {
    
}