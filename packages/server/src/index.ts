/**
 * OmniSocKit MCP Server 主入口
 *
 * 初始化 McpServer → 注册平台 Resource → 连接 stdio Transport
 */

import { createRequire } from 'node:module';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { loadConfig, setLogLevel, logger } from '@omnisockit/core';
import { wecomPlatform, SKILL_COUNT } from '@omnisockit/platform-wecom';
import { registerPlatformResources, registerPlatformTools } from './register.js';

/** 从 package.json 动态读取版本号，避免硬编码 */
function getVersion(): string {
  try {
    const require = createRequire(import.meta.url);
    const pkg = require('../package.json') as { version: string };
    return pkg.version;
  } catch {
    return '0.0.0';
  }
}

export async function main(): Promise<void> {
  // 加载配置
  const config = loadConfig();
  setLogLevel(config.logLevel);

  logger.info('OmniSocKit MCP Server starting...');

  // 创建 MCP Server
  const version = getVersion();
  const server = new McpServer({
    name: 'omnisockit',
    version,
  });

  // 注册企微平台的 SKILL Resource + Tool
  registerPlatformResources(server, wecomPlatform);
  registerPlatformTools(server, wecomPlatform);

  // 🔜 未来：注册其他付费平台
  // registerPlatformResources(server, xhsPlatform);
  // registerPlatformResources(server, douyinPlatform);

  // 连接 stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  logger.info(
    `OmniSocKit MCP Server v${version} running on stdio — ${SKILL_COUNT} skills loaded`,
  );

  // Graceful Shutdown
  const shutdown = async () => {
    logger.info('Shutting down OmniSocKit MCP Server...');
    await server.close();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}
