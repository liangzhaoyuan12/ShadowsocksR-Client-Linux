export default {
  app: {
    title: 'ShadowsocksR クライアント',
    subtitle: 'Linux 用セキュアプロキシクライアント'
  },
  common: {
    loading: '読み込み中...',
    cancel: 'キャンセル',
    save: '保存',
    create: '作成',
    update: '更新',
    delete: '削除',
    edit: '編集',
    refresh: '更新',
    confirm: '確認',
    close: '閉じる'
  },
  configList: {
    title: '設定一覧',
    empty: '設定がありません',
    emptyHint: '「新規設定」をクリックして最初の設定を作成してください',
    active: 'アクティブ',
    deleteConfirm: '設定 "{name}" を削除してもよろしいですか？',
    deleteSuccess: '削除しました',
    deleteFailed: '削除に失敗しました',
    loadFailed: '設定一覧の読み込みに失敗しました'
  },
  configForm: {
    addTitle: '新規設定',
    editTitle: '設定を編集',
    basicSettings: '基本設定',
    advancedSettings: '詳細設定',
    profileName: '設定名',
    profileNamePlaceholder: '例：マイサーバー',
    profileNameHint: '英字のみ、作成後は変更できません',
    serverAddress: 'サーバーアドレス',
    serverAddressPlaceholder: 'example.com または 1.2.3.4',
    serverPort: 'サーバーポート',
    password: 'パスワード',
    passwordPlaceholder: 'パスワードを入力',
    encryptionMethod: '暗号化方式',
    protocol: 'プロトコル',
    obfuscation: '難読化',
    localPort: 'ローカルポート',
    protocolParam: 'プロトコルパラメータ',
    protocolParamPlaceholder: 'オプション',
    obfsParam: '難読化パラメータ',
    obfsParamPlaceholder: 'オプション',
    idleTimeout: 'アイドルタイムアウト（秒）',
    connectTimeout: '接続タイムアウト（秒）',
    udpTimeout: 'UDP タイムアウト（秒）',
    enableUdp: 'UDP リレーを有効にする',
    validation: {
      nameRequired: '設定名は英字（a-z, A-Z）のみ使用できます',
      serverRequired: 'サーバーアドレスは必須です',
      passwordRequired: 'パスワードは必須です'
    },
    success: {
      created: '設定を作成しました！',
      updated: '設定を更新しました！'
    },
    error: {
      saveFailed: '設定の保存に失敗しました'
    }
  },
  proxyControl: {
    title: 'プロキシ制御',
    connected: '接続済み',
    disconnected: '未接続',
    selectConfigFirst: 'まず設定を選択してください',
    activeConfig: '現在の設定',
    enableProxy: 'プロキシを有効化',
    disableProxy: 'プロキシを無効化',
    connecting: '接続中...',
    disconnecting: '切断中...',
    success: {
      enabled: 'プロキシを有効化しました！',
      disabled: 'プロキシを無効化しました！'
    },
    error: {
      enableFailed: 'プロキシの有効化に失敗しました',
      disableFailed: 'プロキシの無効化に失敗しました'
    }
  },
  dashboard: {
    howToUse: '使用方法',
    steps: [
      'Firefox には独自のプロキシ設定があります。Firefox を使用する場合は、ブラウザの設定でプロキシを設定する必要があります。FoxyProxy 拡張機能を使用して SOCKS プロキシを設定することをお勧めします。Chromium ベースのブラウザを使用する場合は、この手順は不要です。',
      'プロキシを有効にすると、ターミナルアプリケーションは自動的に SOCKS プロキシを使用します。すでに開いているターミナルウィンドウがある場合は、再度開き直してください。',
      'GNOME/Cinnamon/MATE/COSMIC/Budgie/Pantheon/Unity/Deepin/UOS/UKUI/Ubuntu および KDE Plasma デスクトップユーザー：GUI アプリケーションは自動的にプロキシ設定に従います。再起動が必要なのはターミナルのみです。その他のデスクトップ（XFCE、i3、sway、Hyprland など）：すべてのアプリケーションを再起動する必要があります。',
      'プロジェクトURL: https://github.com/liangzhaoyuan12/shadowsocksr-client-linux',
      'ライセンス: MIT'
    ],
    localProxySettings: 'ローカルプロキシ設定',
    socks5: 'SOCKS5 プロキシ',
    portLabel: 'ポート',
    followSystem: 'システムに従う'
  },
  footer: {
    text: 'ShadowsocksR Linux クライアント'
  }
}
