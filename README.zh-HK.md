# ShadowsocksR Linux 客戶端

<div align="center">

**基於 Tauri + Vue 3 建構的現代化 Linux ShadowsocksR 客戶端**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-blue)](https://tauri.app/)
[![Vue](https://img.shields.io/badge/Vue-3.5-green)](https://vuejs.org/)

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文（台灣）](README.zh-TW.md) | [日本語](README.ja-JP.md) | [한국어](README.ko-KR.md) | [Русский](README.ru-RU.md)

</div>

### 功能特性

- **現代化介面**: 基於 Vue 3 建構的簡潔直觀的使用者介面
- **多語言支援**: 支援簡體中文、繁體中文（台灣/港澳）、英語、日語、韓語和俄語
- **深色模式**: 根據系統偏好自動切換深色/淺色主題
- **系統代理整合**: 自動為 GNOME 和 KDE 桌面環境設定系統代理
- **多設定管理**: 輕鬆管理多個 SSR 設定檔
- **安全可靠**: 基於可靠的 shadowsocksr-native 後端

### 桌面環境支援

本應用為主流 Linux 桌面環境提供自動系統代理設定：

| 分類 | 桌面環境 | 代理方式 | GUI 需重啟 |
|---|---|---|---|
| **GNOME 系列** | GNOME、Ubuntu、Cinnamon、MATE、COSMIC、Budgie、Pantheon、Unity、Deepin、UOS、UKUI | gsettings | 否 |
| **KDE Plasma** | KDE Plasma 5/6、LXQt | kwriteconfig5/6 + dbus | 否 |
| **XFCE** | XFCE、Xubuntu | xfconf-query | 是 |
| **視窗管理器** | i3、sway、Hyprland、niri、Openbox、Fluxbox、dwm、awesome、bspwm、Qtile、herbstluftwm、icewm、jwm、xmonad、Enlightenment | 環境變數 | 是 |

**終端應用**：所有桌面環境下，開啟代理後終端應用程式自動透過 SOCKS 代理連網。若終端機視窗已開啟，請重新開啟終端機視窗以生效。

使用 Firefox 瀏覽器時，需要在瀏覽器中單獨設定代理。推薦使用 FoxyProxy 擴充功能以便在不同代理環境間快速切換。Chromium 核心瀏覽器會自動使用系統代理設定（GNOME/KDE 下）。

### 架構支援

本專案支援多種 CPU 架構：
- **x86_64** (amd64) - 目前提供預編譯版本
- **i686** (32位元 x86) - 如需使用請從原始碼編譯
- **aarch64** (ARM 64位元) - 如需使用請從原始碼編譯

**注意**：目前發布的預編譯版本僅支援 x86_64 架構。如果您需要 i686 或 aarch64 版本，請使用以下說明從原始碼編譯。

### 安裝方法

#### 快速建構（推薦）

使用 `build.sh` 腳本一鍵建構並打包：

```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
npm install
./build.sh
```

`build/` 目錄將包含：
- `*.deb` — Debian/Ubuntu 安裝套件
- `*.rpm` — Fedora/openSUSE 安裝套件
- `shadowsocksr-client-linux_{版本}_{架構}.tar.gz` — 可攜式壓縮檔（非 deb/RPM 使用者）

#### 手動從原始碼編譯

1. 複製儲存庫：
```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
```

2. 安裝依賴：
```bash
npm install
```

3. 為目前架構建構應用：
```bash
npm run tauri build
```

建構完成的應用將位於 `src-tauri/target/release/bundle/` 目錄中。

#### 交叉編譯其他架構版本

如果您需要為其他架構建構，可以指定目標架構：

**編譯 i686（32位元）版本：**
```bash
# 安裝目標平台支援
rustup target add i686-unknown-linux-gnu

# 為 i686 建構
npm run tauri build -- --target i686-unknown-linux-gnu
```

**編譯 aarch64（ARM 64位元）版本：**
```bash
# 安裝目標平台支援
rustup target add aarch64-unknown-linux-gnu

# 為 aarch64 建構
npm run tauri build -- --target aarch64-unknown-linux-gnu
```

**注意**：交叉編譯可能需要額外的系統依賴和工具鏈。請確保您已為目標架構安裝了適當的交叉編譯工具。

#### 使用預編譯 tar.gz 套件（非 deb/RPM 使用者）

對於不使用 deb 套件（Debian、Ubuntu 等）或 rpm 套件（Fedora、openSUSE 等）管理系統的使用者，可以直接從 tar.gz 壓縮檔執行應用。

**所需依賴：**

執行應用前，請確保已安裝以下系統函式庫：

- **gtk3** - GTK+ 圖形使用者介面函式庫
- **webkit2gtk4.1** - 基於 GTK 3 和 libsoup 3 的 WebKitGTK

**使用說明：**

1. 從發布頁面下載 tar.gz 套件（如 `shadowsocksr-client-linux_0.3.0_x86_64.tar.gz`）
2. 解壓縮壓縮檔：
   ```bash
   tar -xzf shadowsocksr-client-linux_*.tar.gz
   ```
3. 進入解壓縮後的目錄並執行可執行檔：
   ```bash
   cd shadowsocksr-client-linux
   ./shadowsocksr-client-linux
   ```

如果應用無法啟動，請檢查系統是否已安裝所有必需的依賴函式庫。

### 使用說明

1. 從應用選單或終端機啟動應用
2. 點選「新增設定」建立您的第一個 SSR 設定檔
3. 填寫伺服器詳情：
   - 設定名稱（僅字母）
   - 伺服器位址
   - 伺服器連接埠
   - 密碼
   - 加密方式
   - 協定
   - 混淆
4. 從列表中選擇您的設定
5. 點選「啟用代理」啟動代理服務

#### 本機代理設定

啟用後，本機 SOCKS5 代理將在以下位址可用：
- **位址**: `127.0.0.1`
- **連接埠**: 您在設定中設定的連接埠（預設：1080）

#### 各桌面代理行為

- **GNOME 系列和 KDE Plasma**：GUI 應用程式自動跟隨代理設定，無需重啟。終端應用程式需重新開啟終端機視窗後生效。
- **XFCE 和視窗管理器（i3、sway、Hyprland 等）**：所有應用程式（GUI 和終端機）均需重新開啟以生效。代理透過環境變數（`all_proxy`、`ALL_PROXY`）寫入 `~/.config/environment.d/` 和 `~/.xprofile` 實現。

### 技術棧

- **前端**: Vue 3 + Composition API
- **桌面框架**: Tauri 2.0
- **後端**: shadowsocksr-native
- **建構工具**: Vite
- **國際化**: vue-i18n

### 專案結構

```
shadowsocksr-client-linux/
├── src/                    # Vue 前端原始碼
│   ├── components/         # Vue 元件
│   ├── locales/           # 翻譯檔案
│   └── utils/             # 工具函式
├── src-tauri/             # Tauri 後端
│   ├── binaries/          # SSR 原生二進位檔案
│   ├── src/               # Rust 原始碼
│   └── tauri.conf.json    # Tauri 設定
└── package.json           # Node.js 依賴
```

### 開放原始碼授權

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案。

### 致謝

特別感謝上游專案及貢獻者：

- **[shadowsocksr-native](https://github.com/ShadowsocksR-Live/shadowsocksr-native)** 由 [ssrlive](https://github.com/ssrlive) 開發 - 為本客戶端提供核心 SSR 實作

### 免責聲明

本軟體僅用於教育和研究目的。使用者在使用本軟體時應遵守當地法律法規。
