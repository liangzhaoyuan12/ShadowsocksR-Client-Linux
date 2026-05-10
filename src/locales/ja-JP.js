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
    ssrServicePort: 'SSR サービスポート',
    ssrServicePortHint: 'ssr-native-client の内部ポート、ルーターポートと異なる必要があります',
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
    modifyEnvVar: '環境変数を変更（all_proxy / ALL_PROXY を設定）',
    envWarning1: '• 有効化後、新しく開いたターミナルのみプロキシが適用されます',
    envWarning2: '• 無効化後、既存のターミナルはネットワークに接続できなくなります。再起動してください',
    envWarning3: '• XFCE / i3 / sway / Hyprland / Openbox / dwm など、GNOME / KDE 以外のデスクトップ環境では、ターミナルでプロキシを使用するために必ずチェックが必要です',
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
      'ターミナルのプロキシは「環境変数を変更」オプションに依存します。チェックを入れると、新しく開いたターミナルは自動的に SOCKS プロキシを使用します（既存のターミナルは再起動が必要です）。',
      'GNOME / Cinnamon / MATE / COSMIC / Budgie / Pantheon / Unity / Deepin / UOS / UKUI / Ubuntu および KDE Plasma ユーザー：GUI アプリはシステムプロキシ設定に自動的に従います。XFCE / i3 / sway / Hyprland / Openbox / dwm などの他のデスクトップ：GUI アプリは自動的にシステムプロキシを使用しません。「環境変数を変更」にチェックを入れてターミナルを再起動してください。',
      '「環境変数を変更」をチェックしない場合、proxychains を使用して特定のコマンドのみプロキシ経由で実行できます（下記の Proxychains 設定ガイドを参照）。',
      'プロジェクトURL: https://github.com/liangzhaoyuan12/shadowsocksr-client-linux',
      'ライセンス: MIT'
    ],
    localProxySettings: 'ローカルプロキシ設定',
    socks5: 'SOCKS5 プロキシ',
    portLabel: 'ポート',
    followSystem: 'システムに従う',
    routeMode: 'プロキシルートモード',
    routeGlobal: 'グローバル',
    routeBypassLan: 'LANをバイパス',
    routeBypassChina: '中国本土をバイパス',
    routeBypassLanChina: 'LAN + 中国本土をバイパス',
    portHint: 'ルーターポート {routerPort}（SSR サービスポート {ssrPort} と異なる必要があります）',
    portConflictHint: '❌ ルーターポート {routerPort} が SSR ポート {ssrPort} と競合しています。異なる値を設定してください！',
    proxychainsTitle: 'Proxychains 設定（環境変数変更なし）',
    proxychainsIntro: '「環境変数を変更」をチェックしていない場合、proxychains を使用して特定のプログラムを SOCKS5 プロキシ経由で実行できます：',
    proxychainsStep1: 'proxychains をインストール（既にインストール済みの場合はスキップ）：sudo apt install proxychains4',
    proxychainsStep2: '/etc/proxychains4.conf を編集し、[ProxyList] セクションの末尾に以下の設定を追加（既存のプロキシがある場合は最後に追加）',
    proxychainsStep3: 'コマンドの前に',
    proxychainsStep3Suffix: 'を付けるとプロキシ経由で実行されます。例：proxychains curl https://www.google.com',
    proxychainsConfigFile: '/etc/proxychains4.conf の [ProxyList] セクションに追加：',
    proxychainsConfigHint: '注意：[ProxyList] に既に他のプロキシエントリがある場合は、それらをコメントアウト（行頭に #）するか削除し、上記の1行のみを残してください。'
  },
  footer: {
    text: 'ShadowsocksR Linux クライアント'
  }
}
