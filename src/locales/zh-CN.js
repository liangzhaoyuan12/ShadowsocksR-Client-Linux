export default {
  app: {
    title: 'ShadowsocksR 客户端',
    subtitle: 'Linux 安全代理客户端'
  },
  common: {
    loading: '加载中...',
    cancel: '取消',
    save: '保存',
    create: '创建',
    update: '更新',
    delete: '删除',
    edit: '编辑',
    refresh: '刷新',
    confirm: '确认',
    close: '关闭'
  },
  configList: {
    title: '配置列表',
    empty: '暂无配置',
    emptyHint: '点击"新建配置"创建您的第一个配置',
    active: '活跃',
    deleteConfirm: '确定要删除配置 "{name}" 吗？',
    deleteSuccess: '删除成功',
    deleteFailed: '删除失败',
    loadFailed: '加载配置列表失败'
  },
  configForm: {
    addTitle: '新建配置',
    editTitle: '编辑配置',
    basicSettings: '基本设置',
    advancedSettings: '高级设置',
    profileName: '配置名称',
    profileNamePlaceholder: '例如：我的服务器',
    profileNameHint: '仅支持字母，创建后不可修改',
    serverAddress: '服务器地址',
    serverAddressPlaceholder: 'example.com 或 1.2.3.4',
    serverPort: '服务器端口',
    password: '密码',
    passwordPlaceholder: '输入密码',
    encryptionMethod: '加密方式',
    protocol: '协议',
    obfuscation: '混淆',
    localPort: '本地端口',
    protocolParam: '协议参数',
    protocolParamPlaceholder: '可选',
    obfsParam: '混淆参数',
    obfsParamPlaceholder: '可选',
    idleTimeout: '空闲超时（秒）',
    connectTimeout: '连接超时（秒）',
    udpTimeout: 'UDP 超时（秒）',
    enableUdp: '启用 UDP 中继',
    ssrServicePort: 'SSR 服务端口',
    ssrServicePortHint: 'ssr-native-client 监听的内部端口，不与路由端口相同',
    validation: {
      nameRequired: '配置名称只能包含字母（a-z, A-Z）',
      serverRequired: '服务器地址不能为空',
      passwordRequired: '密码不能为空'
    },
    success: {
      created: '配置创建成功！',
      updated: '配置更新成功！'
    },
    error: {
      saveFailed: '保存配置失败'
    }
  },
  proxyControl: {
    title: '代理控制',
    connected: '已连接',
    disconnected: '未连接',
    selectConfigFirst: '请先选择一个配置',
    activeConfig: '当前配置',
    enableProxy: '启用代理',
    disableProxy: '禁用代理',
    connecting: '连接中...',
    disconnecting: '断开中...',
    modifyEnvVar: '更改环境变量（设置 all_proxy / ALL_PROXY）',
    envWarning1: '• 开启后需重新打开终端才能使用代理，已打开的终端不会自动生效',
    envWarning2: '• 关闭代理后，已打开的终端将无法联网，需重新打开终端',
    envWarning3: '• XFCE / i3 / sway / Hyprland / Openbox / dwm 等非 GNOME、非 KDE 的桌面环境，必须勾选此项才能在终端使用代理',
    success: {
      enabled: '代理启用成功！',
      disabled: '代理已禁用！'
    },
    error: {
      enableFailed: '启用代理失败',
      disableFailed: '禁用代理失败'
    }
  },
  dashboard: {
    howToUse: '使用说明',
    steps: [
      '火狐有自己的代理设置，使用火狐浏览器时需要在浏览器设置中改代理设置。推荐在火狐的插件 FoxyProxy 中设置 SOCKS 代理，方便在各种代理环境中一键切换。若使用 Chromium 浏览器则不需要进行此设置。',
      '终端代理依赖"更改环境变量"选项。勾选后，新打开的终端将自动通过 SOCKS 代理联网（已打开的终端需重新打开）。',
      'GNOME / Cinnamon / MATE / COSMIC / Budgie / Pantheon / Unity / Deepin / UOS / UKUI / Ubuntu 及 KDE Plasma 桌面用户：GUI 应用自动跟随系统代理设置，无需额外配置。XFCE / i3 / sway / Hyprland / Openbox / dwm 等其他桌面：GUI 应用不会自动使用系统代理，需勾选"更改环境变量"后，新开终端才能经由 SOCKS 代理联网。',
      '若不方便勾选"更改环境变量"，可通过 proxychains 按需让特定命令走代理（详见下方 Proxychains 配置说明）。',
      '项目地址：https://github.com/liangzhaoyuan12/shadowsocksr-client-linux',
      '开源协议：MIT'
    ],
    localProxySettings: '本地代理设置',
    socks5: 'SOCKS5 代理',
    portLabel: '端口',
    followSystem: '跟随系统',
    routeMode: '代理路由模式',
    routeGlobal: '全局',
    routeBypassLan: '绕开局域网',
    routeBypassChina: '绕开中国大陆',
    routeBypassLanChina: '绕开局域网 + 中国大陆',
    portHint: '路由端口 {routerPort}（须与 SSR 服务端口 {ssrPort} 不同）',
    portConflictHint: '❌ 路由端口 {routerPort} 与 SSR 服务端口 {ssrPort} 相同，必须不同！',
    proxychainsTitle: 'Proxychains 配置（无需更改环境变量）',
    proxychainsIntro: '未勾选"更改环境变量"时，可通过 proxychains 让特定程序走 SOCKS5 代理：',
    proxychainsStep1: '安装 proxychains（如已安装可跳过）：sudo apt install proxychains4',
    proxychainsStep2: '编辑 /etc/proxychains4.conf，在 [ProxyList] 段末尾添加以下配置（已有其他 proxy 则追加到最后）',
    proxychainsStep3: '在命令前加上',
    proxychainsStep3Suffix: '前缀即可通过代理执行，例如：proxychains curl https://www.google.com',
    proxychainsConfigFile: '在 /etc/proxychains4.conf 的 [ProxyList] 段添加：',
    proxychainsConfigHint: '注意：如果 [ProxyList] 中已有其他代理条目，请将其注释掉（行首加 #）或删除，只保留以上一行。'
  },
  footer: {
    text: 'ShadowsocksR Linux 客户端'
  }
}
