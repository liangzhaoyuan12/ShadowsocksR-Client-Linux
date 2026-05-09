<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import ConfigList from "./components/ConfigList.vue";
import ConfigForm from "./components/ConfigForm.vue";
import ProxyControl from "./components/ProxyControl.vue";
import { getConfigInfo, disableProxy } from "./utils/api";
import { detectSystemLocale, isAutoMode, STORAGE_KEY } from "./i18n";

const ACTIVE_CONFIG_KEY = 'ssr-client-active-config';

const { t, locale, tm } = useI18n();

const activeConfig = ref(null);
const proxyEnabled = ref(false);
const showForm = ref(false);
const editMode = ref(false);
const editingConfig = ref("");
const configListRef = ref(null);
const activeConfigPort = ref(1080);

// Use tm() to get raw message objects (preserves arrays)
const steps = computed(() => tm('dashboard.steps'));

// Language switch
const followSystem = ref(isAutoMode());
const languages = [
  { code: 'auto', name: '' },  // name rendered via t('dashboard.followSystem') in template
  { code: 'zh-CN', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文（台灣）' },
  { code: 'zh-HK', name: '繁體中文（港澳）' },
  { code: 'en-US', name: 'English' },
  { code: 'ja-JP', name: '日本語' },
  { code: 'ko-KR', name: '한국어' },
  { code: 'ru-RU', name: 'Русский' }
];

const currentLocale = ref(locale.value);
const langDropdownOpen = ref(false);

function changeLanguage(code) {
  if (code === 'auto') {
    followSystem.value = true;
    localStorage.setItem(STORAGE_KEY, 'auto');
    const detected = detectSystemLocale();
    locale.value = detected;
    currentLocale.value = detected;
  } else {
    const lang = languages.find(l => l.code === code);
    if (lang && lang.code !== 'auto') {
      followSystem.value = false;
      locale.value = lang.code;
      currentLocale.value = lang.code;
      localStorage.setItem(STORAGE_KEY, lang.code);
    }
  }
  langDropdownOpen.value = false;
}

function toggleLangDropdown() {
  langDropdownOpen.value = !langDropdownOpen.value;
}

// Close dropdown when clicking outside
function handleClickOutside(event) {
  const dropdown = document.querySelector('.lang-dropdown');
  if (dropdown && !dropdown.contains(event.target)) {
    langDropdownOpen.value = false;
  }
}

// Get current language display name
const currentLangName = computed(() => {
  if (followSystem.value) {
    return t('dashboard.followSystem');
  }
  return languages.find(l => l.code === currentLocale.value)?.name || 'English';
});

async function updateActiveConfigPort(cfgName) {
  if (!cfgName) {
    activeConfigPort.value = 1080;
    return;
  }
  try {
    const config = await getConfigInfo(cfgName);
    activeConfigPort.value = config.client_settings?.listen_port || 1080;
  } catch (err) {
    console.error("Failed to get config info:", err);
    activeConfigPort.value = 1080;
  }
}

function handleSelectConfig(cfgName) {
  if (proxyEnabled.value) {
    if (!confirm(t('proxyControl.selectConfigFirst'))) {
      return;
    }
    disableProxyAndSelect(cfgName);
  } else {
    activeConfig.value = cfgName;
    localStorage.setItem(ACTIVE_CONFIG_KEY, cfgName);
    updateActiveConfigPort(cfgName);
  }
}

async function disableProxyAndSelect(cfgName) {
  try {
    await disableProxy();
    proxyEnabled.value = false;
    activeConfig.value = cfgName;
    localStorage.setItem(ACTIVE_CONFIG_KEY, cfgName);
    updateActiveConfigPort(cfgName);
  } catch (err) {
    console.error("Failed to disable proxy:", err);
  }
}

function handleEditConfig(cfgName) {
  editingConfig.value = cfgName;
  editMode.value = true;
  showForm.value = true;
}

function handleAddNew() {
  editingConfig.value = "";
  editMode.value = false;
  showForm.value = true;
}

function handleFormSaved() {
  showForm.value = false;
  editMode.value = false;
  editingConfig.value = "";
  if (configListRef.value) {
    configListRef.value.refresh();
  }
  // Update port if the active config was edited
  if (activeConfig.value) {
    updateActiveConfigPort(activeConfig.value);
  }
}

function handleFormCancelled() {
  showForm.value = false;
  editMode.value = false;
  editingConfig.value = "";
}

function handleProxyStatusChanged(enabled) {
  proxyEnabled.value = enabled;
}

// Setup click outside listener for dropdown
onMounted(() => {
  document.addEventListener('click', handleClickOutside);

  // Restore last selected config
  const savedConfig = localStorage.getItem(ACTIVE_CONFIG_KEY);
  if (savedConfig) {
    activeConfig.value = savedConfig;
    updateActiveConfigPort(savedConfig);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="app">
    <header class="app-header">
      <div class="header-content">
        <div class="header-left">
          <h1>{{ t('app.title') }}</h1>
          <p class="subtitle">{{ t('app.subtitle') }}</p>
        </div>
        <div class="lang-dropdown">
          <div class="lang-dropdown-trigger" @click="toggleLangDropdown">
            <span>{{ currentLangName }}</span>
            <svg class="arrow" :class="{ open: langDropdownOpen }" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
              <path fill="currentColor" d="M6 8L1 3h10z"/>
            </svg>
          </div>
          <div v-if="langDropdownOpen" class="lang-dropdown-menu">
            <div
              v-for="lang in languages"
              :key="lang.code"
              class="lang-dropdown-item"
              :class="{ active: lang.code === 'auto' ? followSystem : currentLocale === lang.code }"
              @click="changeLanguage(lang.code)"
            >
              {{ lang.code === 'auto' ? t('dashboard.followSystem') : lang.name }}
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="app-main">
      <div class="main-layout">
        <!-- Left Sidebar -->
        <aside class="sidebar">
          <ConfigList
            ref="configListRef"
            :active-config="activeConfig"
            @select="handleSelectConfig"
            @edit="handleEditConfig"
            @refresh="() => {}"
          />
          <button @click="handleAddNew" class="btn-add-new">
            + {{ t('configForm.addTitle') }}
          </button>
        </aside>

        <!-- Main Content Area -->
        <section class="content-area">
          <div v-if="showForm" class="form-container">
            <ConfigForm
              :edit-mode="editMode"
              :config-name="editingConfig"
              @saved="handleFormSaved"
              @cancelled="handleFormCancelled"
            />
          </div>

          <div v-else class="dashboard">
            <ProxyControl
              :active-config="activeConfig"
              :proxy-enabled="proxyEnabled"
              @status-changed="handleProxyStatusChanged"
            />

            <div class="info-cards">
              <div class="info-card">
                <h4>{{ t('dashboard.howToUse') }}</h4>
                <ol>
                  <li v-for="(step, index) in steps" :key="index">
                    {{ step }}
                  </li>
                </ol>
              </div>

              <div class="info-card">
                <h4>{{ t('dashboard.localProxySettings') }}</h4>
                <ul>
                  <li><strong>{{ t('dashboard.socks5') }}:</strong> 127.0.0.1:{{ activeConfigPort || '1080' }}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <footer class="app-footer">
      <p>{{ t('footer.text') }}</p>
    </footer>
  </div>
</template>

<style>
:root {
  /* Color Palette */
  --primary-color: #4299e1;
  --primary-hover: #3182ce;
  --success-color: #48bb78;
  --success-hover: #38a169;
  --danger-color: #f56565;
  --danger-hover: #e53e3e;
  --warning-color: #ed8936;
  --info-color: #4299e1;

  /* Background Colors */
  --bg-primary: #f7fafc;
  --bg-secondary: #edf2f7;
  --card-bg: #ffffff;
  --input-bg: #ffffff;
  --item-bg: #f7fafc;
  --item-hover: #edf2f7;
  --active-item-bg: #ebf8ff;
  --warning-bg: #fffaf0;
  --info-bg: #ebf8ff;

  /* Text Colors */
  --text-primary: #2d3748;
  --text-secondary: #718096;

  /* Border */
  --border-color: #e2e8f0;

  /* Button Colors */
  --btn-secondary: #e2e8f0;
  --btn-secondary-hover: #cbd5e0;
  --btn-success: #48bb78;
  --btn-success-hover: #38a169;
  --btn-danger: #f56565;
  --btn-danger-hover: #e53e3e;
  --btn-info: #4299e1;
  --btn-info-hover: #3182ce;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1a202c;
    --bg-secondary: #2d3748;
    --card-bg: #2d3748;
    --input-bg: #4a5568;
    --item-bg: #4a5568;
    --item-hover: #2d3748;
    --active-item-bg: #2c5282;
    --warning-bg: #744210;
    --info-bg: #2c5282;

    --text-primary: #f7fafc;
    --text-secondary: #a0aec0;

    --border-color: #4a5568;

    --btn-secondary: #4a5568;
    --btn-secondary-hover: #718096;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
}

#app {
  min-height: 100vh;
}
</style>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
  color: white;
  padding: 24px 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.header-left h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 4px 0;
}

.subtitle {
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
}

/* Language Dropdown */
.lang-dropdown {
  position: relative;
}

.lang-dropdown-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 180px;
  user-select: none;
}

.lang-dropdown-trigger:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.lang-dropdown-trigger .arrow {
  transition: transform 0.2s;
  flex-shrink: 0;
}

.lang-dropdown-trigger .arrow.open {
  transform: rotate(180deg);
}

.lang-dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: #2d3748;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  min-width: 180px;
  z-index: 1000;
  overflow: hidden;
}

.lang-dropdown-item {
  padding: 10px 16px;
  color: #e2e8f0;
  cursor: pointer;
  transition: background 0.15s;
  font-size: 14px;
  white-space: nowrap;
}

.lang-dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.lang-dropdown-item.active {
  background: rgba(66, 153, 225, 0.3);
  color: white;
}

.app-main {
  flex: 1;
  padding: 24px 32px;
  overflow: auto;
}

.main-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.btn-add-new {
  padding: 12px 20px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(66, 153, 225, 0.2);
}

.btn-add-new:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(66, 153, 225, 0.3);
}

.content-area {
  min-height: 500px;
}

.form-container {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.info-card {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-card h4 {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-card ol,
.info-card ul {
  margin: 0;
  padding-left: 20px;
  color: var(--text-primary);
  font-size: 14px;
}

.info-card li {
  margin-bottom: 6px;
  line-height: 1.6;
  word-wrap: break-word;
  white-space: normal;
}

.info-card li:last-child {
  margin-bottom: 0;
}

.app-footer {
  padding: 16px 32px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 13px;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .main-layout {
    grid-template-columns: 1fr;
  }

  .app-header {
    padding: 16px 20px;
  }

  .header-content {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .header-left h1 {
    font-size: 24px;
  }

  .app-main {
    padding: 16px 20px;
  }
}
</style>
