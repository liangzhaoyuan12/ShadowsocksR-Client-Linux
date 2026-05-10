# ShadowsocksR Linux 向けクライアント

<div align="center">

**Tauri + Vue 3 で構築されたモダンなクロスプラットフォーム ShadowsocksR Linux クライアント**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-blue)](https://tauri.app/)
[![Vue](https://img.shields.io/badge/Vue-3.5-green)](https://vuejs.org/)

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文（台灣）](README.zh-TW.md) | [繁體中文（港澳）](README.zh-HK.md) | 日本語 | [한국어](README.ko-KR.md) | [Русский](README.ru-RU.md)

</div>

---

## 機能

- **スマートルーティング**：SOCKS5 プロキシルーター内蔵、4 つのルーティングモードに対応 — LAN + 中国本土バイパス / LAN バイパス / 中国バイパス / グローバル。国内トラフィックを自動的に直接接続し、海外トラフィックをプロキシ経由で転送するため、手動での切り替えは不要です。
- **デュアルポートアーキテクチャ**：ルーターポート（アプリ向けに公開、ダッシュボードで設定可能）と SSR サービスポート（内部用、エディタで設定可能）は独立して動作します。システムプロキシ設定（gsettings、kwriteconfig、環境変数）は常にルーターポートを指し、一貫した動作を保証します。
- **環境変数制御**：オプションのチェックボックス — オンにすると、システム環境変数（`all_proxy`/`ALL_PROXY`）が自動的に管理されます。オフの場合、proxychains を使用してグローバル環境に影響を与えずにコマンド単位のプロキシルーティングが可能です。
- **Proxychains ガイド**：動的に表示される設定を含む、Proxychains の設定手順を内蔵。
- **モダン UI**：Vue 3 + Composition API で構築された、クリーンで直感的なインターフェース。
- **多言語サポート**：7 言語対応 — 簡体字中国語、繁体字中国語（台湾/香港）、英語、日本語、韓国語、ロシア語。
- **ダークモード**：システム設定に応じてダーク/ライトテーマを自動的に切り替えます。
- **システムプロキシ統合**：GNOME、KDE Plasma、XFCE デスクトップ環境の自動設定。
- **複数設定**：複数の SSR プロファイルを簡単に管理。

---

## デスクトップ環境サポート

| カテゴリ | デスクトップ環境 | プロキシ方式 | GUI 再起動 |
|---|---|---|---|
| **GNOME 系** | GNOME、Ubuntu、Cinnamon、MATE、COSMIC、Budgie、Pantheon、Unity、Deepin、UOS、UKUI | gsettings | 不要 |
| **KDE Plasma** | KDE Plasma 5/6、LXQt | kwriteconfig5/6 + dbus | 不要 |
| **XFCE** | XFCE、Xubuntu | xfconf-query | 必要 |
| **ウィンドウマネージャ** | i3、sway、Hyprland、Openbox、Fluxbox、dwm、awesome、bspwm、Qtile、herbstluftwm、icewm、jwm、xmonad、Enlightenment | 環境変数（オンの場合）または proxychains | 必要 |

**端末アプリ**：「環境変数を変更」がオンの場合、新しく開いた端末は自動的に SOCKS プロキシを使用します。既存の端末は再起動が必要です。GNOME/KDE 以外のデスクトップでは、端末プロキシ対応にこのオプションが必須です。

**Firefox**：ブラウザの設定で個別にプロキシを設定してください。FoxyProxy 拡張機能を使用すると簡単に切り替えられます。Chromium 系ブラウザはシステムプロキシ設定に自動的に従います（GNOME/KDE）。

---

## スマートルーティングモード

| モード | LAN トラフィック | 中国本土トラフィック | 海外トラフィック |
|---|---|---|---|
| **LAN + 中国バイパス**（デフォルト） | 直接 | 直接 | プロキシ経由 |
| **LAN バイパス** | 直接 | プロキシ経由 | プロキシ経由 |
| **中国バイパス** | プロキシ経由 | 直接 | プロキシ経由 |
| **グローバル** | プロキシ経由 | プロキシ経由 | プロキシ経由 |

ルーターは設定可能なルーターポート上で内蔵 SOCKS5 サーバーとして動作します。中国 IP のマッチングには組み込みの APNIC 委任データを使用し、二分探索により O(log n) のパフォーマンスを実現します。

---

## アーキテクチャサポート

- **x86_64** (amd64) — ビルド済みリリースあり
- **i686** (32 ビット x86) — ソースからビルド
- **aarch64** (ARM 64 ビット) — ソースからビルド

---

## インストール

### クイックビルド（推奨）

```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
npm install
./build.sh
```

`build/` に出力される成果物：
- `*.deb` — Debian/Ubuntu
- `*.rpm` — Fedora/openSUSE
- `*.tar.gz` — ポータブルアーカイブ

### 手動ビルド

```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
npm install
npm run tauri build
```

### クロスコンパイル

```bash
# i686
rustup target add i686-unknown-linux-gnu
npm run tauri build -- --target i686-unknown-linux-gnu

# aarch64
rustup target add aarch64-unknown-linux-gnu
npm run tauri build -- --target aarch64-unknown-linux-gnu
```

### ポータブル tar.gz の使用方法

必要なシステムライブラリ：**gtk3**、**webkit2gtk4.1**

```bash
tar -xzf shadowsocksr-client-linux_*.tar.gz
cd shadowsocksr-client-linux
./shadowsocksr-client-linux
```

---

## 使い方

1. アプリケーションを起動します
2. 「**+ 新規設定を追加**」をクリックし、SSR サーバー情報を入力します：
   - プロファイル名（英字のみ）
   - サーバーアドレスとポート
   - パスワード
   - 暗号化方式、プロトコル、難読化
   - **SSR サービスポート** — SSR sidecar の内部ポート（ルーターポートと異なる必要があります）
3. サイドバーから設定を選択します
4. ダッシュボードで**ルーターポート**（公開 SOCKS5 ポート）を設定します — SSR ポートと異なる必要があります
5. **ルーティングモード**を選択します（「LAN + 中国バイパス」推奨）
6. 必要に応じて「**環境変数を変更**」を切り替えます（チェックボックス下部の警告を参照）
7. 「**プロキシを有効化**」をクリックします

### プロキシ設定

有効化後、アプリケーションは以下から接続可能です：
- **SOCKS5**：`127.0.0.1:<router-port>`（ダッシュボードに表示）

### 環境変数なしの場合（Proxychains）

「環境変数を変更」がオフの場合、proxychains を使用してコマンド単位のルーティングを行います：

```bash
# インストール
sudo apt install proxychains4

# /etc/proxychains4.conf を編集し、[ProxyList] に追加：
socks5 127.0.0.1 1080

# 使用例
proxychains curl https://www.google.com
proxychains git clone https://github.com/...
```

---

## 技術スタック

| 層 | 技術 |
|---|---|
| フロントエンド | Vue 3 + Composition API |
| デスクトップフレームワーク | Tauri 2.0 |
| バックエンド（ルーティング） | Rust + Tokio（内蔵 SOCKS5 プロキシルーター） |
| バックエンド（SSR） | shadowsocksr-native sidecar |
| ビルドツール | Vite |
| 国際化 | vue-i18n |

---

## プロジェクト構造

```
shadowsocksr-client-linux/
├── src/                    # Vue フロントエンド
│   ├── components/         # Vue コンポーネント（ConfigForm、ConfigList、ProxyControl）
│   ├── locales/           # 7 言語の翻訳ファイル
│   └── utils/             # Tauri API ラッパー
├── src-tauri/             # Tauri + Rust バックエンド
│   ├── binaries/          # SSR ネイティブ sidecar バイナリ（3 アーキテクチャ）
│   ├── src/
│   │   ├── router.rs      # SOCKS5 プロキシルーター（スマートルーティング）
│   │   ├── china_ip.rs    # 中国 IP 範囲マッチング（APNIC データ）
│   │   ├── ssr_process.rs # Sidecar ライフサイクル管理
│   │   ├── proxy.rs       # デスクトッププロキシ統合（GNOME/KDE/XFCE/WM）
│   │   └── model.rs       # データモデル + RouteMode 列挙型
│   └── tauri.conf.json
└── build.sh               # ワンクリックビルド + パッケージングスクリプト
```

---

## ライセンス

MIT — [LICENSE](LICENSE) を参照してください。

---

## 謝辞

- **[shadowsocksr-native](https://github.com/ShadowsocksR-Live/shadowsocksr-native)** by [ssrlive](https://github.com/ssrlive) — コア SSR 実装

---

## 免責事項

本ソフトウェアは教育および研究目的のみに提供されています。ユーザーは現地の法律および規制を遵守する責任を負います。
