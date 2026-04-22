import { invoke } from "@tauri-apps/api/core";

/**
 * 插入/更新配置文件
 * @param {Object} config - 配置对象
 * @returns {Promise<Object>}
 */
export async function insertConfig(config) {
  const response = await invoke("insert_cfg_file", { data: JSON.stringify(config) });
  return JSON.parse(response);
}

/**
 * 删除配置文件
 * @param {string} cfgName - 配置文件名
 * @returns {Promise<Object>}
 */
export async function removeConfig(cfgName) {
  const response = await invoke("remove_cfg_file", { cfgName });
  return JSON.parse(response);
}

/**
 * 获取配置列表
 * @returns {Promise<Array>} 配置名称列表
 */
export async function getConfigList() {
  const response = await invoke("get_cfg_list");
  const data = JSON.parse(response);
  if (data.status_type === "success") {
    const msgData = JSON.parse(data.msg);
    return msgData.cfg_list || [];
  }
  throw new Error("Failed to get config list");
}

/**
 * 获取单个配置的详细信息
 * @param {string} cfgName - 配置文件名
 * @returns {Promise<Object>} 配置详情
 */
export async function getConfigInfo(cfgName) {
  const response = await invoke("get_cfg_info", { cfgName });
  const data = JSON.parse(response);
  if (data.status_type === "success") {
    return JSON.parse(data.msg);
  }
  throw new Error("Failed to get config info");
}

/**
 * 启用代理
 * @param {string} cfgName - 配置文件名
 * @returns {Promise<Object>}
 */
export async function enableProxy(cfgName) {
  const response = await invoke("enable_proxy", { cfgName });
  return JSON.parse(response);
}

/**
 * 禁用代理
 * @returns {Promise<Object>}
 */
export async function disableProxy() {
  const response = await invoke("disable_proxy");
  return JSON.parse(response);
}
