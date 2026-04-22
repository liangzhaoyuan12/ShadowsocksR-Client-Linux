<script setup>
import { ref, reactive, watch, defineProps, defineEmits } from "vue";
import { insertConfig, getConfigInfo } from "../utils/api";

const props = defineProps({
  editMode: {
    type: Boolean,
    default: false
  },
  configName: {
    type: String,
    default: ""
  }
});

const emit = defineEmits(["saved", "cancelled"]);

const loading = ref(false);
const error = ref("");
const success = ref("");

const formData = reactive({
  cfg_name: "",
  password: "",
  method: "aes-128-ctr",
  protocol: "auth_aes128_md5",
  protocol_param: "",
  obfs: "tls1.2_ticket_auth",
  obfs_param: "",
  udp: true,
  idle_timeout: 300,
  connect_timeout: 6,
  udp_timeout: 6,
  client_settings: {
    server: "",
    server_port: 443,
    listen_address: "0.0.0.0",
    listen_port: 1080
  }
});

const methods = [
  "aes-128-ctr",
  "aes-192-ctr",
  "aes-256-ctr",
  "aes-128-cfb",
  "aes-192-cfb",
  "aes-256-cfb",
  "chacha20-ietf",
  "xchacha20",
  "rc4-md5"
];

const protocols = [
  "origin",
  "verify_deflate",
  "auth_sha1_v4",
  "auth_aes128_md5",
  "auth_aes128_sha1",
  "auth_chain_a",
  "auth_chain_b"
];

const obfsList = [
  "plain",
  "http_simple",
  "http_post",
  "tls1.2_ticket_auth",
  "tls1.2_ticket_fastauth"
];

async function loadConfig() {
  if (!props.editMode || !props.configName) return;

  loading.value = true;
  error.value = "";
  try {
    const config = await getConfigInfo(props.configName);
    Object.assign(formData, {
      cfg_name: props.configName,
      ...config
    });
  } catch (err) {
    error.value = err.message || "Failed to load config";
  } finally {
    loading.value = false;
  }
}

async function handleSubmit() {
  error.value = "";
  success.value = "";

  // Validation
  if (!formData.cfg_name || !/^[a-zA-Z]+$/.test(formData.cfg_name)) {
    error.value = "Config name must contain only letters (a-z, A-Z)";
    return;
  }

  if (!formData.client_settings.server) {
    error.value = "Server address is required";
    return;
  }

  if (!formData.password) {
    error.value = "Password is required";
    return;
  }

  loading.value = true;
  try {
    await insertConfig(formData);
    success.value = props.editMode ? "Config updated successfully!" : "Config created successfully!";
    setTimeout(() => {
      emit("saved");
    }, 1000);
  } catch (err) {
    error.value = err.message || "Failed to save config";
  } finally {
    loading.value = false;
  }
}

function handleCancel() {
  emit("cancelled");
}

function resetForm() {
  Object.assign(formData, {
    cfg_name: "",
    password: "",
    method: "aes-128-ctr",
    protocol: "auth_aes128_md5",
    protocol_param: "",
    obfs: "tls1.2_ticket_auth",
    obfs_param: "",
    udp: true,
    idle_timeout: 300,
    connect_timeout: 6,
    udp_timeout: 6,
    client_settings: {
      server: "",
      server_port: 443,
      listen_address: "0.0.0.0",
      listen_port: 1080
    }
  });
}

watch(() => props.configName, () => {
  if (props.editMode) {
    loadConfig();
  } else {
    resetForm();
  }
}, { immediate: true });
</script>

<template>
  <div class="config-form">
    <div class="form-header">
      <h3>{{ editMode ? "Edit Configuration" : "Add New Configuration" }}</h3>
      <button @click="handleCancel" class="close-btn">&times;</button>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="success" class="success-message">
      {{ success }}
    </div>

    <form @submit.prevent="handleSubmit" :class="{ loading: loading }">
      <div class="form-section">
        <h4>Basic Settings</h4>

        <div class="form-group">
          <label for="cfg_name">Profile Name</label>
          <input
            id="cfg_name"
            v-model="formData.cfg_name"
            type="text"
            placeholder="e.g., MyServer"
            :disabled="editMode || loading"
            required
            pattern="^[a-zA-Z]+$"
            title="Only letters (a-z, A-Z) are allowed"
          />
          <small class="hint">Letters only, cannot be changed after creation</small>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="server">Server Address</label>
            <input
              id="server"
              v-model="formData.client_settings.server"
              type="text"
              placeholder="example.com or 1.2.3.4"
              :disabled="loading"
              required
            />
          </div>

          <div class="form-group">
            <label for="server_port">Server Port</label>
            <input
              id="server_port"
              v-model.number="formData.client_settings.server_port"
              type="number"
              min="1"
              max="65535"
              :disabled="loading"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            placeholder="Enter password"
            :disabled="loading"
            required
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="method">Encryption Method</label>
            <select id="method" v-model="formData.method" :disabled="loading">
              <option v-for="m in methods" :key="m" :value="m">{{ m }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="protocol">Protocol</label>
            <select id="protocol" v-model="formData.protocol" :disabled="loading">
              <option v-for="p in protocols" :key="p" :value="p">{{ p }}</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="obfs">Obfuscation</label>
            <select id="obfs" v-model="formData.obfs" :disabled="loading">
              <option v-for="o in obfsList" :key="o" :value="o">{{ o }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="listen_port">Local Port</label>
            <input
              id="listen_port"
              v-model.number="formData.client_settings.listen_port"
              type="number"
              min="1"
              max="65535"
              :disabled="loading"
            />
          </div>
        </div>
      </div>

      <div class="form-section">
        <h4>Advanced Settings</h4>

        <div class="form-row">
          <div class="form-group">
            <label for="protocol_param">Protocol Param</label>
            <input
              id="protocol_param"
              v-model="formData.protocol_param"
              type="text"
              placeholder="Optional"
              :disabled="loading"
            />
          </div>

          <div class="form-group">
            <label for="obfs_param">Obfs Param</label>
            <input
              id="obfs_param"
              v-model="formData.obfs_param"
              type="text"
              placeholder="Optional"
              :disabled="loading"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="idle_timeout">Idle Timeout (s)</label>
            <input
              id="idle_timeout"
              v-model.number="formData.idle_timeout"
              type="number"
              min="1"
              :disabled="loading"
            />
          </div>

          <div class="form-group">
            <label for="connect_timeout">Connect Timeout (s)</label>
            <input
              id="connect_timeout"
              v-model.number="formData.connect_timeout"
              type="number"
              min="1"
              :disabled="loading"
            />
          </div>

          <div class="form-group">
            <label for="udp_timeout">UDP Timeout (s)</label>
            <input
              id="udp_timeout"
              v-model.number="formData.udp_timeout"
              type="number"
              min="1"
              :disabled="loading"
            />
          </div>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input
              id="udp"
              v-model="formData.udp"
              type="checkbox"
              :disabled="loading"
            />
            Enable UDP Relay
          </label>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" @click="handleCancel" class="btn btn-secondary" :disabled="loading">
          Cancel
        </button>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? "Saving..." : (editMode ? "Update" : "Create") }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.config-form {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.form-header h3 {
  margin: 0;
  font-size: 18px;
  color: var(--text-primary);
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-btn:hover {
  background: var(--item-hover);
  color: var(--text-primary);
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

form.loading {
  opacity: 0.6;
  pointer-events: none;
}

.form-section {
  margin-bottom: 24px;
}

.form-section h4 {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group {
  margin-bottom: 16px;
  flex: 1;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row .form-group {
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
}

input[type="text"],
input[type="password"],
input[type="number"],
select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  background: var(--input-bg);
  color: var(--text-primary);
  transition: all 0.2s;
  box-sizing: border-box;
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

input:disabled,
select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.hint {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  color: var(--text-secondary);
}

.checkbox-group {
  margin-top: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: normal;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.btn {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: var(--btn-secondary);
  color: var(--text-primary);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--btn-secondary-hover);
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-hover);
}
</style>
