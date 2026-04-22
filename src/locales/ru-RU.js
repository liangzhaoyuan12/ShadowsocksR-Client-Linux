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
      'Чтобы принудительно направить трафик терминальных приложений через прокси, необходимо настроить proxychains. После установки отредактируйте файл конфигурации ~/.config/proxychains/proxychains.conf и добавьте в последнюю строку: socks5 127.0.0.1 <номер порта> (номер порта - это локальный порт, указанный в конфигурации). При использовании добавьте proxychains4 перед командой, например: proxychains4 curl https://www.google.com',
      'URL проекта: https://github.com/liangzhaoyuan12/shadowsocksr-client-linux',
      'Лицензия: MIT'
    ],
    localProxySettings: 'Настройки локального прокси',
    socks5: 'SOCKS5 прокси',
    portLabel: 'Порт'
  },
  footer: {
    text: 'Клиент ShadowsocksR для Linux'
  }
}
