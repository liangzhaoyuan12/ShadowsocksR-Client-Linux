<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { enableProxy, disableProxy } from "../utils/api";

const { t } = useI18n();

const props = defineProps({
  activeConfig: {
    type: String,
    default: null
  },
  proxyEnabled: {
    type: Boolean,
    default: false
  },
  routeMode: {
    type: String,
    default: "global"
  }
});

const emit = defineEmits(["status-changed", "modify-env-changed"]);

const loading = ref(false);
const error = ref("");
const success = ref("");

const MODIFY_ENV_KEY = "ssr-client-modify-env";
const modifyEnv = ref(true);

onMounted(() => {
  const saved = localStorage.getItem(MODIFY_ENV_KEY);
  if (saved !== null) {
    modifyEnv.value = saved === "true";
  }
  emit("modify-env-changed", modifyEnv.value);
});

function onModifyEnvChange() {
  localStorage.setItem(MODIFY_ENV_KEY, modifyEnv.value);
  emit("modify-env-changed", modifyEnv.value);
}

async function handleEnable() {
  if (!props.activeConfig) {
    error.value = t('proxyControl.selectConfigFirst');
    return;
  }

  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    await enableProxy(props.activeConfig, modifyEnv.value, props.routeMode);
    success.value = t('proxyControl.success.enabled');
    emit("status-changed", true);
    setTimeout(() => {
      success.value = "";
    }, 3000);
  } catch (err) {
    error.value = err.message || t('proxyControl.error.enableFailed');
  } finally {
    loading.value = false;
  }
}

async function handleDisable() {
  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    await disableProxy(modifyEnv.value);
    success.value = t('proxyControl.success.disabled');
    emit("status-changed", false);
    setTimeout(() => {
      success.value = "";
    }, 3000);
  } catch (err) {
    error.value = err.message || t('proxyControl.error.disableFailed');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="proxy-control">
    <div class="control-header">
      <h3>{{ t('proxyControl.title') }}</h3>
      <div :class="['status-indicator', proxyEnabled ? 'enabled' : 'disabled']">
        <span class="status-dot"></span>
        <span class="status-text">{{ proxyEnabled ? t('proxyControl.connected') : t('proxyControl.disconnected') }}</span>
      </div>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="success" class="success-message">
      {{ success }}
    </div>

    <div class="control-content">
      <div v-if="!activeConfig" class="warning-message">
        <p>{{ t('proxyControl.selectConfigFirst') }}</p>
      </div>

      <div v-else class="active-config-info">
        <p class="info-label">{{ t('proxyControl.activeConfig') }}:</p>
        <p class="config-name">{{ activeConfig }}</p>
      </div>

      <div class="control-buttons">
        <button
          @click="handleEnable"
          class="btn btn-enable"
          :disabled="loading || !activeConfig || proxyEnabled"
        >
          {{ loading && !proxyEnabled ? t('proxyControl.connecting') : t('proxyControl.enableProxy') }}
        </button>

        <button
          @click="handleDisable"
          class="btn btn-disable"
          :disabled="loading || !proxyEnabled"
        >
          {{ loading && proxyEnabled ? t('proxyControl.disconnecting') : t('proxyControl.disableProxy') }}
        </button>
      </div>

      <div class="env-var-option">
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="modifyEnv"
            :disabled="loading"
            @change="onModifyEnvChange"
          />
          <span>{{ t('proxyControl.modifyEnvVar') }}</span>
        </label>
        <div class="env-warning">
          <p>{{ t('proxyControl.envWarning1') }}</p>
          <p>{{ t('proxyControl.envWarning2') }}</p>
          <p>{{ t('proxyControl.envWarning3') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.proxy-control {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.control-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.control-header h3 {
  margin: 0;
  font-size: 18px;
  color: var(--text-primary);
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.status-indicator.enabled {
  background: rgba(72, 187, 120, 0.15);
  color: #48bb78;
}

.status-indicator.disabled {
  background: rgba(160, 174, 192, 0.15);
  color: #a0aec0;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.error-message {
  padding: 12px;
  background: #fee;
  color: #c33;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 16px;
}

.success-message {
  padding: 12px;
  background: #efe;
  color: #3c3;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 16px;
}

.control-content {
  margin-top: 16px;
}

.warning-message {
  padding: 16px;
  background: var(--warning-bg);
  border-radius: 6px;
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.active-config-info {
  padding: 16px;
  background: var(--info-bg);
  border-radius: 6px;
  margin-bottom: 16px;
}

.info-label {
  font-size: 12px;
  color: var(--text-secondary);
  margin: 0 0 4px 0;
}

.config-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0;
}

.control-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.env-var-option {
  padding: 14px;
  background: var(--item-bg);
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
  cursor: pointer;
}

.env-warning {
  padding-left: 24px;
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 1.6;
}

.env-warning p {
  margin: 2px 0;
}

.btn {
  flex: 1;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-enable {
  background: var(--btn-success);
  color: white;
}

.btn-enable:hover:not(:disabled) {
  background: var(--btn-success-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
}

.btn-disable {
  background: var(--btn-danger);
  color: white;
}

.btn-disable:hover:not(:disabled) {
  background: var(--btn-danger-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 101, 101, 0.3);
}
</style>
