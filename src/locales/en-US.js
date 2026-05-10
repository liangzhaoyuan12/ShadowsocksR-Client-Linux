export default {
  app: {
    title: 'ShadowsocksR Client',
    subtitle: 'Secure proxy client for Linux'
  },
  common: {
    loading: 'Loading...',
    cancel: 'Cancel',
    save: 'Save',
    create: 'Create',
    update: 'Update',
    delete: 'Delete',
    edit: 'Edit',
    refresh: 'Refresh',
    confirm: 'Confirm',
    close: 'Close'
  },
  configList: {
    title: 'Configuration Profiles',
    empty: 'No configurations found',
    emptyHint: 'Click "Add New" to create your first configuration',
    active: 'Active',
    deleteConfirm: 'Are you sure you want to delete "{name}"?',
    deleteSuccess: 'Deleted successfully',
    deleteFailed: 'Failed to delete',
    loadFailed: 'Failed to load config list'
  },
  configForm: {
    addTitle: 'Add New Configuration',
    editTitle: 'Edit Configuration',
    basicSettings: 'Basic Settings',
    advancedSettings: 'Advanced Settings',
    profileName: 'Profile Name',
    profileNamePlaceholder: 'e.g., MyServer',
    profileNameHint: 'Letters only, cannot be changed after creation',
    serverAddress: 'Server Address',
    serverAddressPlaceholder: 'example.com or 1.2.3.4',
    serverPort: 'Server Port',
    password: 'Password',
    passwordPlaceholder: 'Enter password',
    encryptionMethod: 'Encryption Method',
    protocol: 'Protocol',
    obfuscation: 'Obfuscation',
    localPort: 'Local Port',
    protocolParam: 'Protocol Param',
    protocolParamPlaceholder: 'Optional',
    obfsParam: 'Obfs Param',
    obfsParamPlaceholder: 'Optional',
    idleTimeout: 'Idle Timeout (s)',
    connectTimeout: 'Connect Timeout (s)',
    udpTimeout: 'UDP Timeout (s)',
    enableUdp: 'Enable UDP Relay',
    ssrServicePort: 'SSR Service Port',
    ssrServicePortHint: 'Internal port for ssr-native-client, must differ from router port',
    validation: {
      nameRequired: 'Config name must contain only letters (a-z, A-Z)',
      serverRequired: 'Server address is required',
      passwordRequired: 'Password is required'
    },
    success: {
      created: 'Config created successfully!',
      updated: 'Config updated successfully!'
    },
    error: {
      saveFailed: 'Failed to save config'
    }
  },
  proxyControl: {
    title: 'Proxy Control',
    connected: 'Connected',
    disconnected: 'Disconnected',
    selectConfigFirst: 'Please select a configuration first',
    activeConfig: 'Active Configuration',
    enableProxy: 'Enable Proxy',
    disableProxy: 'Disable Proxy',
    connecting: 'Connecting...',
    disconnecting: 'Disconnecting...',
    modifyEnvVar: 'Modify environment variables (set all_proxy / ALL_PROXY)',
    envWarning1: '• After enabling, reopen terminals for proxy to take effect',
    envWarning2: '• After disabling, existing terminals lose network — reopen them',
    envWarning3: '• Required for non-GNOME / non-KDE desktops (XFCE, i3, sway, Hyprland, Openbox, dwm, etc.) to use proxy in terminals',
    success: {
      enabled: 'Proxy enabled successfully!',
      disabled: 'Proxy disabled successfully!'
    },
    error: {
      enableFailed: 'Failed to enable proxy',
      disableFailed: 'Failed to disable proxy'
    }
  },
  dashboard: {
    howToUse: 'How to Use',
    steps: [
      'Firefox has its own proxy settings. When using Firefox, you need to configure proxy in browser settings. It is recommended to use the FoxyProxy extension to set up SOCKS proxy, making it easy to switch between different proxy environments with one click. If using Chromium-based browsers, this step is not required.',
      'Terminal proxy depends on the "Modify environment variables" option. When checked, newly opened terminals will automatically use the SOCKS proxy (existing terminals must be reopened).',
      'GNOME / Cinnamon / MATE / COSMIC / Budgie / Pantheon / Unity / Deepin / UOS / UKUI / Ubuntu and KDE Plasma users: GUI apps follow system proxy settings automatically — no extra config needed. XFCE / i3 / sway / Hyprland / Openbox / dwm and other desktops: GUI apps do not use system proxy automatically; you must check "Modify environment variables" and reopen terminals for the SOCKS proxy to take effect.',
      'If you prefer not to modify environment variables, use proxychains to route specific commands through the proxy (see Proxychains guide below).',
      'Project URL: https://github.com/liangzhaoyuan12/shadowsocksr-client-linux',
      'License: MIT'
    ],
    localProxySettings: 'Local Proxy Settings',
    socks5: 'SOCKS5 Proxy',
    portLabel: 'Port',
    followSystem: 'Follow System',
    routeMode: 'Proxy Route Mode',
    routeGlobal: 'Global',
    routeBypassLan: 'Bypass LAN',
    routeBypassChina: 'Bypass China Mainland',
    routeBypassLanChina: 'Bypass LAN + China Mainland',
    portHint: 'Router port {routerPort} (must differ from SSR service port {ssrPort})',
    portConflictHint: '❌ Router port {routerPort} conflicts with SSR port {ssrPort}, must be different!',
    proxychainsTitle: 'Proxychains Configuration (without env vars)',
    proxychainsIntro: 'When "Modify environment variables" is unchecked, use proxychains to route specific programs through SOCKS5:',
    proxychainsStep1: 'Install proxychains (skip if already installed): sudo apt install proxychains4',
    proxychainsStep2: 'Edit /etc/proxychains4.conf, add the following at the end of the [ProxyList] section (append after any existing entries)',
    proxychainsStep3: 'Prefix commands with',
    proxychainsStep3Suffix: 'to route through the proxy, e.g.: proxychains curl https://www.google.com',
    proxychainsConfigFile: 'Add to [ProxyList] section of /etc/proxychains4.conf:',
    proxychainsConfigHint: 'Note: if [ProxyList] already contains other proxy entries, comment them out (prefix with #) or remove them, keeping only the line above.'
  },
  footer: {
    text: 'ShadowsocksR Linux Client'
  }
}
