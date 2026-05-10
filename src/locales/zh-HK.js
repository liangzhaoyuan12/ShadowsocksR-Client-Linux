export default {
  app: {
    title: 'ShadowsocksR 客戶端',
    subtitle: 'Linux 安全代理客戶端'
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
    serverPort: '伺服器連接埠',
    password: '密碼',
    passwordPlaceholder: '輸入密碼',
    encryptionMethod: '加密方式',
    protocol: '協定',
    obfuscation: '混淆',
    localPort: '本機連接埠',
    protocolParam: '協定參數',
    protocolParamPlaceholder: '選填',
    obfsParam: '混淆參數',
    obfsParamPlaceholder: '選填',
    idleTimeout: '閒置逾時（秒）',
    connectTimeout: '連線逾時（秒）',
    udpTimeout: 'UDP 逾時（秒）',
    enableUdp: '啟用 UDP 中繼',
    ssrServicePort: 'SSR 服務連接埠',
    ssrServicePortHint: 'ssr-native-client 監聽的內部連接埠，不可與路由連接埠相同',
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
    modifyEnvVar: '更改環境變數（設定 all_proxy / ALL_PROXY）',
    envWarning1: '• 開啟後需重新開啟終端機才能使用代理，已開啟的終端機不會自動生效',
    envWarning2: '• 關閉代理後，已開啟的終端機將無法連網，需重新開啟終端機',
    envWarning3: '• XFCE / i3 / sway / Hyprland / Openbox / dwm 等非 GNOME、非 KDE 的桌面環境，必須勾選此項才能在終端機使用代理',
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
      'Firefox 有自己的代理設定，使用 Firefox 瀏覽器時需要在瀏覽器設定中更改代理設定。推薦在 Firefox 的擴充功能 FoxyProxy 中設定 SOCKS 代理，方便在各種代理環境中一鍵切換。若使用 Chromium 瀏覽器則不需要進行此設定。',
      '終端機代理依賴「更改環境變數」選項。勾選後，新開啟的終端機將自動透過 SOCKS 代理連網（已開啟的終端機需重新開啟）。',
      'GNOME / Cinnamon / MATE / COSMIC / Budgie / Pantheon / Unity / Deepin / UOS / UKUI / Ubuntu 及 KDE Plasma 桌面使用者：GUI 應用程式自動跟隨系統代理設定，無需額外設定。XFCE / i3 / sway / Hyprland / Openbox / dwm 等其他桌面：GUI 應用程式不會自動使用系統代理，需勾選「更改環境變數」後，新開終端機才能經由 SOCKS 代理連網。',
      '若不勾選「更改環境變數」，可透過 proxychains 按需讓特定指令走代理（詳見下方 Proxychains 設定說明）。',
      '專案位址：https://github.com/liangzhaoyuan12/shadowsocksr-client-linux',
      '開源協議：MIT'
    ],
    localProxySettings: '本機代理設定',
    socks5: 'SOCKS5 代理',
    portLabel: '連接埠',
    followSystem: '跟隨系統',
    routeMode: '代理路由模式',
    routeGlobal: '全域',
    routeBypassLan: '繞開區域網路',
    routeBypassChina: '繞開中國大陸',
    routeBypassLanChina: '繞開區域網路 + 中國大陸',
    portHint: '路由連接埠 {routerPort}（不可與 SSR 服務連接埠 {ssrPort} 相同）',
    portConflictHint: '❌ 路由連接埠 {routerPort} 與 SSR 服務連接埠 {ssrPort} 相同，必須不同！',
    proxychainsTitle: 'Proxychains 設定（無需更改環境變數）',
    proxychainsIntro: '未勾選「更改環境變數」時，可透過 proxychains 讓特定程式走 SOCKS5 代理：',
    proxychainsStep1: '安裝 proxychains（如已安裝可跳過）：sudo apt install proxychains4',
    proxychainsStep2: '編輯 /etc/proxychains4.conf，在 [ProxyList] 段末尾加入以下設定（已有其他 proxy 則追加到最後）',
    proxychainsStep3: '在指令前加上',
    proxychainsStep3Suffix: '前綴即可透過代理執行，例如：proxychains curl https://www.google.com',
    proxychainsConfigFile: '在 /etc/proxychains4.conf 的 [ProxyList] 段加入：',
    proxychainsConfigHint: '注意：如果 [ProxyList] 中已有其他代理條目，請將其註解掉（行首加 #）或刪除，只保留以上一行。'
  },
  footer: {
    text: 'ShadowsocksR Linux 客戶端'
  }
}
