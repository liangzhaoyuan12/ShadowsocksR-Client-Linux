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
      '터미널 애플리케이션이 강제로 프록시를 사용하도록 하려면 proxychains를 설정해야 합니다. 설치 후 설정 파일 ~/.config/proxychains/proxychains.conf를 편집하고 마지막 줄에 다음을 추가하세요: socks5 127.0.0.1 <포트 번호> (포트 번호는 설정에서 지정한 로컬 포트). 사용할 때 명령어 앞에 proxychains4를 붙이면 됩니다. 예: proxychains4 curl https://www.google.com',
      '프로젝트 주소: https://github.com/liangzhaoyuan12/shadowsocksr-client-linux',
      '오픈 소스 라이선스: MIT'
    ],
    localProxySettings: '로컬 프록시 설정',
    socks5: 'SOCKS5 프록시',
    portLabel: '포트'
  },
  footer: {
    text: 'ShadowsocksR Linux 클라이언트'
  }
}
