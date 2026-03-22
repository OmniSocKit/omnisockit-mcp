/**
 * CLI 入口模块
 *
 * Phase A：无参数，直接启动 MCP Server
 * Phase B：可接受 --api-key、--platforms 等参数
 */

import { main } from '@omnisockit/server';

export async function run(): Promise<void> {
  await main();
}
