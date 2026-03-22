/**
 * 环境变量与配置管理
 *
 * Phase A 几乎不需要配置；此模块为 Phase B 预留扩展点。
 */

export interface OmniSocKitConfig {
  /** 日志级别 */
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  /** 🔜 预留：API Key（Phase B） */
  apiKey?: string;
}

/**
 * 从环境变量加载配置
 * Phase A 全部使用默认值
 */
export function loadConfig(): OmniSocKitConfig {
  return {
    logLevel: (process.env.OMNISOCKIT_LOG_LEVEL as OmniSocKitConfig['logLevel']) ?? 'info',
    apiKey: process.env.OMNISOCKIT_API_KEY,
  };
}
