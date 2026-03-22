# OpenAI Codex CLI

## 添加 MCP Server

```bash
codex --mcp-server "npx @omnisockit/mcp-server"
```

或在配置文件中添加：

```json
{
  "mcpServers": {
    "omnisockit": {
      "command": "npx",
      "args": ["@omnisockit/mcp-server"]
    }
  }
}
```

## 使用

```bash
codex "帮我实现企微 OAuth 扫码登录"
```
