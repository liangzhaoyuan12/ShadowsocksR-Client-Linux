# ShadowsocksR Client for Linux

<div align="center">

**A modern, cross-platform ShadowsocksR client for Linux built with Tauri + Vue 3**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-blue)](https://tauri.app/)
[![Vue](https://img.shields.io/badge/Vue-3.5-green)](https://vuejs.org/)

[简体中文](README.zh-CN.md) | [繁體中文（台灣）](README.zh-TW.md) | [繁體中文（港澳）](README.zh-HK.md) | [日本語](README.ja-JP.md) | [한국어](README.ko-KR.md) | [Русский](README.ru-RU.md)

</div>

### Features

- **Modern UI**: Clean and intuitive interface built with Vue 3
- **Multi-language Support**: Supports Simplified Chinese, Traditional Chinese (Taiwan/Hong Kong), English, Japanese, Korean, and Russian
- **Dark Mode**: Automatic dark/light theme switching based on system preferences
- **System Proxy Integration**: Automatically configures system proxy for GNOME and KDE desktop environments
- **Multiple Configurations**: Manage multiple SSR profiles with ease
- **Secure**: Built on the reliable shadowsocksr-native backend

### Desktop Environment Support

This application provides automatic system proxy configuration for all major Linux desktop environments:

| Category | Desktop Environments | Proxy Method | GUI Restart Needed |
|---|---|---|---|
| **GNOME family** | GNOME, Ubuntu, Cinnamon, MATE, COSMIC, Budgie, Pantheon, Unity, Deepin, UOS, UKUI | gsettings | No |
| **KDE Plasma** | KDE Plasma 5/6, LXQt | kwriteconfig5/6 + dbus | No |
| **XFCE** | XFCE, Xubuntu | xfconf-query | Yes |
| **Window Managers** | i3, sway, Hyprland, niri, Openbox, Fluxbox, dwm, awesome, bspwm, Qtile, herbstluftwm, icewm, jwm, xmonad, Enlightenment | Environment variables | Yes |

**Terminal applications**: On all desktops, terminal applications automatically use the SOCKS proxy after enabling. If terminal windows were already open, reopen them for the proxy settings to take effect.

When using Firefox browser, you need to configure proxy settings separately in the browser. It is recommended to use the FoxyProxy extension for easy proxy switching. Chromium-based browsers will automatically use system proxy settings (on GNOME/KDE).

### Architecture Support

This project supports multiple CPU architectures:
- **x86_64** (amd64) - Currently pre-built and released
- **i686** (32-bit x86) - Build from source if needed
- **aarch64** (ARM 64-bit) - Build from source if needed

**Note**: Pre-built releases are currently only available for x86_64 architecture. If you need builds for i686 or aarch64, please compile from source using the instructions below.

### Installation

#### Quick Build (Recommended)

Use the `build.sh` script to build and package everything automatically:

```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
npm install
./build.sh
```

The `build/` directory will contain:
- `*.deb` — Debian/Ubuntu package
- `*.rpm` — Fedora/openSUSE package
- `shadowsocksr-client-linux_{version}_{arch}.tar.gz` — Portable archive (non-deb/RPM users)

#### Manual Build from Source

1. Clone the repository:
```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
```

2. Install dependencies:
```bash
npm install
```

3. Build the application for your current architecture:
```bash
npm run tauri build
```

The built application will be available in `src-tauri/target/release/bundle/`.

#### Cross-Compilation for Other Architectures

If you need to build for a different architecture, you can specify the target:

**For i686 (32-bit):**
```bash
# Install the target
rustup target add i686-unknown-linux-gnu

# Build for i686
npm run tauri build -- --target i686-unknown-linux-gnu
```

**For aarch64 (ARM 64-bit):**
```bash
# Install the target
rustup target add aarch64-unknown-linux-gnu

# Build for aarch64
npm run tauri build -- --target aarch64-unknown-linux-gnu
```

**Note**: Cross-compilation may require additional system dependencies and toolchains. Make sure you have the appropriate cross-compilation tools installed for your target architecture.

#### Using Pre-built tar.gz Package (Non-deb/RPM Users)

For users who are not on deb-based (Debian, Ubuntu, etc.) or rpm-based (Fedora, openSUSE, etc.) distributions, you can run the application directly from the `tar.gz` archive in the release.

**Required Dependencies:**

Before running the application, make sure you have the following system libraries installed:

- **gtk3** - GTK+ graphical user interface library
- **webkit2gtk4.1** - WebKitGTK for GTK 3 and libsoup 3

**Installation Instructions:**

1. Download the `tar.gz` package from the releases page (e.g. `shadowsocksr-client-linux_0.3.0_x86_64.tar.gz`)
2. Extract the archive:
   ```bash
   tar -xzf shadowsocksr-client-linux_*.tar.gz
   ```
3. Navigate to the extracted directory and run the executable:
   ```bash
   cd shadowsocksr-client-linux
   ./shadowsocksr-client-linux
   ```

If the application fails to start, check if all required dependencies are installed on your system.

### Usage

1. Launch the application from your application menu or terminal
2. Click "Add New Configuration" to create your first SSR profile
3. Fill in your server details:
   - Profile Name (letters only)
   - Server Address
   - Server Port
   - Password
   - Encryption Method
   - Protocol
   - Obfuscation
4. Select your configuration from the list
5. Click "Enable Proxy" to start the proxy

#### Local Proxy Settings

Once enabled, the local SOCKS5 proxy will be available at:
- **Address**: `127.0.0.1`
- **Port**: As configured in your profile (default: 1080)

#### Proxy Behavior by Desktop

- **GNOME family and KDE Plasma**: GUI applications adopt proxy settings automatically — no restart needed. Terminal applications will use the proxy after reopening terminal windows.
- **XFCE and Window Managers (i3, sway, Hyprland, etc.)**: All applications (both GUI and terminal) must be reopened for proxy settings to take effect. The proxy is configured via environment variables (`all_proxy`, `ALL_PROXY`) written to `~/.config/environment.d/` and `~/.xprofile`.

### Technology Stack

- **Frontend**: Vue 3 with Composition API
- **Desktop Framework**: Tauri 2.0
- **Backend**: shadowsocksr-native
- **Build Tool**: Vite
- **Internationalization**: vue-i18n

### Project Structure

```
shadowsocksr-client-linux/
├── src/                    # Vue frontend source
│   ├── components/         # Vue components
│   ├── locales/           # Translation files
│   └── utils/             # Utility functions
├── src-tauri/             # Tauri backend
│   ├── binaries/          # SSR native binaries
│   ├── src/               # Rust source code
│   └── tauri.conf.json    # Tauri configuration
└── package.json           # Node.js dependencies
```

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

Special thanks to the upstream projects and contributors:

- **[shadowsocksr-native](https://github.com/ShadowsocksR-Live/shadowsocksr-native)** by [ssrlive](https://github.com/ssrlive) - The core SSR implementation that powers this client

### Disclaimer

This software is for educational and research purposes only. Users are responsible for complying with local laws and regulations when using this software.
