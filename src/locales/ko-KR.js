export default {
  app: {
    title: 'ShadowsocksR 클라이언트',
    subtitle: 'Linux 보안 프록시 클라이언트'
  },
  common: {
    loading: '로딩 중...',
    cancel: '취소',
    save: '저장',
    create: '생성',
    update: '업데이트',
    delete: '삭제',
    edit: '편집',
    refresh: '새로고침',
    confirm: '확인',
    close: '닫기'
  },
  configList: {
    title: '설정 목록',
    empty: '설정이 없습니다',
    emptyHint: '"새 설정"을 클릭하여 첫 번째 설정을 만드세요',
    active: '활성',
    deleteConfirm: '설정 "{name}" 을(를) 삭제하시겠습니까?',
    deleteSuccess: '삭제 성공',
    deleteFailed: '삭제 실패',
    loadFailed: '설정 목록 로드 실패'
  },
  configForm: {
    addTitle: '새 설정',
    editTitle: '설정 편집',
    basicSettings: '기본 설정',
    advancedSettings: '고급 설정',
    profileName: '설정 이름',
    profileNamePlaceholder: '예: 내 서버',
    profileNameHint: '영문자만 지원, 생성 후 수정 불가',
    serverAddress: '서버 주소',
    serverAddressPlaceholder: 'example.com 또는 1.2.3.4',
    serverPort: '서버 포트',
    password: '비밀번호',
    passwordPlaceholder: '비밀번호 입력',
    encryptionMethod: '암호화 방식',
    protocol: '프로토콜',
    obfuscation: '난독화',
    localPort: '로컬 포트',
    protocolParam: '프로토콜 매개변수',
    protocolParamPlaceholder: '선택 사항',
    obfsParam: '난독화 매개변수',
    obfsParamPlaceholder: '선택 사항',
    idleTimeout: '유휴 시간 초과 (초)',
    connectTimeout: '연결 시간 초과 (초)',
    udpTimeout: 'UDP 시간 초과 (초)',
    enableUdp: 'UDP 릴레이 활성화',
    ssrServicePort: 'SSR 서비스 포트',
    ssrServicePortHint: 'ssr-native-client 내부 포트, 라우터 포트와 달라야 합니다',
    validation: {
      nameRequired: '설정 이름은 영문자(a-z, A-Z)만 포함할 수 있습니다',
      serverRequired: '서버 주소는 필수입니다',
      passwordRequired: '비밀번호는 필수입니다'
    },
    success: {
      created: '설정이 생성되었습니다!',
      updated: '설정이 업데이트되었습니다!'
    },
    error: {
      saveFailed: '설정 저장 실패'
    }
  },
  proxyControl: {
    title: '프록시 제어',
    connected: '연결됨',
    disconnected: '연결 끊김',
    selectConfigFirst: '먼저 설정을 선택하세요',
    activeConfig: '현재 설정',
    enableProxy: '프록시 활성화',
    disableProxy: '프록시 비활성화',
    connecting: '연결 중...',
    disconnecting: '연결 해제 중...',
    modifyEnvVar: '환경 변수 변경 (all_proxy / ALL_PROXY 설정)',
    envWarning1: '• 활성화 후 새로 연 터미널에만 프록시가 적용됩니다',
    envWarning2: '• 비활성화 후 기존 터미널은 네트워크에 연결할 수 없으므로 다시 열어야 합니다',
    envWarning3: '• XFCE / i3 / sway / Hyprland / Openbox / dwm 등 GNOME / KDE 이외의 데스크톱에서는 터미널에서 프록시를 사용하려면 반드시 체크해야 합니다',
    success: {
      enabled: '프록시가 활성화되었습니다!',
      disabled: '프록시가 비활성화되었습니다!'
    },
    error: {
      enableFailed: '프록시 활성화 실패',
      disableFailed: '프록시 비활성화 실패'
    }
  },
  dashboard: {
    howToUse: '사용 방법',
    steps: [
      'Firefox에는 자체 프록시 설정이 있습니다. Firefox 브라우저를 사용할 때는 브라우저 설정에서 프록시를 변경해야 합니다. Firefox 확장 프로그램 FoxyProxy에서 SOCKS 프록시를 설정하는 것이 좋으며, 다양한 프록시 환경에서 원클릭으로 전환할 수 있습니다. Chromium 기반 브라우저를 사용하는 경우 이 설정이 필요하지 않습니다.',
      '터미널 프록시는 「환경 변수 변경」 옵션에 의존합니다. 체크하면 새로 연 터미널이 자동으로 SOCKS 프록시를 사용합니다（기존 터미널은 다시 열어야 함）.',
      'GNOME / Cinnamon / MATE / COSMIC / Budgie / Pantheon / Unity / Deepin / UOS / UKUI / Ubuntu 및 KDE Plasma 사용자：GUI 앱은 시스템 프록시 설정을 자동으로 따릅니다. XFCE / i3 / sway / Hyprland / Openbox / dwm 등 기타 데스크톱：GUI 앱은 시스템 프록시를 자동으로 사용하지 않습니다. 「환경 변수 변경」을 체크하고 터미널을 다시 여세요.',
      '「환경 변수 변경」을 체크하지 않으려면, proxychains를 사용하여 특정 명령어만 프록시를 통해 실행할 수 있습니다（아래 Proxychains 설정 가이드 참조）.',
      '프로젝트 주소: https://github.com/liangzhaoyuan12/shadowsocksr-client-linux',
      '오픈 소스 라이선스: MIT'
    ],
    localProxySettings: '로컬 프록시 설정',
    socks5: 'SOCKS5 프록시',
    portLabel: '포트',
    followSystem: '시스템 설정 따르기',
    routeMode: '프록시 라우트 모드',
    routeGlobal: '전역',
    routeBypassLan: 'LAN 우회',
    routeBypassChina: '중국 본토 우회',
    routeBypassLanChina: 'LAN + 중국 본토 우회',
    portHint: '라우터 포트 {routerPort}（SSR 서비스 포트 {ssrPort}와 달라야 함）',
    portConflictHint: '❌ 라우터 포트 {routerPort}가 SSR 포트 {ssrPort}와 충돌합니다. 다르게 설정하세요！',
    proxychainsTitle: 'Proxychains 설정（환경 변수 변경 없음）',
    proxychainsIntro: '「환경 변수 변경」을 체크하지 않은 경우, proxychains를 사용하여 특정 프로그램을 SOCKS5 프록시로 실행할 수 있습니다：',
    proxychainsStep1: 'proxychains 설치（이미 설치된 경우 건너뛰기）：sudo apt install proxychains4',
    proxychainsStep2: '/etc/proxychains4.conf 파일을 편집하여 [ProxyList] 섹션 끝에 다음 설정을 추가（기존 프록시가 있으면 마지막에 추가）',
    proxychainsStep3: '명령어 앞에',
    proxychainsStep3Suffix: '를 붙이면 프록시를 통해 실행됩니다. 예：proxychains curl https://www.google.com',
    proxychainsConfigFile: '/etc/proxychains4.conf의 [ProxyList] 섹션에 추가：',
    proxychainsConfigHint: '참고：[ProxyList]에 이미 다른 프록시 항목이 있으면 주석 처리（행 앞에 #）하거나 삭제하고 위의 한 줄만 남겨두세요.'
  },
  footer: {
    text: 'ShadowsocksR Linux 클라이언트'
  }
}
