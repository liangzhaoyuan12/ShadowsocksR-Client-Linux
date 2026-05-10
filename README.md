# ShadowsocksR Client for Linux

<div align="center">

**A modern, cross-platform ShadowsocksR client for Linux built with Tauri + Vue 3**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-blue)](https://tauri.app/)
[![Vue](https://img.shields.io/badge/Vue-3.5-green)](https://vuejs.org/)

[简体中文](README.zh-CN.md) | [繁體中文（台灣）](README.zh-TW.md) | [繁體中文（港澳）](README.zh-HK.md) | [日本語](README.ja-JP.md) | [한국어](README.ko-KR.md) | [Русский](README.ru-RU.md)

</div>

---

## Features

- **Smart Routing**: Built-in SOCKS5 proxy router with 4 routing modes — Bypass LAN + China Mainland / Bypass LAN / Bypass China / Global. Automatically routes domestic traffic directly while forwarding overseas traffic through the proxy, eliminating the need for manual switching.
- **Dual-Port Architecture**: Router port (exposed to apps, configurable on the dashboard) runs independently from the SSR service port (internal, configurable in the editor). System proxy settings (gsettings, kwriteconfig, environment variables) always point to the router port, ensuring consistent behavior.
- **Environment Variable Control**: Optional checkbox — when checked, system environment variables (`all_proxy`/`ALL_PROXY`) are automatically managed. When unchecked, use proxychains for per-command proxy routing without affecting the global environment.
- **Proxychains Guide**: Built-in proxychains configuration instructions with dynamically displayed settings.
- **Modern UI**: Clean and intuitive interface built with Vue 3 + Composition API.
- **Multi-language Support**: 7 languages — Simplified Chinese, Traditional Chinese (Taiwan/Hong Kong), English, Japanese, Korean, Russian.
- **Dark Mode**: Automatic dark/light theme switching based on system preferences.
- **System Proxy Integration**: Automatic configuration for GNOME, KDE Plasma, and XFCE desktop environments.
- **Multiple Configurations**: Manage multiple SSR profiles with ease.

---

## Desktop Environment Support

| Category | Desktop Environments | Proxy Method | GUI Restart |
|---|---|---|---|
| **GNOME family** | GNOME, Ubuntu, Cinnamon, MATE, COSMIC, Budgie, Pantheon, Unity, Deepin, UOS, UKUI | gsettings | No |
| **KDE Plasma** | KDE Plasma 5/6, LXQt | kwriteconfig5/6 + dbus | No |
| **XFCE** | XFCE, Xubuntu | xfconf-query | Yes |
| **Window Managers** | i3, sway, Hyprland, Openbox, Fluxbox, dwm, awesome, bspwm, Qtile, herbstluftwm, icewm, jwm, xmonad, Enlightenment | Environment variables (when checked) or proxychains | Yes |

**Terminal apps**: When "Modify environment variables" is checked, new terminals automatically use the SOCKS proxy. Existing terminals must be reopened. On non-GNOME/KDE desktops, this option is required for terminal proxy support.

**Firefox**: Configure proxy separately in browser settings. Use the FoxyProxy extension for easy switching. Chromium-based browsers follow system proxy settings automatically (GNOME/KDE).

---

## Smart Routing Modes

| Mode | LAN Traffic | China Mainland Traffic | Overseas Traffic |
|---|---|---|---|
| **Bypass LAN + China** (default) | Direct | Direct | Via proxy |
| **Bypass LAN** | Direct | Via proxy | Via proxy |
| **Bypass China** | Via proxy | Direct | Via proxy |
| **Global** | Via proxy | Via proxy | Via proxy |

The router runs as a built-in SOCKS5 server on the configurable router port. China IP matching uses embedded APNIC delegation data with binary search for O(log n) performance.

---

## Architecture Support

- **x86_64** (amd64) — Pre-built releases available
- **i686** (32-bit x86) — Build from source
- **aarch64** (ARM 64-bit) — Build from source

---

## Installation

### Quick Build (Recommended)

```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
npm install
./build.sh
```

Output in `build/`:
- `*.deb` — Debian/Ubuntu
- `*.rpm` — Fedora/openSUSE
- `*.tar.gz` — Portable archive

### Manual Build

```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
npm install
npm run tauri build
```

### Cross-Compilation

```bash
# i686
rustup target add i686-unknown-linux-gnu
npm run tauri build -- --target i686-unknown-linux-gnu

# aarch64
rustup target add aarch64-unknown-linux-gnu
npm run tauri build -- --target aarch64-unknown-linux-gnu
```

### Portable tar.gz Usage

Required system libraries: **gtk3**, **webkit2gtk4.1**

```bash
tar -xzf shadowsocksr-client-linux_*.tar.gz
cd shadowsocksr-client-linux
./shadowsocksr-client-linux
```

---

## Usage

1. Launch the application
2. Click **"+ Add New Configuration"** and fill in your SSR server details:
   - Profile Name (letters only)
   - Server Address & Port
   - Password
   - Encryption Method, Protocol, Obfuscation
   - **SSR Service Port** — internal port for the SSR sidecar (must differ from the router port)
3. Select a configuration from the sidebar
4. On the dashboard, configure the **Router Port** (exposed SOCKS5 port) — must be different from the SSR port
5. Choose a **Routing Mode** (Bypass LAN+China recommended)
6. Toggle **"Modify environment variables"** as needed (see warnings below the checkbox)
7. Click **"Enable Proxy"**

### Proxy Settings

Once enabled, applications can connect through:
- **SOCKS5**: `127.0.0.1:<router-port>` (shown on the dashboard)

### Without Environment Variables (Proxychains)

When "Modify environment variables" is unchecked, use proxychains for per-command routing:

```bash
# Install
sudo apt install proxychains4

# Edit /etc/proxychains4.conf, add to [ProxyList]:
socks5 127.0.0.1 1080

# Usage
proxychains curl https://www.google.com
proxychains git clone https://github.com/...
```

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Vue 3 + Composition API |
| Desktop Framework | Tauri 2.0 |
| Backend (Routing) | Rust + Tokio (built-in SOCKS5 proxy router) |
| Backend (SSR) | shadowsocksr-native sidecar |
| Build Tool | Vite |
| i18n | vue-i18n |

---

## Project Structure

```
shadowsocksr-client-linux/
├── src/                    # Vue frontend
│   ├── components/         # Vue components (ConfigForm, ConfigList, ProxyControl)
│   ├── locales/           # 7 language translation files
│   └── utils/             # Tauri API wrappers
├── src-tauri/             # Tauri + Rust backend
│   ├── binaries/          # SSR native sidecar binaries (3 architectures)
│   ├── src/
│   │   ├── router.rs      # SOCKS5 proxy router with smart routing
│   │   ├── china_ip.rs    # China IP range matching (APNIC data)
│   │   ├── ssr_process.rs # Sidecar lifecycle management
│   │   ├── proxy.rs       # Desktop proxy integration (GNOME/KDE/XFCE/WM)
│   │   └── model.rs       # Data models + RouteMode enum
│   └── tauri.conf.json
└── build.sh               # One-click build + packaging script
```

---

## License

MIT — see [LICENSE](LICENSE).

---

## Acknowledgments

- **[shadowsocksr-native](https://github.com/ShadowsocksR-Live/shadowsocksr-native)** by [ssrlive](https://github.com/ssrlive) — Core SSR implementation

---

## Disclaimer

This software is for educational and research purposes only. Users are responsible for complying with local laws and regulations.
