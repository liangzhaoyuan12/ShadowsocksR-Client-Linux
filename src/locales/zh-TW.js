export default {
  app: {
    title: 'ShadowsocksR 用戶端',
    subtitle: 'Linux 安全代理用戶端'
  },
  common: {
    loading: '載入中...',
    cancel: '取消',
    save: '儲存',
    create: '建立',
    update: '更新',
    delete: '刪除',
    edit: '編輯',
    refresh: '重新整理',
    confirm: '確認',
    close: '關閉'
  },
  configList: {
    title: '設定列表',
    empty: '暫無設定',
    emptyHint: '點擊「新建設定」建立您的第一個設定',
    active: '活躍',
    deleteConfirm: '確定要刪除設定 "{name}" 嗎？',
    deleteSuccess: '刪除成功',
    deleteFailed: '刪除失敗',
    loadFailed: '載入設定列表失敗'
  },
  configForm: {
    addTitle: '新建設定',
    editTitle: '編輯設定',
    basicSettings: '基本設定',
    advancedSettings: '進階設定',
    profileName: '設定名稱',
    profileNamePlaceholder: '例如：我的伺服器',
    profileNameHint: '僅支援字母，建立後不可修改',
    serverAddress: '伺服器位址',
    serverAddressPlaceholder: 'example.com 或 1.2.3.4',
    serverPort: '伺服器通訊埠',
    password: '密碼',
    passwordPlaceholder: '輸入密碼',
    encryptionMethod: '加密方式',
    protocol: '協定',
    obfuscation: '混淆',
    localPort: '本機通訊埠',
    protocolParam: '協定參數',
    protocolParamPlaceholder: '選填',
    obfsParam: '混淆參數',
    obfsParamPlaceholder: '選填',
    idleTimeout: '閒置逾時（秒）',
    connectTimeout: '連線逾時（秒）',
    udpTimeout: 'UDP 逾時（秒）',
    enableUdp: '啟用 UDP 中繼',
    validation: {
      nameRequired: '設定名稱只能包含字母（a-z, A-Z）',
      serverRequired: '伺服器位址不能為空',
      passwordRequired: '密碼不能為空'
    },
    success: {
      created: '設定建立成功！',
      updated: '設定更新成功！'
    },
    error: {
      saveFailed: '儲存設定失敗'
    }
  },
  proxyControl: {
    title: '代理控制',
    connected: '已連線',
    disconnected: '未連線',
    selectConfigFirst: '請先選擇一個設定',
    activeConfig: '目前設定',
    enableProxy: '啟用代理',
    disableProxy: '停用代理',
    connecting: '連線中...',
    disconnecting: '斷開中...',
    success: {
      enabled: '代理啟用成功！',
      disabled: '代理已停用！'
    },
    error: {
      enableFailed: '啟用代理失敗',
      disableFailed: '停用代理失敗'
    }
  },
  dashboard: {
    howToUse: '使用說明',
    steps: [
      'Firefox 有自己的代理設定，使用 Firefox 瀏覽器時需要在瀏覽器設定中更改代理設定。推薦在 Firefox 的擴充套件 FoxyProxy 中設定 SOCKS 代理，方便在各種代理環境中一鍵切換。若使用 Chromium 瀏覽器則不需要進行此設定。',
      '若想強制終端應用程式走代理，需要設定 proxychains。安裝後編輯設定檔 ~/.config/proxychains/proxychains.conf，在最後一行新增：socks5 127.0.0.1 <通訊埠號>（通訊埠號為設定中設定的本機通訊埠）。使用時在指令前加 proxychains4 即可，例如：proxychains4 curl https://www.google.com',
      '專案位址：https://github.com/liangzhaoyuan12/shadowsocksr-client-linux',
      '開源協議：MIT'
    ],
    localProxySettings: '本機代理設定',
    socks5: 'SOCKS5 代理',
    portLabel: '通訊埠'
  },
  footer: {
    text: 'ShadowsocksR Linux 用戶端'
  }
}
