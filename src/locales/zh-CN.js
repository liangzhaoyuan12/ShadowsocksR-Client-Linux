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
      '若想强制终端应用走代理，需要配置 proxychains。安装后编辑配置文件 ~/.config/proxychains/proxychains.conf，在最后一行添加：socks5 127.0.0.1 <端口号>（端口号为配置中设置的本地端口）。使用时在命令前加 proxychains4 即可，例如：proxychains4 curl https://www.google.com',
      '项目地址：https://github.com/liangzhaoyuan12/shadowsocksr-client-linux',
      '开源协议：MIT'
    ],
    localProxySettings: '本地代理设置',
    socks5: 'SOCKS5 代理',
    portLabel: '端口'
  },
  footer: {
    text: 'ShadowsocksR Linux 客户端'
  }
}
