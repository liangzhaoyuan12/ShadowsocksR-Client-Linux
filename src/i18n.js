import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'
import zhTW from './locales/zh-TW'
import zhHK from './locales/zh-HK'
import jaJP from './locales/ja-JP'
import koKR from './locales/ko-KR'
import ruRU from './locales/ru-RU'

const STORAGE_KEY = 'ssr-client-language'

// Detect system locale from navigator (no localStorage check)
export function detectSystemLocale() {
  const lang = navigator.language || 'en-US'
  if (lang.startsWith('zh')) {
    if (lang.includes('TW') || lang.includes('tw')) {
      return 'zh-TW'
    } else if (lang.includes('HK') || lang.includes('hk')) {
      return 'zh-HK'
    } else {
      return 'zh-CN'
    }
  }
  if (lang.startsWith('ja')) {
    return 'ja-JP'
  }
  if (lang.startsWith('ko')) {
    return 'ko-KR'
  }
  if (lang.startsWith('ru')) {
    return 'ru-RU'
  }
  return 'en-US'
}

// Get initial locale: auto → system detect, otherwise saved preference
function getInitialLocale() {
  const savedLang = localStorage.getItem(STORAGE_KEY)
  // 'auto' or no saved preference: use system detection
  if (savedLang === 'auto' || !savedLang) {
    return detectSystemLocale()
  }
  // Explicit locale: use saved value if valid
  if (['zh-CN', 'zh-TW', 'zh-HK', 'en-US', 'ja-JP', 'ko-KR', 'ru-RU'].includes(savedLang)) {
    return savedLang
  }
  return 'en-US'
}

// Whether user is in "follow system" mode
export function isAutoMode() {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved === 'auto' || saved === null
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
    'zh-TW': zhTW,
    'zh-HK': zhHK,
    'ja-JP': jaJP,
    'ko-KR': koKR,
    'ru-RU': ruRU
  }
})

export default i18n
export { STORAGE_KEY }
