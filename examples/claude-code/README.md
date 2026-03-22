# Claude Code（原 Codex CLI）

## 添加 MCP Server

```bash
claude mcp add omnisockit -- npx @omnisockit/mcp-server
```

## 验证

```bash
claude mcp list
```

应看到 `omnisockit` 已注册。

## 使用

```bash
claude
> 帮我实现企微 OAuth 扫码登录
```

Claude Code 会自动读取相关 SKILL 并生成精确代码。
