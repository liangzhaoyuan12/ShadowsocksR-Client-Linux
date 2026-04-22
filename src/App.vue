<script setup>
import { ref } from "vue";
import ConfigList from "./components/ConfigList.vue";
import ConfigForm from "./components/ConfigForm.vue";
import ProxyControl from "./components/ProxyControl.vue";

const activeConfig = ref(null);
const proxyEnabled = ref(false);
const showForm = ref(false);
const editMode = ref(false);
const editingConfig = ref("");
const configListRef = ref(null);

function handleSelectConfig(cfgName) {
  if (proxyEnabled.value) {
    if (!confirm("Changing configuration will disable the current proxy. Continue?")) {
      return;
    }
    disableProxyAndSelect(cfgName);
  } else {
    activeConfig.value = cfgName;
  }
}

async function disableProxyAndSelect(cfgName) {
  try {
    const { disableProxy } = await import("./utils/api");
    await disableProxy();
    proxyEnabled.value = false;
    activeConfig.value = cfgName;
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
}

function handleFormCancelled() {
  showForm.value = false;
  editMode.value = false;
  editingConfig.value = "";
}

function handleProxyStatusChanged(enabled) {
  proxyEnabled.value = enabled;
  if (!enabled) {
    activeConfig.value = null;
  }
}
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>ShadowsocksR Client</h1>
      <p class="subtitle">Secure proxy client for Linux</p>
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
            + Add New Configuration
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
                <h4>How to Use</h4>
                <ol>
                  <li>Add a new configuration profile</li>
                  <li>Select the profile from the list</li>
                  <li>Click "Enable Proxy" to connect</li>
                </ol>
              </div>

              <div class="info-card">
                <h4>Local Proxy Settings</h4>
                <ul>
                  <li><strong>SOCKS5:</strong> 127.0.0.1:1080</li>
                  <li><strong>HTTP:</strong> 127.0.0.1:1080</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <footer class="app-footer">
      <p>ShadowsocksR Linux Client</p>
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

.app-header h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 4px 0;
}

.subtitle {
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
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

  .app-header h1 {
    font-size: 24px;
  }

  .app-main {
    padding: 16px 20px;
  }
}
</style>
