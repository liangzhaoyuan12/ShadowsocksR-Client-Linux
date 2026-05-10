use std::net::SocketAddr;
use std::sync::atomic::{AtomicBool, Ordering};
use std::time::Duration;

use anyhow::Result;
use once_cell::sync::OnceCell;
use tauri::async_runtime::Mutex;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::{TcpListener, TcpStream};
use tokio::sync::watch;

use super::china_ip;
use super::model::RouteMode;

static SHUTDOWN_TX: OnceCell<Mutex<Option<watch::Sender<bool>>>> = OnceCell::new();
static RUNNING: AtomicBool = AtomicBool::new(false);

struct AtomicRouteMode {
    bypass_lan: AtomicBool,
    bypass_china: AtomicBool,
}

static ROUTE_MODE: OnceCell<AtomicRouteMode> = OnceCell::new();

const CONNECT_TIMEOUT: Duration = Duration::from_secs(10);

fn shutdown_tx() -> &'static Mutex<Option<watch::Sender<bool>>> {
    SHUTDOWN_TX.get_or_init(|| Mutex::new(None))
}

fn get_mode() -> &'static AtomicRouteMode {
    ROUTE_MODE.get_or_init(|| AtomicRouteMode {
        bypass_lan: AtomicBool::new(false),
        bypass_china: AtomicBool::new(false),
    })
}

pub fn set_route_mode(mode: RouteMode) {
    let m = get_mode();
    match mode {
        RouteMode::Global => {
            m.bypass_lan.store(false, Ordering::SeqCst);
            m.bypass_china.store(false, Ordering::SeqCst);
        }
        RouteMode::BypassLan => {
            m.bypass_lan.store(true, Ordering::SeqCst);
            m.bypass_china.store(false, Ordering::SeqCst);
        }
        RouteMode::BypassChina => {
            m.bypass_lan.store(false, Ordering::SeqCst);
            m.bypass_china.store(true, Ordering::SeqCst);
        }
        RouteMode::BypassLanChina => {
            m.bypass_lan.store(true, Ordering::SeqCst);
            m.bypass_china.store(true, Ordering::SeqCst);
        }
    }
}

pub async fn start(listen_port: u16, ssr_port: u16) -> Result<()> {
    {
        let guard = shutdown_tx().lock().await;
        if guard.is_some() || RUNNING.load(Ordering::SeqCst) {
            return Ok(());
        }
    }

    let listener = TcpListener::bind(("127.0.0.1", listen_port)).await?;
    let (tx, mut rx) = watch::channel(false);

    {
        let mut guard = shutdown_tx().lock().await;
        if guard.is_some() {
            drop(listener);
            return Ok(());
        }
        *guard = Some(tx);
    }
    RUNNING.store(true, Ordering::SeqCst);

    tauri::async_runtime::spawn(async move {
        loop {
            tokio::select! {
                result = listener.accept() => {
                    match result {
                        Ok((stream, _)) => {
                            tauri::async_runtime::spawn(handle_connection(stream, ssr_port));
                        }
                        Err(_) => break,
                    }
                }
                _ = rx.changed() => {
                    break;
                }
            }
        }
        RUNNING.store(false, Ordering::SeqCst);
    });

    Ok(())
}

pub async fn stop() {
    let mut guard = shutdown_tx().lock().await;
    if let Some(tx) = guard.take() {
        let _ = tx.send(true);
    }
}

fn is_lan_ip(ip: u32) -> bool {
    (ip & 0xFF000000) == 0x0A000000   // 10.0.0.0/8
    || (ip & 0xFFF00000) == 0xAC100000 // 172.16.0.0/12
    || (ip & 0xFFFF0000) == 0xC0A80000 // 192.168.0.0/16
    || (ip & 0xFF000000) == 0x7F000000 // 127.0.0.0/8
    || (ip & 0xFFFF0000) == 0xA9FE0000 // 169.254.0.0/16
    || (ip & 0xFFC00000) == 0x64400000 // 100.64.0.0/10
}

fn should_bypass(ip: u32) -> bool {
    let m = get_mode();
    if m.bypass_lan.load(Ordering::SeqCst) && is_lan_ip(ip) {
        return true;
    }
    if m.bypass_china.load(Ordering::SeqCst) && china_ip::is_china_ipv4(ip) {
        return true;
    }
    false
}

fn sockaddr_to_u32(addr: &SocketAddr) -> Option<u32> {
    match addr {
        SocketAddr::V4(v4) => {
            let o = v4.ip().octets();
            Some(((o[0] as u32) << 24) | ((o[1] as u32) << 16) | ((o[2] as u32) << 8) | (o[3] as u32))
        }
        SocketAddr::V6(_) => None,
    }
}

fn should_bypass_addr(addr: &SocketAddr) -> bool {
    match sockaddr_to_u32(addr) {
        Some(ip) => should_bypass(ip),
        None => false,
    }
}

fn parse_dest_addr(buf: &[u8]) -> Option<SocketAddr> {
    if buf.len() < 10 || buf[0] != 0x05 {
        return None;
    }
    match buf[3] {
        0x01 => {
            let ip = std::net::Ipv4Addr::new(buf[4], buf[5], buf[6], buf[7]);
            let port = u16::from_be_bytes([buf[8], buf[9]]);
            Some(SocketAddr::V4(std::net::SocketAddrV4::new(ip, port)))
        }
        0x04 => {
            if buf.len() < 22 { return None; }
            let mut o = [0u8; 16];
            o.copy_from_slice(&buf[4..20]);
            let ip = std::net::Ipv6Addr::from(o);
            let port = u16::from_be_bytes([buf[20], buf[21]]);
            Some(SocketAddr::V6(std::net::SocketAddrV6::new(ip, port, 0, 0)))
        }
        _ => None,
    }
}

async fn handle_connection(mut client: TcpStream, ssr_port: u16) {
    let mut buf = [0u8; 512];

    // Step 1: SOCKS5 auth negotiation with client, respond no-auth
    let n = match client.read(&mut buf).await {
        Ok(n) if n >= 3 && buf[0] == 0x05 => n,
        _ => return,
    };
    let nmethods = buf[1] as usize;
    if n < 2 + nmethods {
        return;
    }
    if client.write_all(&[0x05, 0x00]).await.is_err() {
        return;
    }

    // Step 2: read SOCKS5 CONNECT request from client
    let n = match client.read(&mut buf).await {
        Ok(n) if n >= 10 && buf[0] == 0x05 => n,
        _ => return,
    };
    let cmd = buf[1];
    if cmd != 0x01 {
        let _ = client.write_all(&[0x05, 0x07, 0x00, 0x01, 0, 0, 0, 0, 0, 0]).await;
        return;
    }

    // Save raw request bytes — needed when forwarding to SSR
    let request_len = n;
    let mut request_bytes = [0u8; 512];
    request_bytes[..request_len].copy_from_slice(&buf[..request_len]);

    // Parse destination for routing decision (domain names need resolution)
    let dest_addr: Option<SocketAddr> = match buf[3] {
        0x01 => parse_dest_addr(&buf[..n]),
        0x03 => {
            let len = buf[4] as usize;
            if n < 7 + len { return; }
            let domain = std::str::from_utf8(&buf[5..5 + len]).unwrap_or("");
            let port = u16::from_be_bytes([buf[5 + len], buf[6 + len]]);
            let addr_str = format!("{}:{}", domain, port);
            let addrs = tokio::net::lookup_host(&addr_str).await;
            match addrs {
                Ok(mut iter) => iter.next(),
                Err(_) => None,
            }
        }
        0x04 => parse_dest_addr(&buf[..n]),
        _ => {
            let _ = client.write_all(&[0x05, 0x08, 0x00, 0x01, 0, 0, 0, 0, 0, 0]).await;
            return;
        }
    };

    let dest = match dest_addr {
        Some(d) => d,
        None => {
            let _ = client.write_all(&[0x05, 0x04, 0x00, 0x01, 0, 0, 0, 0, 0, 0]).await;
            return;
        }
    };

    let bypass = should_bypass_addr(&dest);

    if bypass {
        // 直连
        let connect_result = tokio::time::timeout(CONNECT_TIMEOUT, TcpStream::connect(dest)).await;
        let mut remote = match connect_result {
            Ok(Ok(r)) => r,
            _ => {
                let _ = client.write_all(&[0x05, 0x05, 0x00, 0x01, 0, 0, 0, 0, 0, 0]).await;
                return;
            }
        };

        let reply = [0x05, 0x00, 0x00, 0x01, 0, 0, 0, 0, 0, 0];
        if client.write_all(&reply).await.is_err() {
            return;
        }

        let (mut cr, mut cw) = client.split();
        let (mut rr, mut rw) = remote.split();
        let _ = tokio::join!(
            tokio::io::copy(&mut cr, &mut rw),
            tokio::io::copy(&mut rr, &mut cw),
        );
    } else {
        // 转发到 SSR SOCKS5 代理
        let ssr_addr = SocketAddr::V4(std::net::SocketAddrV4::new(
            std::net::Ipv4Addr::new(127, 0, 0, 1),
            ssr_port,
        ));
        let connect_result = tokio::time::timeout(CONNECT_TIMEOUT, TcpStream::connect(ssr_addr)).await;
        let mut ssr = match connect_result {
            Ok(Ok(r)) => r,
            _ => {
                let _ = client.write_all(&[0x05, 0x05, 0x00, 0x01, 0, 0, 0, 0, 0, 0]).await;
                return;
            }
        };

        // Step A: SOCKS5 auth negotiation with SSR sidecar
        if ssr.write_all(&[0x05, 0x01, 0x00]).await.is_err() {
            let _ = client.write_all(&[0x05, 0x01, 0x00, 0x01, 0, 0, 0, 0, 0, 0]).await;
            return;
        }
        let mut auth_resp = [0u8; 2];
        if ssr.read_exact(&mut auth_resp).await.is_err()
            || auth_resp[0] != 0x05 || auth_resp[1] != 0x00
        {
            let _ = client.write_all(&[0x05, 0x01, 0x00, 0x01, 0, 0, 0, 0, 0, 0]).await;
            return;
        }

        // Step B: forward the original CONNECT request to SSR
        if ssr.write_all(&request_bytes[..request_len]).await.is_err() {
            let _ = client.write_all(&[0x05, 0x01, 0x00, 0x01, 0, 0, 0, 0, 0, 0]).await;
            return;
        }

        // Step C: read SSR's reply and forward to client
        let mut ssr_reply = [0u8; 512];
        let reply_n = match ssr.read(&mut ssr_reply).await {
            Ok(n) if n >= 10 => n,
            _ => {
                let _ = client.write_all(&[0x05, 0x01, 0x00, 0x01, 0, 0, 0, 0, 0, 0]).await;
                return;
            }
        };
        if client.write_all(&ssr_reply[..reply_n]).await.is_err() {
            return;
        }

        // Step D: bidirectional relay between client and SSR
        let (mut cr, mut cw) = client.split();
        let (mut rr, mut rw) = ssr.split();
        let _ = tokio::join!(
            tokio::io::copy(&mut cr, &mut rw),
            tokio::io::copy(&mut rr, &mut cw),
        );
    }
}
