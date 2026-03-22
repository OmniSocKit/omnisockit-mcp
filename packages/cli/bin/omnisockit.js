#!/usr/bin/env node

/**
 * OmniSocKit MCP Server — npx 入口
 *
 * 用法：npx @omnisockit/mcp-server
 */

import { run } from '../dist/index.js';

run().catch((error) => {
  console.error('Fatal error:', error instanceof Error ? error.stack : error);
  process.exit(1);
});
