# Linux용 ShadowsocksR 클라이언트

<div align="center">

**Tauri + Vue 3로 구축된 모던 크로스 플랫폼 ShadowsocksR Linux 클라이언트**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-blue)](https://tauri.app/)
[![Vue](https://img.shields.io/badge/Vue-3.5-green)](https://vuejs.org/)

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文（台灣）](README.zh-TW.md) | [繁體中文（港澳）](README.zh-HK.md) | [日本語](README.ja-JP.md) | 한국어 | [Русский](README.ru-RU.md)

</div>

---

## 주요 기능

- **스마트 라우팅**：내장 SOCKS5 프록시 라우터, 4가지 라우팅 모드 지원 — LAN + 중국 본토 우회 / LAN 우회 / 중국 우회 / 글로벌. 국내 트래픽은 자동으로 직접 연결하고 해외 트래픽은 프록시를 통해 전달하므로 수동 전환이 필요 없습니다.
- **듀얼 포트 아키텍처**：라우터 포트(앱에 노출, 대시보드에서 설정 가능)와 SSR 서비스 포트(내부용, 편집기에서 설정 가능)가 독립적으로 실행됩니다. 시스템 프록시 설정(gsettings, kwriteconfig, 환경 변수)은 항상 라우터 포트를 가리켜 일관된 동작을 보장합니다.
- **환경 변수 제어**：선택적 체크박스 — 켜면 시스템 환경 변수(`all_proxy`/`ALL_PROXY`)가 자동으로 관리됩니다. 끄면 proxychains를 사용하여 전역 환경에 영향을 주지 않고 명령별 프록시 라우팅이 가능합니다.
- **Proxychains 가이드**：동적으로 표시되는 설정과 함께 Proxychains 구성 지침이 내장되어 있습니다.
- **모던 UI**：Vue 3 + Composition API로 구축된 깔끔하고 직관적인 인터페이스.
- **다국어 지원**：7개 언어 지원 — 간체 중국어, 번체 중국어(대만/홍콩), 영어, 일본어, 한국어, 러시아어.
- **다크 모드**：시스템 환경설정에 따라 자동으로 다크/라이트 테마 전환.
- **시스템 프록시 통합**：GNOME, KDE Plasma, XFCE 데스크톱 환경 자동 설정.
- **다중 구성**：여러 SSR 프로필을 쉽게 관리.

---

## 데스크톱 환경 지원

| 분류 | 데스크톱 환경 | 프록시 방식 | GUI 재시작 |
|---|---|---|---|
| **GNOME 계열** | GNOME, Ubuntu, Cinnamon, MATE, COSMIC, Budgie, Pantheon, Unity, Deepin, UOS, UKUI | gsettings | 불필요 |
| **KDE Plasma** | KDE Plasma 5/6, LXQt | kwriteconfig5/6 + dbus | 불필요 |
| **XFCE** | XFCE, Xubuntu | xfconf-query | 필요 |
| **창 관리자** | i3, sway, Hyprland, Openbox, Fluxbox, dwm, awesome, bspwm, Qtile, herbstluftwm, icewm, jwm, xmonad, Enlightenment | 환경 변수(켠 경우) 또는 proxychains | 필요 |

**터미널 앱**：「환경 변수 수정」이 켜져 있으면 새로 열린 터미널이 자동으로 SOCKS 프록시를 사용합니다. 기존 터미널은 다시 열어야 합니다. GNOME/KDE 이외의 데스크톱에서는 터미널 프록시 지원을 위해 이 옵션이 필수입니다.

**Firefox**：브라우저 설정에서 별도로 프록시를 구성하세요. FoxyProxy 확장 기능을 사용하면 쉽게 전환할 수 있습니다. Chromium 기반 브라우저는 시스템 프록시 설정을 자동으로 따릅니다(GNOME/KDE).

---

## 스마트 라우팅 모드

| 모드 | LAN 트래픽 | 중국 본토 트래픽 | 해외 트래픽 |
|---|---|---|---|
| **LAN + 중국 우회**(기본값) | 직접 연결 | 직접 연결 | 프록시 경유 |
| **LAN 우회** | 직접 연결 | 프록시 경유 | 프록시 경유 |
| **중국 우회** | 프록시 경유 | 직접 연결 | 프록시 경유 |
| **글로벌** | 프록시 경유 | 프록시 경유 | 프록시 경유 |

라우터는 설정 가능한 라우터 포트에서 내장 SOCKS5 서버로 실행됩니다. 중국 IP 매칭은 내장된 APNIC 위임 데이터와 이진 검색을 사용하여 O(log n) 성능을 제공합니다.

---

## 아키텍처 지원

- **x86_64** (amd64) — 사전 빌드된 릴리스 제공
- **i686** (32비트 x86) — 소스에서 빌드
- **aarch64** (ARM 64비트) — 소스에서 빌드

---

## 설치

### 빠른 빌드 (권장)

```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
npm install
./build.sh
```

`build/` 디렉터리에 출력되는 파일：
- `*.deb` — Debian/Ubuntu
- `*.rpm` — Fedora/openSUSE
- `*.tar.gz` — 휴대용 아카이브

### 수동 빌드

```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
npm install
npm run tauri build
```

### 크로스 컴파일

```bash
# i686
rustup target add i686-unknown-linux-gnu
npm run tauri build -- --target i686-unknown-linux-gnu

# aarch64
rustup target add aarch64-unknown-linux-gnu
npm run tauri build -- --target aarch64-unknown-linux-gnu
```

### 휴대용 tar.gz 사용법

필요한 시스템 라이브러리：**gtk3**, **webkit2gtk4.1**

```bash
tar -xzf shadowsocksr-client-linux_*.tar.gz
cd shadowsocksr-client-linux
./shadowsocksr-client-linux
```

---

## 사용법

1. 애플리케이션을 실행합니다
2. 「**+ 새 구성 추가**」를 클릭하고 SSR 서버 정보를 입력합니다：
   - 프로필 이름 (영문자만)
   - 서버 주소 및 포트
   - 비밀번호
   - 암호화 방식, 프로토콜, 난독화
   - **SSR 서비스 포트** — SSR sidecar의 내부 포트 (라우터 포트와 달라야 함)
3. 사이드바에서 구성을 선택합니다
4. 대시보드에서 **라우터 포트**(노출된 SOCKS5 포트)를 설정합니다 — SSR 포트와 달라야 함
5. **라우팅 모드**를 선택합니다 (「LAN + 중국 우회」 권장)
6. 필요에 따라 「**환경 변수 수정**」을 전환합니다 (체크박스 아래 경고 참조)
7. 「**프록시 활성화**」를 클릭합니다

### 프록시 설정

활성화되면 애플리케이션은 다음을 통해 연결할 수 있습니다：
- **SOCKS5**：`127.0.0.1:<router-port>` (대시보드에 표시됨)

### 환경 변수 미사용 시 (Proxychains)

「환경 변수 수정」이 꺼져 있을 때 proxychains를 사용하여 명령별 라우팅을 수행합니다：

```bash
# 설치
sudo apt install proxychains4

# /etc/proxychains4.conf 편집, [ProxyList]에 추가：
socks5 127.0.0.1 1080

# 사용 예시
proxychains curl https://www.google.com
proxychains git clone https://github.com/...
```

---

## 기술 스택

| 계층 | 기술 |
|---|---|
| 프론트엔드 | Vue 3 + Composition API |
| 데스크톱 프레임워크 | Tauri 2.0 |
| 백엔드 (라우팅) | Rust + Tokio (내장 SOCKS5 프록시 라우터) |
| 백엔드 (SSR) | shadowsocksr-native sidecar |
| 빌드 도구 | Vite |
| 국제화 | vue-i18n |

---

## 프로젝트 구조

```
shadowsocksr-client-linux/
├── src/                    # Vue 프론트엔드
│   ├── components/         # Vue 컴포넌트 (ConfigForm, ConfigList, ProxyControl)
│   ├── locales/           # 7개 언어 번역 파일
│   └── utils/             # Tauri API 래퍼
├── src-tauri/             # Tauri + Rust 백엔드
│   ├── binaries/          # SSR 네이티브 sidecar 바이너리 (3개 아키텍처)
│   ├── src/
│   │   ├── router.rs      # SOCKS5 프록시 라우터 (스마트 라우팅)
│   │   ├── china_ip.rs    # 중국 IP 범위 매칭 (APNIC 데이터)
│   │   ├── ssr_process.rs # Sidecar 생명주기 관리
│   │   ├── proxy.rs       # 데스크톱 프록시 통합 (GNOME/KDE/XFCE/WM)
│   │   └── model.rs       # 데이터 모델 + RouteMode 열거형
│   └── tauri.conf.json
└── build.sh               # 원클릭 빌드 + 패키징 스크립트
```

---

## 라이선스

MIT — [LICENSE](LICENSE)를 참조하세요.

---

## 감사의 글

- **[shadowsocksr-native](https://github.com/ShadowsocksR-Live/shadowsocksr-native)** by [ssrlive](https://github.com/ssrlive) — 핵심 SSR 구현

---

## 면책 조항

본 소프트웨어는 교육 및 연구 목적으로만 제공됩니다. 사용자는 현지 법률 및 규정을 준수할 책임이 있습니다.
