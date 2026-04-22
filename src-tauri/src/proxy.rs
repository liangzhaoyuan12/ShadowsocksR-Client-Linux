use anyhow::Result;
use std::process::Command;
use whoami::DesktopEnvironment;
use whoami::desktop_env;
use super::notification;
pub async fn enable(port: u16) {
    let desktop = desktop_env();
    // 错误消息本体
    let body = format!("请手动设置系统socks代理\n设置socks代理:\nhost:127.0.0.1\nport:{}", port);
    if let Some(desktop) = desktop {
       match desktop {
            DesktopEnvironment::Cinnamon | DesktopEnvironment::Gnome | DesktopEnvironment::Ubuntu | DesktopEnvironment::Mate | DesktopEnvironment::Cosmic  => {
                // 走gnome代理命令
                if let Ok(_) = enable_proxy_gnome(port) {
                    notification::send("gnome代理设置✅成功", "尽情上网冲浪吧").await;
                } else {
                    notification::send("gnome代理设置失败", &body).await;
                }
            },
            DesktopEnvironment::Plasma=> {
                // 走kde代理命令
                if let Ok(_) = enable_proxy_kde(port) {
                    notification::send("kde代理设置✅成功", "尽情上网冲浪吧").await;
                } else {
                    notification::send("kde代理设置失败", &body).await;
                }
            },
            DesktopEnvironment::Unknown(val) if val =="KDE" => {
                // 走kde代理命令
                if let Ok(_) = enable_proxy_kde(port) {
                    notification::send("kde代理设置✅成功", "尽情上网冲浪吧").await;
                } else {
                    notification::send("kde代理设置失败", &body).await;
                }
            },
            DesktopEnvironment::Unknown(val) if (val == "deepin")||(val == "uos") => {
                // 走gnome代理命令
                if let Ok(_) = enable_proxy_gnome(port) {
                    notification::send("gnome代理设置✅成功", "尽情上网冲浪吧").await;
                } else {
                    notification::send("gnome代理设置失败", &body).await;
                }
            },
            _ => {
                notification::send("不支持的桌面环境", &body).await;
            }
       }
         
    } else {
        notification::send("未检测到桌面环境", &body).await;
    }
}
pub async fn disable() {
    let desktop = desktop_env();
    let body = format!("请手动关闭系统代理设置");
    if let Some(desktop) = desktop {
        match desktop {
            DesktopEnvironment::Cinnamon | DesktopEnvironment::Gnome | DesktopEnvironment::Ubuntu | DesktopEnvironment::Mate | DesktopEnvironment::Cosmic  => {
                // 关闭gnome代理
                if let Ok(_) = disable_proxy_gnome() {
                    notification::send("gnome代理关闭❎成功", "尽情上网冲浪吧").await;
                } else {
                    notification::send("gnome代理关闭失败", &body).await;
                }
            },
            DesktopEnvironment::Plasma => {
                // 关闭kde代理
                if let Ok(_) = disable_proxy_kde() {
                    notification::send("kde代理关闭❎成功", "尽情上网冲浪吧").await;
                } else {
                    notification::send("kde代理关闭失败", &body).await;
                }
            },
            DesktopEnvironment::Unknown(val) if val =="KDE" => {
                 // 关闭kde代理
                if let Ok(_) = disable_proxy_kde() {
                    notification::send("kde代理关闭❎成功", "尽情上网冲浪吧").await;
                } else {
                    notification::send("kde代理关闭失败", &body).await;
                }
            },
            DesktopEnvironment::Unknown(val) if (val == "deepin")||(val == "uos") => {
                // 关闭gnome代理
                if let Ok(_) = disable_proxy_gnome() {
                    notification::send("gnome代理关闭❎成功", "尽情上网冲浪吧").await;
                } else {
                    notification::send("gnome代理关闭失败", &body).await;
                }
            },
            _ => {
                notification::send("不支持的桌面环境", &body).await;
            }
        }
    } else {
        notification::send("未检测到桌面环境", &body).await;
    }
}

fn enable_proxy_gnome(port: u16) -> Result<()> {
    // 设置代理模式为手动
    Command::new("gsettings")
        .arg("set")
        .arg("org.gnome.system.proxy")
        .arg("mode")
        .arg("manual").status()?;
    // 设置代理socks的IP为127.0.0.1
    Command::new("gsettings")
        .arg("set")
        .arg("org.gnome.system.proxy.socks")
        .arg("host")
        .arg("127.0.0.1").status()?;
    // 设置代理socks的端口为指定端口
    Command::new("gsettings")
        .arg("set")
        .arg("org.gnome.system.proxy.socks")
        .arg("port")
        .arg(port.to_string()).status()?;
    
    return Ok(());
}

fn disable_proxy_gnome() -> Result<()> {
    // 关闭gnome系统代理
    Command::new("gsettings")
        .arg("set")
        .arg("org.gnome.system.proxy")
        .arg("mode")
        .arg("none").status()?;
    // 清空socks代理的host配置
    Command::new("gsettings")
        .arg("reset")
        .arg("org.gnome.system.proxy.socks")
        .arg("host").status()?;
    // 清空socks代理的port配置
    Command::new("gsettings")
        .arg("reset")
        .arg("org.gnome.system.proxy.socks")
        .arg("port").status()?;

    return Ok(());
}

fn enable_proxy_kde(port: u16) -> Result<()> {
    // 设置手动代理模式
    Command::new("kwriteconfig5")
        .arg("--file")
        .arg("kioslaverc")
        .arg("--group")
        .arg("Proxy Settings")
        .arg("--key")
        .arg("ProxyType")
        .arg("1").status()?;
    // 设置代理为socks：127.0.0.1 端口
    let addr = format!("127.0.0.1 {}",port);
    Command::new("kwriteconfig5")
        .arg("--file")
        .arg("kioslaverc")
        .arg("--group")
        .arg("Proxy Settings")
        .arg("--key")
        .arg("socksProxy")
        .arg(addr).status()?;
    // 设置代理例外，排除本机地址
    Command::new("kwriteconfig5")
        .arg("--file")
        .arg("kioslaverc")
        .arg("--group")
        .arg("Proxy Settings")
        .arg("--key")
        .arg("NoProxyFor")
        .arg("localhost,127.0.0.1,::1").status()?;
    // 发送刷新网络代理设置信号
    Command::new("dbus-send")
        .arg("--type=signal")
        .arg("/KIO/Scheduler")
        .arg("org.kde.KIO.Scheduler.reparseSlaveConfiguration")
        .arg("string:").status()?;

    return Ok(());
}

fn disable_proxy_kde() -> Result<()> {
    // 关闭代理
    Command::new("kwriteconfig5")
        .arg("--file")
        .arg("kioslaverc")
        .arg("--group")
        .arg("Proxy Settings")
        .arg("--key")
        .arg("ProxyType")
        .arg("0").status()?;
    // 发送刷新网络代理设置信号
    Command::new("dbus-send")
        .arg("--type=signal")
        .arg("/KIO/Scheduler")
        .arg("org.kde.KIO.Scheduler.reparseSlaveConfiguration")
        .arg("string:").status()?;
    return Ok(());
}