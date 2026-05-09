use anyhow::Result;
use std::env;
use std::fs;
use std::path::PathBuf;
use std::process::Command;
use super::notification;

#[derive(Debug, PartialEq)]
enum DesktopType {
    Kde,
    Gnome,
    Xfce,
    Wm,
    Unknown,
}

fn detect_desktop() -> DesktopType {
    let env_vars = [
        env::var("XDG_CURRENT_DESKTOP"),
        env::var("XDG_SESSION_DESKTOP"),
        env::var("DESKTOP_SESSION"),
    ];

    for env_val in env_vars.into_iter().flatten() {
        let lower = env_val.to_lowercase();
        // XDG_CURRENT_DESKTOP can be colon-separated, e.g. "KDE:GNOME"
        for part in lower.split(':') {
            let part = part.trim();
            if part.is_empty() {
                continue;
            }

            if part == "kde" || part.starts_with("plasma") || part == "lxqt" {
                return DesktopType::Kde;
            }

            if part == "xfce" || part == "xubuntu" {
                return DesktopType::Xfce;
            }

            let gnome_desktops = [
                "gnome", "ubuntu", "cinnamon", "mate", "cosmic",
                "budgie", "pantheon", "unity", "deepin", "uos", "ukui",
            ];
            if gnome_desktops.iter().any(|&g| part == g || part.starts_with(g)) {
                return DesktopType::Gnome;
            }

            let wm_desktops = [
                "i3", "sway", "hyprland", "niri", "openbox", "fluxbox",
                "dwm", "awesome", "bspwm", "qtile", "herbstluftwm",
                "icewm", "jwm", "ratpoison", "spectrwm", "xmonad",
                "enlightenment",
            ];
            if wm_desktops.iter().any(|&w| part == w || part.starts_with(w)) {
                return DesktopType::Wm;
            }
        }
    }

    // Process-based fallback for KDE
    let kde_procs = ["plasmashell", "kwin_x11", "kwin_wayland"];
    for proc in kde_procs {
        if Command::new("pgrep")
            .arg("-x")
            .arg(proc)
            .output()
            .map(|o| o.status.success())
            .unwrap_or(false)
        {
            return DesktopType::Kde;
        }
    }

    DesktopType::Unknown
}

// ===== ENABLE PROXY =====
pub async fn enable(port: u16) {
    let desktop = detect_desktop();
    let body = format!(
        "Please manually configure system SOCKS proxy\nSOCKS proxy settings:\nHost: 127.0.0.1\nPort: {}",
        port
    );

    match desktop {
        DesktopType::Kde => {
            let kde_ok = enable_proxy_kde(port).is_ok();
            let env_ok = enable_proxy_env(port).is_ok();
            if kde_ok && env_ok {
                notification::send("KDE + terminal proxy setup successful", "GUI and terminal both use SOCKS proxy").await;
            } else if kde_ok {
                notification::send("KDE proxy setup successful (env vars failed)", &body).await;
            } else {
                notification::send("KDE proxy setup failed", &body).await;
            }
        }
        DesktopType::Gnome => {
            let gnome_ok = enable_proxy_gnome(port).is_ok();
            let env_ok = enable_proxy_env(port).is_ok();
            if gnome_ok && env_ok {
                notification::send("GNOME + terminal proxy setup successful", "GUI and terminal both use SOCKS proxy").await;
            } else if gnome_ok {
                notification::send("GNOME proxy setup successful (env vars failed)", &body).await;
            } else {
                notification::send("GNOME proxy setup failed", &body).await;
            }
        }
        DesktopType::Xfce => {
            let xfce_ok = enable_proxy_xfce(port).is_ok();
            let env_ok = enable_proxy_env(port).is_ok();
            if xfce_ok && env_ok {
                notification::send("XFCE + terminal proxy setup successful", "GUI and terminal both use SOCKS proxy").await;
            } else if xfce_ok {
                notification::send("XFCE proxy setup successful (env vars failed)", &body).await;
            } else {
                notification::send("XFCE proxy setup failed", &body).await;
            }
        }
        DesktopType::Wm | DesktopType::Unknown => {
            if enable_proxy_env(port).is_ok() {
                notification::send("Proxy environment variables set", "Terminal commands will use SOCKS proxy (new sessions only)").await;
            } else {
                notification::send("Failed to set proxy environment variables", &body).await;
            }
        }
    }
}

// ===== DISABLE PROXY =====
pub async fn disable() {
    let desktop = detect_desktop();
    let body = "Please manually disable system proxy settings".to_string();

    match desktop {
        DesktopType::Kde => {
            let kde_ok = disable_proxy_kde().is_ok();
            let env_ok = disable_proxy_env().is_ok();
            if kde_ok && env_ok {
                notification::send("KDE + terminal proxy disabled", "Enjoy browsing the web").await;
            } else if kde_ok {
                notification::send("KDE proxy disabled (env vars cleanup failed)", &body).await;
            } else {
                notification::send("KDE proxy disable failed", &body).await;
            }
        }
        DesktopType::Gnome => {
            let gnome_ok = disable_proxy_gnome().is_ok();
            let env_ok = disable_proxy_env().is_ok();
            if gnome_ok && env_ok {
                notification::send("GNOME + terminal proxy disabled", "Enjoy browsing the web").await;
            } else if gnome_ok {
                notification::send("GNOME proxy disabled (env vars cleanup failed)", &body).await;
            } else {
                notification::send("GNOME proxy disable failed", &body).await;
            }
        }
        DesktopType::Xfce => {
            let xfce_ok = disable_proxy_xfce().is_ok();
            let env_ok = disable_proxy_env().is_ok();
            if xfce_ok && env_ok {
                notification::send("XFCE + terminal proxy disabled", "Enjoy browsing the web").await;
            } else if xfce_ok {
                notification::send("XFCE proxy disabled (env vars cleanup failed)", &body).await;
            } else {
                notification::send("XFCE proxy disable failed", &body).await;
            }
        }
        DesktopType::Wm | DesktopType::Unknown => {
            if disable_proxy_env().is_ok() {
                notification::send("Proxy environment variables cleared", "Enjoy browsing the web").await;
            } else {
                notification::send("Failed to clear proxy environment variables", &body).await;
            }
        }
    }
}

// ===== GNOME (gsettings) =====
fn enable_proxy_gnome(port: u16) -> Result<()> {
    Command::new("gsettings")
        .args(["set", "org.gnome.system.proxy", "mode", "manual"])
        .status()?;
    Command::new("gsettings")
        .args(["set", "org.gnome.system.proxy.socks", "host", "127.0.0.1"])
        .status()?;
    Command::new("gsettings")
        .args(["set", "org.gnome.system.proxy.socks", "port", &port.to_string()])
        .status()?;
    Ok(())
}

fn disable_proxy_gnome() -> Result<()> {
    Command::new("gsettings")
        .args(["set", "org.gnome.system.proxy", "mode", "none"])
        .status()?;
    Command::new("gsettings")
        .args(["reset", "org.gnome.system.proxy.socks", "host"])
        .status()?;
    Command::new("gsettings")
        .args(["reset", "org.gnome.system.proxy.socks", "port"])
        .status()?;
    Ok(())
}

// ===== KDE (kwriteconfig5 / kwriteconfig6) =====
fn kde_config_tool() -> &'static str {
    if Command::new("kwriteconfig6")
        .arg("--help")
        .output()
        .map(|o| o.status.success())
        .unwrap_or(false)
    {
        "kwriteconfig6"
    } else {
        "kwriteconfig5"
    }
}

fn enable_proxy_kde(port: u16) -> Result<()> {
    let tool = kde_config_tool();
    let addr = format!("127.0.0.1 {}", port);

    Command::new(tool)
        .args(["--file", "kioslaverc", "--group", "Proxy Settings", "--key", "ProxyType", "1"])
        .status()?;
    Command::new(tool)
        .args(["--file", "kioslaverc", "--group", "Proxy Settings", "--key", "socksProxy", &addr])
        .status()?;
    Command::new(tool)
        .args(["--file", "kioslaverc", "--group", "Proxy Settings", "--key", "NoProxyFor", "localhost,127.0.0.1,::1"])
        .status()?;
    Command::new("dbus-send")
        .args(["--type=signal", "/KIO/Scheduler", "org.kde.KIO.Scheduler.reparseSlaveConfiguration", "string:"])
        .status()?;
    Ok(())
}

fn disable_proxy_kde() -> Result<()> {
    let tool = kde_config_tool();

    Command::new(tool)
        .args(["--file", "kioslaverc", "--group", "Proxy Settings", "--key", "ProxyType", "0"])
        .status()?;
    Command::new("dbus-send")
        .args(["--type=signal", "/KIO/Scheduler", "org.kde.KIO.Scheduler.reparseSlaveConfiguration", "string:"])
        .status()?;
    Ok(())
}

// ===== XFCE (xfconf-query) =====
fn enable_proxy_xfce(port: u16) -> Result<()> {
    Command::new("xfconf-query")
        .args(["-c", "xfce4-session", "-p", "/socks5/proxy-type", "-s", "1"])
        .status()?;
    Command::new("xfconf-query")
        .args(["-c", "xfce4-session", "-p", "/socks5/host", "-s", "127.0.0.1"])
        .status()?;
    Command::new("xfconf-query")
        .args(["-c", "xfce4-session", "-p", "/socks5/port", "-s", &port.to_string()])
        .status()?;
    Ok(())
}

fn disable_proxy_xfce() -> Result<()> {
    Command::new("xfconf-query")
        .args(["-c", "xfce4-session", "-p", "/socks5/proxy-type", "-s", "0"])
        .status()?;
    Ok(())
}

// ===== Environment variables (WMs & fallback) =====
const BLOCK_BEGIN: &str = "# >>> ssr-proxy >>>\n";
const BLOCK_END: &str = "# <<< ssr-proxy <<<\n";

fn xprofile_path() -> PathBuf {
    dirs::home_dir()
        .unwrap_or_else(|| PathBuf::from("/tmp"))
        .join(".xprofile")
}

fn env_conf_dir() -> PathBuf {
    dirs::config_dir()
        .unwrap_or_else(|| PathBuf::from("/tmp"))
        .join("environment.d")
}

fn env_conf_file() -> PathBuf {
    env_conf_dir().join("ssr-proxy.conf")
}

fn proxy_env_block(port: u16) -> String {
    format!(
        "{}export all_proxy=socks5://127.0.0.1:{}\n\
         export ALL_PROXY=socks5://127.0.0.1:{}\n\
         export no_proxy=localhost,127.0.0.1,::1\n\
         export NO_PROXY=localhost,127.0.0.1,::1\n\
         {}",
        BLOCK_BEGIN, port, port, BLOCK_END
    )
}

fn write_xprofile_block(port: u16) -> Result<()> {
    let path = xprofile_path();
    let existing = if path.exists() {
        fs::read_to_string(&path).unwrap_or_default()
    } else {
        String::new()
    };

    // Remove old ssr-proxy block if present
    let cleaned = remove_proxy_block(&existing);

    // Append new block
    let new_content = if cleaned.is_empty() || cleaned.ends_with('\n') {
        format!("{}{}", cleaned, proxy_env_block(port))
    } else {
        format!("{}\n{}", cleaned, proxy_env_block(port))
    };

    fs::write(&path, new_content)?;
    // xprofile must be executable
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        if let Ok(meta) = fs::metadata(&path) {
            let mut perms = meta.permissions();
            if perms.mode() & 0o111 == 0 {
                perms.set_mode(0o755);
                let _ = fs::set_permissions(&path, perms);
            }
        }
    }

    Ok(())
}

fn remove_xprofile_block() -> Result<()> {
    let path = xprofile_path();
    if !path.exists() {
        return Ok(());
    }

    let existing = fs::read_to_string(&path).unwrap_or_default();
    let cleaned = remove_proxy_block(&existing);

    if cleaned.trim().is_empty() {
        let _ = fs::remove_file(&path);
    } else {
        // Trim trailing whitespace but keep exactly one trailing newline if content remains
        let trimmed = cleaned.trim_end().to_string();
        if !trimmed.is_empty() {
            fs::write(&path, trimmed + "\n")?;
        } else {
            let _ = fs::remove_file(&path);
        }
    }

    Ok(())
}

fn remove_proxy_block(content: &str) -> String {
    let mut result = String::new();
    let mut in_block = false;

    for line in content.lines() {
        if line == BLOCK_BEGIN.trim() {
            in_block = true;
            continue;
        }
        if line == BLOCK_END.trim() {
            in_block = false;
            continue;
        }
        if !in_block {
            result.push_str(line);
            result.push('\n');
        }
    }

    result
}

fn enable_proxy_env(port: u16) -> Result<()> {
    let socks_addr = format!("socks5://127.0.0.1:{}", port);

    // 1. systemd user session: ~/.config/environment.d/ (persistent, read on next login)
    let dir = env_conf_dir();
    fs::create_dir_all(&dir)?;
    let content = format!(
        "all_proxy={}\nALL_PROXY={}\nno_proxy=localhost,127.0.0.1,::1\nNO_PROXY=localhost,127.0.0.1,::1\n",
        socks_addr, socks_addr
    );
    fs::write(env_conf_file(), content)?;

    // 2. systemctl --user set-environment (immediate effect for new processes)
    let _ = Command::new("systemctl")
        .args(["--user", "set-environment",
            &format!("all_proxy={}", socks_addr),
            &format!("ALL_PROXY={}", socks_addr),
            "no_proxy=localhost,127.0.0.1,::1",
            "NO_PROXY=localhost,127.0.0.1,::1",
        ])
        .status();

    // 3. Traditional X11 display manager session: ~/.xprofile
    write_xprofile_block(port)?;

    // 4. KDE Plasma session (both X11 & Wayland): ~/.config/plasma-workspace/env/
    write_plasma_env_sh(port)?;

    Ok(())
}

fn disable_proxy_env() -> Result<()> {
    // 1. Remove systemd environment.d conf
    let file = env_conf_file();
    if file.exists() {
        fs::remove_file(&file)?;
    }

    // 2. Unset from systemd user environment
    let _ = Command::new("systemctl")
        .args(["--user", "unset-environment", "all_proxy", "ALL_PROXY", "no_proxy", "NO_PROXY"])
        .status();

    // 3. Remove proxy block from ~/.xprofile
    remove_xprofile_block()?;

    // 4. Remove KDE Plasma env script
    remove_plasma_env_sh()?;

    Ok(())
}

// ===== KDE Plasma workspace env =====
fn plasma_env_dir() -> PathBuf {
    dirs::config_dir()
        .unwrap_or_else(|| PathBuf::from("/tmp"))
        .join("plasma-workspace")
        .join("env")
}

fn plasma_env_file() -> PathBuf {
    plasma_env_dir().join("ssr-proxy.sh")
}

fn write_plasma_env_sh(port: u16) -> Result<()> {
    let dir = plasma_env_dir();
    fs::create_dir_all(&dir)?;
    let content = format!(
        "export all_proxy=socks5://127.0.0.1:{}\n\
         export ALL_PROXY=socks5://127.0.0.1:{}\n\
         export no_proxy=localhost,127.0.0.1,::1\n\
         export NO_PROXY=localhost,127.0.0.1,::1\n",
        port, port
    );
    fs::write(plasma_env_file(), content)?;
    Ok(())
}

fn remove_plasma_env_sh() -> Result<()> {
    let file = plasma_env_file();
    if file.exists() {
        fs::remove_file(&file)?;
    }
    Ok(())
}
