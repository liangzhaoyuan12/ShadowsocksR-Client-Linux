# ShadowsocksR Linux 클라이언트

<div align="center">

**Tauri + Vue 3로 구축된 현대적인 Linux ShadowsocksR 클라이언트**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tauri](https://img.shields.io/badge/Tauri-2.0-blue)](https://tauri.app/)
[![Vue](https://img.shields.io/badge/Vue-3.5-green)](https://vuejs.org/)

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文（台灣）](README.zh-TW.md) | [繁體中文（港澳）](README.zh-HK.md) | [日本語](README.ja-JP.md) | [Русский](README.ru-RU.md)

</div>

### 기능

- **현대적인 UI**: Vue 3로 구축된 깔끔하고 직관적인 인터페이스
- **다국어 지원**: 간체 중국어, 번체 중국어(대만/홍콩), 영어, 일본어, 한국어, 러시아어 지원
- **다크 모드**: 시스템 설정에 따라 다크/라이트 테마 자동 전환
- **시스템 프록시 통합**: GNOME 및 KDE 데스크톱 환경의 시스템 프록시 자동 설정
- **다중 설정 관리**: 여러 SSR 프로필을 쉽게 관리
- **보안**: 신뢰할 수 있는 shadowsocksr-native 백엔드 기반

### 데스크톱 환경 지원

본 애플리케이션은 주요 Linux 데스크톱 환경에 대한 자동 시스템 프록시 설정을 제공합니다:

| 분류 | 데스크톱 환경 | 프록시 방식 | GUI 재시작 |
|---|---|---|---|
| **GNOME 계열** | GNOME, Ubuntu, Cinnamon, MATE, COSMIC, Budgie, Pantheon, Unity, Deepin, UOS, UKUI | gsettings | 불필요 |
| **KDE Plasma** | KDE Plasma 5/6, LXQt | kwriteconfig5/6 + dbus | 불필요 |
| **XFCE** | XFCE, Xubuntu | xfconf-query | 필요 |
| **창 관리자** | i3, sway, Hyprland, niri, Openbox, Fluxbox, dwm, awesome, bspwm, Qtile, herbstluftwm, icewm, jwm, xmonad, Enlightenment | 환경 변수 | 필요 |

**터미널 애플리케이션**: 모든 데스크톱 환경에서 프록시 활성화 후 터미널 애플리케이션이 자동으로 SOCKS 프록시를 사용합니다. 이미 열려 있는 터미널 창이 있다면 다시 열어주세요.

Firefox 브라우저를 사용할 때는 브라우저에서 별도로 프록시 설정이 필요합니다. 다양한 프록시 환경을 쉽게 전환하려면 FoxyProxy 확장 기능을 사용하는 것이 좋습니다. Chromium 기반 브라우저는 시스템 프록시 설정을 자동으로 사용합니다(GNOME/KDE의 경우).

### 아키텍처 지원

본 프로젝트는 여러 CPU 아키텍처를 지원합니다:
- **x86_64** (amd64) - 현재 사전 빌드 제공
- **i686** (32비트 x86) - 필요한 경우 소스에서 빌드
- **aarch64** (ARM 64비트) - 필요한 경우 소스에서 빌드

**참고**: 현재 릴리스된 사전 빌드는 x86_64 아키텍처만 지원합니다. i686 또는 aarch64 버전이 필요한 경우 아래 지침에 따라 소스에서 컴파일하세요.

### 설치

#### 소스에서 빌드

1. 저장소 클론:
```bash
git clone https://github.com/liangzhaoyuan12/shadowsocksr-client-linux.git
cd shadowsocksr-client-linux
```

2. 종속성 설치:
```bash
npm install
```

3. 현재 아키텍처용으로 빌드:
```bash
npm run tauri build
```

빌드된 애플리케이션은 `src-tauri/target/release/bundle/`에 생성됩니다.

#### 다른 아키텍처용 크로스 컴파일

다른 아키텍처용으로 빌드하려면 대상을 지정할 수 있습니다:

**i686(32비트)용:**
```bash
# 대상 설치
rustup target add i686-unknown-linux-gnu

# i686용 빌드
npm run tauri build -- --target i686-unknown-linux-gnu
```

**aarch64(ARM 64비트)용:**
```bash
# 대상 설치
rustup target add aarch64-unknown-linux-gnu

# aarch64용 빌드
npm run tauri build -- --target aarch64-unknown-linux-gnu
```

**참고**: 크로스 컴파일에는 추가 시스템 종속성과 도구 체인이 필요할 수 있습니다. 대상 아키텍처에 적합한 크로스 컴파일 도구가 설치되어 있는지 확인하세요.

#### 사전 빌드 tar.gz 패키지 사용 (deb/RPM 사용자 외)

deb 기반(Debian, Ubuntu 등) 또는 rpm 기반(Fedora, openSUSE 등) 패키지 관리를 사용하지 않는 사용자는 릴리스의 `tar.gz` 아카이브에서 직접 애플리케이션을 실행할 수 있습니다.

**필요한 종속성:**

애플리케이션을 실행하기 전에 다음 시스템 라이브러리가 설치되어 있는지 확인하세요:

- **gtk3** - GTK+ 그래픽 사용자 인터페이스 라이브러리
- **webkit2gtk4.1** - GTK 3 및 libsoup 3용 WebKitGTK

**사용 방법:**

1. 릴리스 페이지에서 `tar.gz` 패키지 다운로드
2. 아카이브 압축 해제:
   ```bash
   tar -xzf shadowsocksr-linux-*.tar.gz
   ```
3. 압축 해제된 디렉토리로 이동하여 실행 파일 실행:
   ```bash
   cd shadowsocksr-linux
   ./shadowsocksr-client-linux
   ```

애플리케이션이 시작되지 않으면 필요한 모든 종속 라이브러리가 설치되어 있는지 확인하세요.

### 사용 방법

1. 애플리케이션 메뉴 또는 터미널에서 애플리케이션 실행
2. "새 설정 추가"를 클릭하여 첫 번째 SSR 프로필 생성
3. 서버 정보 입력:
   - 프로필 이름 (영문자만)
   - 서버 주소
   - 서버 포트
   - 비밀번호
   - 암호화 방식
   - 프로토콜
   - 난독화
4. 목록에서 설정 선택
5. "프록시 활성화"를 클릭하여 프록시 시작

#### 로컬 프록시 설정

활성화되면 로컬 SOCKS5 프록시가 다음 주소에서 사용 가능합니다:
- **주소**: `127.0.0.1`
- **포트**: 프로필에서 설정한 포트 (기본값: 1080)

#### 데스크톱별 프록시 동작

- **GNOME 계열 및 KDE Plasma**: GUI 애플리케이션은 프록시 설정을 자동으로 따릅니다 — 재시작 불필요. 터미널 애플리케이션은 터미널 창을 다시 연 후 프록시를 사용합니다.
- **XFCE 및 창 관리자(i3, sway, Hyprland 등)**: 모든 애플리케이션(GUI 및 터미널)을 다시 열어야 적용됩니다. 프록시는 환경 변수(`all_proxy`, `ALL_PROXY`)를 통해 `~/.config/environment.d/`와 `~/.xprofile`에 기록됩니다.

### 기술 스택

- **프론트엔드**: Vue 3 + Composition API
- **데스크톱 프레임워크**: Tauri 2.0
- **백엔드**: shadowsocksr-native
- **빌드 도구**: Vite
- **국제화**: vue-i18n

### 프로젝트 구조

```
shadowsocksr-client-linux/
├── src/                    # Vue 프론트엔드 소스
│   ├── components/         # Vue 컴포넌트
│   ├── locales/           # 번역 파일
│   └── utils/             # 유틸리티 함수
├── src-tauri/             # Tauri 백엔드
│   ├── binaries/          # SSR 네이티브 바이너리
│   ├── src/               # Rust 소스 코드
│   └── tauri.conf.json    # Tauri 설정
└── package.json           # Node.js 종속성
```

### 라이선스

본 프로젝트는 MIT 라이선스에 따라 제공됩니다 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

### 감사의 글

상류 프로젝트 및 기여자들에게 특별한 감사를 드립니다:

- **[shadowsocksr-native](https://github.com/ShadowsocksR-Live/shadowsocksr-native)** by [ssrlive](https://github.com/ssrlive) - 본 클라이언트의 핵심 SSR 구현

### 면책 조항

본 소프트웨어는 교육 및 연구 목적으로만 제공됩니다. 사용자는 본 소프트웨어 사용 시 현지 법률 및 규정을 준수할 책임이 있습니다.
