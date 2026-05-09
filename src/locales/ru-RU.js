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
      'После включения прокси терминальные приложения будут автоматически использовать SOCKS прокси. Если окна терминала уже открыты, перезапустите их для применения настроек.',
      'Пользователи GNOME/Cinnamon/MATE/COSMIC/Budgie/Pantheon/Unity/Deepin/UOS/UKUI/Ubuntu и KDE Plasma: GUI-приложения автоматически применяют настройки прокси — требуется перезапуск только терминала. Другие окружения (XFCE, i3, sway, Hyprland и т.д.): все приложения необходимо перезапустить.',
      'URL проекта: https://github.com/liangzhaoyuan12/shadowsocksr-client-linux',
      'Лицензия: MIT'
    ],
    localProxySettings: 'Настройки локального прокси',
    socks5: 'SOCKS5 прокси',
    portLabel: 'Порт',
    followSystem: 'Следовать системе'
  },
  footer: {
    text: 'Клиент ShadowsocksR для Linux'
  }
}
