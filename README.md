# ShadowsocksR Client for Linux

[English](#shadowsocksr-client-for-linux) | [简体中文](#shadowsocksr-linux-客户端)

---

## English

<div align="center">

**A modern, cross-platform ShadowsocksR client for Linux built with Tauri + Vue 3**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-blue)](https://tauri.app/)
[![Vue](https://img.shields.io/badge/Vue-3.5-green)](https://vuejs.org/)

</div>

### Features

- **Modern UI**: Clean and intuitive interface built with Vue 3
- **Multi-language Support**: Supports Simplified Chinese, Traditional Chinese (Taiwan/Hong Kong), English, Japanese, Korean, and Russian
- **Dark Mode**: Automatic dark/light theme switching based on system preferences
- **System Proxy Integration**: Automatically configures system proxy for GNOME and KDE desktop environments
- **Multiple Configurations**: Manage multiple SSR profiles with ease
- **Secure**: Built on the reliable shadowsocksr-native backend

### Desktop Environment Support

This application provides automatic system proxy configuration for the following desktop environments:

- **GNOME and derivatives**: Gnome, Cosmic, Cinnamon, MATE, dde (deepin desktop environment), etc.
- **KDE Plasma and derivatives**: KDE Plasma, etc.

**For other desktop environments** (XFCE, LXQt, etc.), please configure system proxy manually in your desktop environment's network settings.

When using Firefox browser, you need to configure proxy settings separately in the browser. It is recommended to use the FoxyProxy extension for easy proxy switching. Chromium-based browsers will automatically use system proxy settings.

### Architecture Support

This project supports multiple CPU architectures:
- **x86_64** (amd64) - Currently pre-built and released
- **i686** (32-bit x86) - Build from source if needed
- **aarch64** (ARM 64-bit) - Build from source if needed

**Note**: Pre-built releases are currently only available for x86_64 architecture. If you need builds for i686 or aarch64, please compile from source using the instructions below.

### Installation

#### Building from Source

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

#### Terminal Applications

To force terminal applications to use the proxy, install and configure proxychains:

1. Install proxychains
2. Edit `~/.config/proxychains/proxychains.conf`
3. Add at the end: `socks5 127.0.0.1 <port>` (replace `<port>` with your local port)
4. Use by prefixing commands with `proxychains4`:
   ```bash
   proxychains4 curl https://www.google.com
   ```

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

---

# shadowsocksr-linux-客户端

<div align="center">

**基于 Tauri + Vue 3 构建的现代化 Linux ShadowsocksR 客户端**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-blue)](https://tauri.app/)
[![Vue](https://img.shields.io/badge/Vue-3.5-green)](https://vuejs.org/)

</div>

### 功能特性

- **现代化界面**: 基于 Vue 3 构建的简洁直观的用户界面
- **多语言支持**: 支持简体中文、繁体中文（台湾/港澳）、英语、日语、韩语和俄语
- **深色模式**: 根据系统偏好自动切换深色/浅色主题
- **系统代理集成**: 自动为 GNOME 和 KDE 桌面环境配置系统代理
- **多配置管理**: 轻松管理多个 SSR 配置文件
- **安全可靠**: 基于可靠的 shadowsocksr-native 后端

### 桌面环境支持

本应用为以下桌面环境提供自动系统代理配置：

- **GNOME 及其衍生版**: Gnome, Cosmic, Cinnamon, MATE, dde (deepin桌面环境)
- **KDE Plasma 及其衍生版**: KDE Plasma等

**对于其他桌面环境**（XFCE、LXQt、MATE、Cinnamon 等），请在您的桌面环境的网络设置中手动配置系统代理。

使用火狐浏览器时，需要在浏览器中单独配置代理设置。推荐使用 FoxyProxy 扩展以便在不同代理环境间快速切换。Chromium 内核浏览器会自动使用系统代理设置。

### 架构支持

本项目支持多种 CPU 架构：
- **x86_64** (amd64) - 当前提供预编译版本
- **i686** (32位 x86) - 如需使用请从源码编译
- **aarch64** (ARM 64位) - 如需使用请从源码编译

**注意**：目前发布的预编译版本仅支持 x86_64 架构。如果您需要 i686 或 aarch64 版本，请使用以下说明从源码编译。

### 安装方法

#### 从源码编译

1. 克隆仓库：
```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
```

2. 安装依赖：
```bash
npm install
```

3. 为当前架构构建应用：
```bash
npm run tauri build
```

构建完成的应用将位于 `src-tauri/target/release/bundle/` 目录中。

#### 交叉编译其他架构版本

如果您需要为其他架构构建，可以指定目标架构：

**编译 i686（32位）版本：**
```bash
# 安装目标平台支持
rustup target add i686-unknown-linux-gnu

# 为 i686 构建
npm run tauri build -- --target i686-unknown-linux-gnu
```

**编译 aarch64（ARM 64位）版本：**
```bash
# 安装目标平台支持
rustup target add aarch64-unknown-linux-gnu

# 为 aarch64 构建
npm run tauri build -- --target aarch64-unknown-linux-gnu
```

**注意**：交叉编译可能需要额外的系统依赖和工具链。请确保您已为目标架构安装了适当的交叉编译工具。

### 使用说明

1. 从应用菜单或终端启动应用
2. 点击"新建配置"创建您的第一个 SSR 配置文件
3. 填写服务器详情：
   - 配置名称（仅字母）
   - 服务器地址
   - 服务器端口
   - 密码
   - 加密方式
   - 协议
   - 混淆
4. 从列表中选择您的配置
5. 点击"启用代理"启动代理服务

#### 本地代理设置

启用后，本地 SOCKS5 代理将在以下地址可用：
- **地址**: `127.0.0.1`
- **端口**: 您在配置中设置的端口（默认：1080）

#### 终端应用代理

要强制终端应用使用代理，请安装并配置 proxychains：

1. 安装 proxychains
2. 编辑 `~/.config/proxychains/proxychains.conf`
3. 在文件末尾添加：`socks5 127.0.0.1 <端口号>`（将 `<端口号>` 替换为您的本地端口）
4. 在命令前添加 `proxychains4` 前缀使用：
   ```bash
   proxychains4 curl https://www.google.com
   ```

### 技术栈

- **前端**: Vue 3 + Composition API
- **桌面框架**: Tauri 2.0
- **后端**: shadowsocksr-native
- **构建工具**: Vite
- **国际化**: vue-i18n

### 项目结构

```
shadowsocksr-client-linux/
├── src/                    # Vue 前端源码
│   ├── components/         # Vue 组件
│   ├── locales/           # 翻译文件
│   └── utils/             # 工具函数
├── src-tauri/             # Tauri 后端
│   ├── binaries/          # SSR 原生二进制文件
│   ├── src/               # Rust 源码
│   └── tauri.conf.json    # Tauri 配置
└── package.json           # Node.js 依赖
```

### 开源协议

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

### 致谢

特别感谢上游项目及贡献者：

- **[shadowsocksr-native](https://github.com/ShadowsocksR-Live/shadowsocksr-native)** 由 [ssrlive](https://github.com/ssrlive) 开发 - 为本客户端提供核心 SSR 实现

### 免责声明

本软件仅用于教育和研究目的。用户在使用本软件时应遵守当地法律法规。
