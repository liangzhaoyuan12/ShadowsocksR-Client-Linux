# ShadowsocksR Linux 客户端

<div align="center">

**基于 Tauri + Vue 3 构建的现代化 Linux ShadowsocksR 客户端**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-blue)](https://tauri.app/)
[![Vue](https://img.shields.io/badge/Vue-3.5-green)](https://vuejs.org/)

[English](README.md) | [繁體中文（台灣）](README.zh-TW.md) | [繁體中文（港澳）](README.zh-HK.md) | [日本語](README.ja-JP.md) | [한국어](README.ko-KR.md) | [Русский](README.ru-RU.md)

</div>

---

## 功能特性

- **智能分流路由**：内建 SOCKS5 代理路由器，支持 4 种路由模式 —— 绕开局域网 + 中国大陆 / 绕开局域网 / 绕开中国大陆 / 全局。国内流量自动直连，海外流量走代理，无需手动切换。
- **双端口架构**：路由端口（对外暴露，Dashboard 上配置）与 SSR 服务端口（内部使用，编辑页配置）独立运行。系统代理设置（gsettings、kwriteconfig、环境变量）始终指向路由端口，行为一致。
- **环境变量控制**：可选勾选框 —— 勾选后自动管理系统环境变量（`all_proxy`/`ALL_PROXY`）。不勾选时，可使用 proxychains 按需为单个命令走代理，不影响全局环境。
- **Proxychains 配置指南**：内建 proxychains 配置说明，根据当前配置动态显示端口。
- **现代化界面**：基于 Vue 3 + Composition API 构建的简洁直观界面。
- **多语言支持**：7 种语言 —— 简体中文、繁体中文（台湾/港澳）、英语、日语、韩语、俄语。
- **深色模式**：根据系统偏好自动切换深色/浅色主题。
- **系统代理集成**：自动配置 GNOME、KDE Plasma 和 XFCE 桌面环境代理。
- **多配置管理**：轻松管理多个 SSR 配置文件。

---

## 桌面环境支持

| 分类 | 桌面环境 | 代理方式 | GUI 需重启 |
|---|---|---|---|
| **GNOME 系列** | GNOME、Ubuntu、Cinnamon、MATE、COSMIC、Budgie、Pantheon、Unity、Deepin、UOS、UKUI | gsettings | 否 |
| **KDE Plasma** | KDE Plasma 5/6、LXQt | kwriteconfig5/6 + dbus | 否 |
| **XFCE** | XFCE、Xubuntu | xfconf-query | 是 |
| **窗口管理器** | i3、sway、Hyprland、Openbox、Fluxbox、dwm、awesome、bspwm、Qtile、herbstluftwm、icewm、jwm、xmonad、Enlightenment | 环境变量（勾选时）或 proxychains | 是 |

**终端应用**：勾选"更改环境变量"后，新开的终端自动通过 SOCKS 代理联网，已打开的终端需重新打开。非 GNOME/KDE 桌面环境下，必须勾选此项才能在终端使用代理。

**火狐浏览器**：需在浏览器设置中单独配置代理，推荐安装 FoxyProxy 扩展以便一键切换。Chromium 内核浏览器自动跟随系统代理（GNOME/KDE 下）。

---

## 智能分流路由模式

| 模式 | 局域网流量 | 中国大陆流量 | 海外流量 |
|---|---|---|---|
| **绕开局域网 + 中国大陆**（默认） | 直连 | 直连 | 走代理 |
| **绕开局域网** | 直连 | 走代理 | 走代理 |
| **绕开中国大陆** | 走代理 | 直连 | 走代理 |
| **全局** | 走代理 | 走代理 | 走代理 |

路由器作为内建 SOCKS5 服务器运行在可配的路由端口上。中国 IP 匹配使用内嵌的 APNIC 委派数据，二分查找实现 O(log n) 高性能。

---

## 架构支持

- **x86_64**（amd64）— 提供预编译版本
- **i686**（32 位 x86）— 需从源码编译
- **aarch64**（ARM 64 位）— 需从源码编译

---

## 安装方法

### 快速构建（推荐）

```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
npm install
./build.sh
```

`build/` 目录输出：
- `*.deb` — Debian/Ubuntu 安装包
- `*.rpm` — Fedora/openSUSE 安装包
- `*.tar.gz` — 便携压缩包

### 手动编译

```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
npm install
npm run tauri build
```

### 交叉编译

```bash
# i686
rustup target add i686-unknown-linux-gnu
npm run tauri build -- --target i686-unknown-linux-gnu

# aarch64
rustup target add aarch64-unknown-linux-gnu
npm run tauri build -- --target aarch64-unknown-linux-gnu
```

### 便携包使用

所需系统库：**gtk3**、**webkit2gtk4.1**

```bash
tar -xzf shadowsocksr-client-linux_*.tar.gz
cd shadowsocksr-client-linux
./shadowsocksr-client-linux
```

---

## 使用说明

1. 启动应用
2. 点击 **"+ 新建配置"**，填写 SSR 服务器信息：
   - 配置名称（仅字母）
   - 服务器地址和端口
   - 密码
   - 加密方式、协议、混淆
   - **SSR 服务端口** — SSR 侧载的内部端口（须与路由端口不同）
3. 在侧边栏选择一个配置
4. 在 Dashboard 上配置**路由端口**（对外暴露的 SOCKS5 端口）— 须与 SSR 端口不同
5. 选择**路由模式**（推荐"绕开局域网 + 中国大陆"）
6. 根据需要勾选/取消**"更改环境变量"**（详见选框下方的警告提示）
7. 点击**"启用代理"**

### 代理设置

启用后，应用可通过以下地址连接代理：
- **SOCKS5**：`127.0.0.1:<路由端口>`（显示在 Dashboard 上）

### 不使用环境变量（Proxychains）

取消勾选"更改环境变量"后，可使用 proxychains 按需走代理：

```bash
# 安装
sudo apt install proxychains4

# 编辑 /etc/proxychains4.conf，在 [ProxyList] 段添加：
socks5 127.0.0.1 1080

# 使用
proxychains curl https://www.google.com
proxychains git clone https://github.com/...
```

---

## 技术栈

| 层 | 技术 |
|---|---|
| 前端 | Vue 3 + Composition API |
| 桌面框架 | Tauri 2.0 |
| 后端（路由） | Rust + Tokio（内建 SOCKS5 代理路由器） |
| 后端（SSR） | shadowsocksr-native 侧载 |
| 构建工具 | Vite |
| 国际化 | vue-i18n |

---

## 项目结构

```
shadowsocksr-client-linux/
├── src/                    # Vue 前端
│   ├── components/         # Vue 组件（ConfigForm、ConfigList、ProxyControl）
│   ├── locales/           # 7 语言翻译文件
│   └── utils/             # Tauri API 封装
├── src-tauri/             # Tauri + Rust 后端
│   ├── binaries/          # SSR 原生侧载文件（3 种架构）
│   ├── src/
│   │   ├── router.rs      # SOCKS5 代理路由器（智能分流）
│   │   ├── china_ip.rs    # 中国 IP 范围匹配（APNIC 数据）
│   │   ├── ssr_process.rs # 侧载进程生命周期管理
│   │   ├── proxy.rs       # 桌面代理集成（GNOME/KDE/XFCE/WM）
│   │   └── model.rs       # 数据模型 + RouteMode 枚举
│   └── tauri.conf.json
└── build.sh               # 一键构建打包脚本
```

---

## 开源协议

MIT — 详见 [LICENSE](LICENSE)。

---

## 致谢

- **[shadowsocksr-native](https://github.com/ShadowsocksR-Live/shadowsocksr-native)** 由 [ssrlive](https://github.com/ssrlive) 开发 — 核心 SSR 实现

---

## 免责声明

本软件仅用于教育和研究目的。用户在使用本软件时应遵守当地法律法规。
