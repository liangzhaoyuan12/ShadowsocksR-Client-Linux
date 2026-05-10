export default {
  app: {
    title: 'Клиент ShadowsocksR',
    subtitle: 'Безопасный прокси-клиент для Linux'
  },
  common: {
    loading: 'Загрузка...',
    cancel: 'Отмена',
    save: 'Сохранить',
    create: 'Создать',
    update: 'Обновить',
    delete: 'Удалить',
    edit: 'Редактировать',
    refresh: 'Обновить',
    confirm: 'Подтвердить',
    close: 'Закрыть'
  },
  configList: {
    title: 'Список конфигураций',
    empty: 'Нет конфигураций',
    emptyHint: 'Нажмите "Новая конфигурация", чтобы создать первую',
    active: 'Активная',
    deleteConfirm: 'Вы уверены, что хотите удалить конфигурацию "{name}"?',
    deleteSuccess: 'Успешно удалено',
    deleteFailed: 'Ошибка удаления',
    loadFailed: 'Не удалось загрузить список конфигураций'
  },
  configForm: {
    addTitle: 'Новая конфигурация',
    editTitle: 'Редактировать конфигурацию',
    basicSettings: 'Основные настройки',
    advancedSettings: 'Расширенные настройки',
    profileName: 'Имя конфигурации',
    profileNamePlaceholder: 'Например: Мой сервер',
    profileNameHint: 'Только буквы, нельзя изменить после создания',
    serverAddress: 'Адрес сервера',
    serverAddressPlaceholder: 'example.com или 1.2.3.4',
    serverPort: 'Порт сервера',
    password: 'Пароль',
    passwordPlaceholder: 'Введите пароль',
    encryptionMethod: 'Метод шифрования',
    protocol: 'Протокол',
    obfuscation: 'Обфускация',
    localPort: 'Локальный порт',
    protocolParam: 'Параметры протокола',
    protocolParamPlaceholder: 'Необязательно',
    obfsParam: 'Параметры обфускации',
    obfsParamPlaceholder: 'Необязательно',
    idleTimeout: 'Тайм-аут бездействия (сек)',
    connectTimeout: 'Тайм-аут подключения (сек)',
    udpTimeout: 'Тайм-аут UDP (сек)',
    enableUdp: 'Включить UDP ретрансляцию',
    ssrServicePort: 'Порт SSR службы',
    ssrServicePortHint: 'Внутренний порт ssr-native-client, должен отличаться от порта маршрутизатора',
    validation: {
      nameRequired: 'Имя конфигурации может содержать только буквы (a-z, A-Z)',
      serverRequired: 'Адрес сервера обязателен',
      passwordRequired: 'Пароль обязателен'
    },
    success: {
      created: 'Конфигурация успешно создана!',
      updated: 'Конфигурация успешно обновлена!'
    },
    error: {
      saveFailed: 'Не удалось сохранить конфигурацию'
    }
  },
  proxyControl: {
    title: 'Управление прокси',
    connected: 'Подключено',
    disconnected: 'Не подключено',
    selectConfigFirst: 'Сначала выберите конфигурацию',
    activeConfig: 'Текущая конфигурация',
    enableProxy: 'Включить прокси',
    disableProxy: 'Отключить прокси',
    connecting: 'Подключение...',
    disconnecting: 'Отключение...',
    modifyEnvVar: 'Изменить переменные окружения (all_proxy / ALL_PROXY)',
    envWarning1: '• После включения прокси применяется только к новым терминалам',
    envWarning2: '• После отключения существующие терминалы потеряют сеть — откройте их заново',
    envWarning3: '• Для рабочих столов не на GNOME / KDE (XFCE, i3, sway, Hyprland, Openbox, dwm и др.) эта опция необходима для работы прокси в терминале',
    success: {
      enabled: 'Прокси успешно включен!',
      disabled: 'Прокси отключен!'
    },
    error: {
      enableFailed: 'Не удалось включить прокси',
      disableFailed: 'Не удалось отключить прокси'
    }
  },
  dashboard: {
    howToUse: 'Инструкция по использованию',
    steps: [
      'У Firefox есть собственные настройки прокси. При использовании браузера Firefox необходимо изменить настройки прокси в настройках браузера. Рекомендуется настроить SOCKS прокси в расширении FoxyProxy для Firefox, что позволяет легко переключаться между различными прокси-средами. Если вы используете браузер на основе Chromium, эта настройка не требуется.',
      'Прокси для терминала зависит от опции «Изменить переменные окружения». При включении новые терминалы автоматически используют SOCKS прокси (существующие терминалы нужно перезапустить).',
      'Пользователи GNOME / Cinnamon / MATE / COSMIC / Budgie / Pantheon / Unity / Deepin / UOS / UKUI / Ubuntu и KDE Plasma: GUI-приложения автоматически следуют системным настройкам прокси. Другие окружения (XFCE, i3, sway, Hyprland, Openbox, dwm и др.): GUI-приложения не используют системный прокси автоматически — включите «Изменить переменные окружения» и перезапустите терминал.',
      'Если вы не хотите изменять переменные окружения, используйте proxychains для запуска отдельных команд через прокси (см. руководство по Proxychains ниже).',
      'URL проекта: https://github.com/liangzhaoyuan12/shadowsocksr-client-linux',
      'Лицензия: MIT'
    ],
    localProxySettings: 'Настройки локального прокси',
    socks5: 'SOCKS5 прокси',
    portLabel: 'Порт',
    followSystem: 'Следовать системе',
    routeMode: 'Режим маршрутизации',
    routeGlobal: 'Глобальный',
    routeBypassLan: 'Обход LAN',
    routeBypassChina: 'Обход Китая',
    routeBypassLanChina: 'Обход LAN + Китая',
    portHint: 'Порт маршрутизатора {routerPort} (должен отличаться от порта SSR {ssrPort})',
    portConflictHint: '❌ Порт маршрутизатора {routerPort} конфликтует с портом SSR {ssrPort}, они должны быть разными！',
    proxychainsTitle: 'Настройка Proxychains (без изменения переменных окружения)',
    proxychainsIntro: 'Если опция «Изменить переменные окружения» не отмечена, используйте proxychains для запуска программ через SOCKS5 прокси:',
    proxychainsStep1: 'Установите proxychains (пропустите, если уже установлен): sudo apt install proxychains4',
    proxychainsStep2: 'Отредактируйте /etc/proxychains4.conf, добавьте в конец секции [ProxyList] следующую строку (добавьте после существующих записей)',
    proxychainsStep3: 'Добавьте префикс',
    proxychainsStep3Suffix: 'перед командой для запуска через прокси, например: proxychains curl https://www.google.com',
    proxychainsConfigFile: 'Добавьте в секцию [ProxyList] файла /etc/proxychains4.conf:',
    proxychainsConfigHint: 'Примечание: если в [ProxyList] уже есть другие прокси-записи, закомментируйте их (добавьте # в начале строки) или удалите, оставив только строку выше.'
  },
  footer: {
    text: 'Клиент ShadowsocksR для Linux'
  }
}
