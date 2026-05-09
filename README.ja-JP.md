# ShadowsocksR Linux クライアント

<div align="center">

**Tauri + Vue 3 で構築されたモダンな Linux 向け ShadowsocksR クライアント**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-blue)](https://tauri.app/)
[![Vue](https://img.shields.io/badge/Vue-3.5-green)](https://vuejs.org/)

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文（台灣）](README.zh-TW.md) | [繁體中文（港澳）](README.zh-HK.md) | [한국어](README.ko-KR.md) | [Русский](README.ru-RU.md)

</div>

### 機能

- **モダンな UI**: Vue 3 で構築されたクリーンで直感的なインターフェース
- **多言語対応**: 簡体字中国語、繁体字中国語（台湾/香港）、英語、日本語、韓国語、ロシア語をサポート
- **ダークモード**: システム設定に応じてダーク/ライトテーマを自動切替
- **システムプロキシ統合**: GNOME および KDE デスクトップ環境のシステムプロキシを自動設定
- **複数設定管理**: 複数の SSR プロファイルを簡単に管理
- **安全性**: 信頼性の高い shadowsocksr-native バックエンドを採用

### デスクトップ環境対応

本アプリケーションは主要な Linux デスクトップ環境向けに自動システムプロキシ設定を提供します：

| 分類 | デスクトップ環境 | プロキシ方式 | GUI 再起動 |
|---|---|---|---|
| **GNOME 系列** | GNOME、Ubuntu、Cinnamon、MATE、COSMIC、Budgie、Pantheon、Unity、Deepin、UOS、UKUI | gsettings | 不要 |
| **KDE Plasma** | KDE Plasma 5/6、LXQt | kwriteconfig5/6 + dbus | 不要 |
| **XFCE** | XFCE、Xubuntu | xfconf-query | 必要 |
| **ウィンドウマネージャ** | i3、sway、Hyprland、niri、Openbox、Fluxbox、dwm、awesome、bspwm、Qtile、herbstluftwm、icewm、jwm、xmonad、Enlightenment | 環境変数 | 必要 |

**端末アプリケーション**：すべてのデスクトップ環境で、プロキシ有効化後は端末アプリケーションが自動的に SOCKS プロキシを使用します。既に開いている端末ウィンドウがある場合は、再度開き直してください。

Firefox ブラウザを使用する場合は、ブラウザで別途プロキシ設定が必要です。異なるプロキシ環境を簡単に切り替えるには FoxyProxy 拡張機能の使用をお勧めします。Chromium ベースのブラウザはシステムプロキシ設定を自動的に使用します（GNOME/KDE の場合）。

### アーキテクチャ対応

本プロジェクトは複数の CPU アーキテクチャをサポートしています：
- **x86_64** (amd64) - 現在プリビルド版を提供
- **i686** (32ビット x86) - 必要な場合はソースからビルド
- **aarch64** (ARM 64ビット) - 必要な場合はソースからビルド

**注意**：現在リリースされているプリビルド版は x86_64 アーキテクチャのみ対応です。i686 または aarch64 版が必要な場合は、以下の手順でソースからコンパイルしてください。

### インストール

#### ソースからビルド

1. リポジトリをクローン：
```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
```

2. 依存関係をインストール：
```bash
npm install
```

3. 現在のアーキテクチャ向けにビルド：
```bash
npm run tauri build
```

ビルドされたアプリケーションは `src-tauri/target/release/bundle/` に生成されます。

#### 他のアーキテクチャ向けクロスコンパイル

異なるアーキテクチャ向けにビルドするには、ターゲットを指定します：

**i686（32ビット）向け：**
```bash
# ターゲットをインストール
rustup target add i686-unknown-linux-gnu

# i686 向けにビルド
npm run tauri build -- --target i686-unknown-linux-gnu
```

**aarch64（ARM 64ビット）向け：**
```bash
# ターゲットをインストール
rustup target add aarch64-unknown-linux-gnu

# aarch64 向けにビルド
npm run tauri build -- --target aarch64-unknown-linux-gnu
```

**注意**：クロスコンパイルには追加のシステム依存関係とツールチェーンが必要な場合があります。ターゲットアーキテクチャに適したクロスコンパイルツールがインストールされていることを確認してください。

#### プリビルド tar.gz パッケージの使用（deb/RPM 以外のユーザー向け）

deb 系（Debian、Ubuntu など）や rpm 系（Fedora、openSUSE など）のパッケージ管理を使用していないユーザーは、リリースの `tar.gz` アーカイブから直接アプリケーションを実行できます。

**必要な依存関係：**

アプリケーションを実行する前に、以下のシステムライブラリがインストールされていることを確認してください：

- **gtk3** - GTK+ グラフィカルユーザーインターフェースライブラリ
- **webkit2gtk4.1** - GTK 3 および libsoup 3 用 WebKitGTK

**使用方法：**

1. リリースページから `tar.gz` パッケージをダウンロード
2. アーカイブを展開：
   ```bash
   tar -xzf shadowsocksr-linux-*.tar.gz
   ```
3. 展開したディレクトリに移動して実行可能ファイルを実行：
   ```bash
   cd shadowsocksr-linux
   ./shadowsocksr-client-linux
   ```

アプリケーションが起動しない場合は、必要な依存ライブラリがすべてインストールされているか確認してください。

### 使い方

1. アプリケーションメニューまたは端末からアプリケーションを起動
2. 「新規設定を追加」をクリックして最初の SSR プロファイルを作成
3. サーバー情報を入力：
   - プロファイル名（英字のみ）
   - サーバーアドレス
   - サーバーポート
   - パスワード
   - 暗号化方式
   - プロトコル
   - 難読化
4. リストから設定を選択
5. 「プロキシを有効にする」をクリックしてプロキシを開始

#### ローカルプロキシ設定

有効にすると、ローカル SOCKS5 プロキシが以下のアドレスで利用可能になります：
- **アドレス**: `127.0.0.1`
- **ポート**: プロファイルで設定したポート（デフォルト：1080）

#### デスクトップ別プロキシ動作

- **GNOME 系列および KDE Plasma**：GUI アプリケーションはプロキシ設定に自動的に従います — 再起動不要。端末アプリケーションは端末ウィンドウを再起動後にプロキシを使用します。
- **XFCE およびウィンドウマネージャ（i3、sway、Hyprland など）**：すべてのアプリケーション（GUI および端末）を再起動する必要があります。プロキシは環境変数（`all_proxy`、`ALL_PROXY`）を介して `~/.config/environment.d/` と `~/.xprofile` に書き込まれます。

### 技術スタック

- **フロントエンド**: Vue 3 + Composition API
- **デスクトップフレームワーク**: Tauri 2.0
- **バックエンド**: shadowsocksr-native
- **ビルドツール**: Vite
- **国際化**: vue-i18n

### プロジェクト構成

```
shadowsocksr-client-linux/
├── src/                    # Vue フロントエンドソース
│   ├── components/         # Vue コンポーネント
│   ├── locales/           # 翻訳ファイル
│   └── utils/             # ユーティリティ関数
├── src-tauri/             # Tauri バックエンド
│   ├── binaries/          # SSR ネイティブバイナリ
│   ├── src/               # Rust ソースコード
│   └── tauri.conf.json    # Tauri 設定
└── package.json           # Node.js 依存関係
```

### ライセンス

本プロジェクトは MIT ライセンスの下で提供されています - 詳細は [LICENSE](LICENSE) ファイルを参照してください。

### 謝辞

上流プロジェクトおよび貢献者に感謝します：

- **[shadowsocksr-native](https://github.com/ShadowsocksR-Live/shadowsocksr-native)** by [ssrlive](https://github.com/ssrlive) - 本クライアントを支えるコア SSR 実装

### 免責事項

本ソフトウェアは教育および研究目的のみに提供されています。ユーザーは本ソフトウェアの使用にあたり、地域の法令を遵守する責任があります。
