# ShadowsocksR Linux 用戶端

<div align="center">

**使用 Tauri + Vue 3 建構的現代化跨平台 ShadowsocksR Linux 用戶端**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-blue)](https://tauri.app/)
[![Vue](https://img.shields.io/badge/Vue-3.5-green)](https://vuejs.org/)

[English](README.md) | [简体中文](README.zh-CN.md) | 繁體中文（台灣） | [繁體中文（港澳）](README.zh-HK.md) | [日本語](README.ja-JP.md) | [한국어](README.ko-KR.md) | [Русский](README.ru-RU.md)

</div>

---

## 功能特色

- **智慧路由**：內建 SOCKS5 代理路由器，支援 4 種路由模式 — 繞過區域網路 + 中國大陸 / 繞過區域網路 / 繞過中國 / 全域。自動將國內流量直連，海外流量透過代理轉發，無需手動切換。
- **雙埠架構**：路由器埠（對外暴露給應用程式，可在儀表板設定）與 SSR 服務埠（內部使用，可在編輯器中設定）獨立運行。系統代理設定（gsettings、kwriteconfig、環境變數）始終指向路由器埠，確保行為一致。
- **環境變數控制**：可選核取方塊 — 勾選時，系統環境變數（`all_proxy`/`ALL_PROXY`）會自動管理。取消勾選時，可使用 proxychains 進行單一指令代理路由，不影響全域環境。
- **Proxychains 指南**：內建 proxychains 設定說明，動態顯示設定內容。
- **現代化介面**：使用 Vue 3 + Composition API 建構的簡潔直觀介面。
- **多語言支援**：支援 7 種語言 — 簡體中文、繁體中文（台灣/港澳）、英文、日文、韓文、俄文。
- **深色模式**：根據系統偏好自動切換深色/淺色主題。
- **系統代理整合**：自動設定 GNOME、KDE Plasma 和 XFCE 桌面環境。
- **多組設定**：輕鬆管理多個 SSR 設定檔。

---

## 桌面環境支援

| 類別 | 桌面環境 | 代理方式 | 需重啟 GUI |
|---|---|---|---|
| **GNOME 系列** | GNOME、Ubuntu、Cinnamon、MATE、COSMIC、Budgie、Pantheon、Unity、Deepin、UOS、UKUI | gsettings | 否 |
| **KDE Plasma** | KDE Plasma 5/6、LXQt | kwriteconfig5/6 + dbus | 否 |
| **XFCE** | XFCE、Xubuntu | xfconf-query | 是 |
| **視窗管理器** | i3、sway、Hyprland、Openbox、Fluxbox、dwm、awesome、bspwm、Qtile、herbstluftwm、icewm、jwm、xmonad、Enlightenment | 環境變數（勾選時）或 proxychains | 是 |

**終端機應用程式**：勾選「修改環境變數」後，新開啟的終端機將自動使用 SOCKS 代理。已開啟的終端機需重新開啟。在非 GNOME/KDE 桌面上，必須勾選此選項才能支援終端機代理。

**Firefox**：需在瀏覽器設定中單獨設定代理。建議使用 FoxyProxy 擴充功能輕鬆切換。基於 Chromium 的瀏覽器會自動遵循系統代理設定（GNOME/KDE）。

---

## 智慧路由模式

| 模式 | 區域網路流量 | 中國大陸流量 | 海外流量 |
|---|---|---|---|
| **繞過區域網路 + 中國**（預設） | 直連 | 直連 | 透過代理 |
| **繞過區域網路** | 直連 | 透過代理 | 透過代理 |
| **繞過中國** | 透過代理 | 直連 | 透過代理 |
| **全域** | 透過代理 | 透過代理 | 透過代理 |

路由器作為內建 SOCKS5 伺服器在可設定的路由器埠上運行。中國 IP 比對使用內嵌的 APNIC 委派資料，透過二分搜尋實現 O(log n) 效能。

---

## 架構支援

- **x86_64** (amd64) — 提供預編譯發行版
- **i686** (32 位元 x86) — 從原始碼編譯
- **aarch64** (ARM 64 位元) — 從原始碼編譯

---

## 安裝

### 快速編譯（推薦）

```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
npm install
./build.sh
```

輸出於 `build/` 目錄：
- `*.deb` — Debian/Ubuntu
- `*.rpm` — Fedora/openSUSE
- `*.tar.gz` — 可攜式壓縮檔

### 手動編譯

```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
npm install
npm run tauri build
```

### 跨平台編譯

```bash
# i686
rustup target add i686-unknown-linux-gnu
npm run tauri build -- --target i686-unknown-linux-gnu

# aarch64
rustup target add aarch64-unknown-linux-gnu
npm run tauri build -- --target aarch64-unknown-linux-gnu
```

### 可攜式 tar.gz 使用方法

所需系統函式庫：**gtk3**、**webkit2gtk4.1**

```bash
tar -xzf shadowsocksr-client-linux_*.tar.gz
cd shadowsocksr-client-linux
./shadowsocksr-client-linux
```

---

## 使用方法

1. 啟動應用程式
2. 點選「**+ 新增設定**」，填寫 SSR 伺服器資訊：
   - 設定檔名稱（僅限字母）
   - 伺服器位址與埠號
   - 密碼
   - 加密方式、協定、混淆
   - **SSR 服務埠** — SSR sidecar 的內部埠號（必須與路由器埠不同）
3. 從側邊欄選擇一個設定檔
4. 在儀表板中設定**路由器埠**（對外暴露的 SOCKS5 埠號）— 必須與 SSR 埠號不同
5. 選擇**路由模式**（建議使用「繞過區域網路 + 中國」）
6. 依需求切換「**修改環境變數**」（請參閱核取方塊下方的警告說明）
7. 點選「**啟用代理**」

### 代理設定

啟用後，應用程式可透過以下方式連線：
- **SOCKS5**：`127.0.0.1:<router-port>`（顯示於儀表板）

### 不使用環境變數（使用 Proxychains）

取消勾選「修改環境變數」時，使用 proxychains 進行單一指令路由：

```bash
# 安裝
sudo apt install proxychains4

# 編輯 /etc/proxychains4.conf，在 [ProxyList] 中加入：
socks5 127.0.0.1 1080

# 使用方式
proxychains curl https://www.google.com
proxychains git clone https://github.com/...
```

---

## 技術架構

| 層級 | 技術 |
|---|---|
| 前端 | Vue 3 + Composition API |
| 桌面框架 | Tauri 2.0 |
| 後端（路由） | Rust + Tokio（內建 SOCKS5 代理路由器） |
| 後端（SSR） | shadowsocksr-native sidecar |
| 建構工具 | Vite |
| 國際化 | vue-i18n |

---

## 專案結構

```
shadowsocksr-client-linux/
├── src/                    # Vue 前端
│   ├── components/         # Vue 元件（ConfigForm、ConfigList、ProxyControl）
│   ├── locales/           # 7 種語言翻譯檔
│   └── utils/             # Tauri API 封裝
├── src-tauri/             # Tauri + Rust 後端
│   ├── binaries/          # SSR 原生 sidecar 執行檔（3 種架構）
│   ├── src/
│   │   ├── router.rs      # SOCKS5 代理路由器（智慧路由）
│   │   ├── china_ip.rs    # 中國 IP 範圍比對（APNIC 資料）
│   │   ├── ssr_process.rs # Sidecar 生命週期管理
│   │   ├── proxy.rs       # 桌面代理整合（GNOME/KDE/XFCE/WM）
│   │   └── model.rs       # 資料模型 + RouteMode 列舉
│   └── tauri.conf.json
└── build.sh               # 一鍵編譯與打包腳本
```

---

## 授權條款

MIT — 詳見 [LICENSE](LICENSE)。

---

## 致謝

- **[shadowsocksr-native](https://github.com/ShadowsocksR-Live/shadowsocksr-native)** by [ssrlive](https://github.com/ssrlive) — 核心 SSR 實作

---

## 免責聲明

本軟體僅供教育和研究用途。使用者需遵守當地法律法規。
