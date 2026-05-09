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
      'Terminal applications will automatically use the SOCKS proxy after enabling. If terminal windows were already open, please reopen them for the proxy settings to take effect.',
      'GNOME/Cinnamon/MATE/COSMIC/Budgie/Pantheon/Unity/Deepin/UOS/UKUI/Ubuntu and KDE Plasma users: GUI applications adopt proxy settings automatically — only terminal windows need reopening. Other desktops (XFCE, i3, sway, Hyprland, etc.): all applications must be reopened for proxy to take effect.',
      'Project URL: https://github.com/liangzhaoyuan12/shadowsocksr-client-linux',
      'License: MIT'
    ],
    localProxySettings: 'Local Proxy Settings',
    socks5: 'SOCKS5 Proxy',
    portLabel: 'Port',
    followSystem: 'Follow System'
  },
  footer: {
    text: 'ShadowsocksR Linux Client'
  }
}
