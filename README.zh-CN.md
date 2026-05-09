# ShadowsocksR Linux 客户端

<div align="center">

**基于 Tauri + Vue 3 构建的现代化 Linux ShadowsocksR 客户端**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-blue)](https://tauri.app/)
[![Vue](https://img.shields.io/badge/Vue-3.5-green)](https://vuejs.org/)

[English](README.md) | [繁體中文（台灣）](README.zh-TW.md) | [繁體中文（港澳）](README.zh-HK.md) | [日本語](README.ja-JP.md) | [한국어](README.ko-KR.md) | [Русский](README.ru-RU.md)

</div>

### 功能特性

- **现代化界面**: 基于 Vue 3 构建的简洁直观的用户界面
- **多语言支持**: 支持简体中文、繁体中文（台湾/港澳）、英语、日语、韩语和俄语
- **深色模式**: 根据系统偏好自动切换深色/浅色主题
- **系统代理集成**: 自动为 GNOME 和 KDE 桌面环境配置系统代理
- **多配置管理**: 轻松管理多个 SSR 配置文件
- **安全可靠**: 基于可靠的 shadowsocksr-native 后端

### 桌面环境支持

本应用为主流 Linux 桌面环境提供自动系统代理配置：

| 分类 | 桌面环境 | 代理方式 | GUI 需重启 |
|---|---|---|---|
| **GNOME 系列** | GNOME、Ubuntu、Cinnamon、MATE、COSMIC、Budgie、Pantheon、Unity、Deepin、UOS、UKUI | gsettings | 否 |
| **KDE Plasma** | KDE Plasma 5/6、LXQt | kwriteconfig5/6 + dbus | 否 |
| **XFCE** | XFCE、Xubuntu | xfconf-query | 是 |
| **窗口管理器** | i3、sway、Hyprland、niri、Openbox、Fluxbox、dwm、awesome、bspwm、Qtile、herbstluftwm、icewm、jwm、xmonad、Enlightenment | 环境变量 | 是 |

**终端应用**：所有桌面环境下，开启代理后终端应用自动通过 SOCKS 代理联网。若终端窗口已打开，请重新打开终端窗口以生效。

使用火狐浏览器时，需要在浏览器中单独配置代理设置。推荐使用 FoxyProxy 扩展以便在不同代理环境间快速切换。Chromium 内核浏览器会自动使用系统代理设置（GNOME/KDE 下）。

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

#### 使用预编译 tar.gz 包（非 deb/RPM 用户）

对于不使用 deb 包（Debian、Ubuntu 等）或 rpm 包（Fedora、openSUSE 等）管理系统的用户，可以直接从 tar.gz 压缩包运行应用。

**所需依赖：**

运行应用前，请确保已安装以下系统库：

- **gtk3** - GTK+ 图形用户界面库
- **webkit2gtk4.1** - 基于 GTK 3 和 libsoup 3 的 WebKitGTK

**使用说明：**

1. 从发布页面下载 tar.gz 包
2. 解压压缩包：
   ```bash
   tar -xzf shadowsocksr-linux-*.tar.gz
   ```
3. 进入解压后的目录并运行可执行文件：
   ```bash
   cd shadowsocksr-linux
   ./shadowsocksr-client-linux
   ```

如果应用无法启动，请检查系统是否已安装所有必需的依赖库。

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

#### 各桌面代理行为

- **GNOME 系列和 KDE Plasma**：GUI 应用自动跟随代理设置，无需重启。终端应用需重新打开终端窗口后生效。
- **XFCE 和窗口管理器（i3、sway、Hyprland 等）**：所有应用（GUI 和终端）均需重新打开以生效。代理通过环境变量（`all_proxy`、`ALL_PROXY`）写入 `~/.config/environment.d/` 和 `~/.xprofile` 实现。

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
