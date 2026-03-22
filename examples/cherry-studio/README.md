# Cherry Studio

Cherry Studio 使用 GUI 配置 MCP Server。

## 配置步骤

1. 打开 Cherry Studio → 设置 → MCP Servers
2. 点击「添加」
3. 填写：
   - **名称**: `omnisockit`
   - **命令**: `npx`
   - **参数**: `@omnisockit/mcp-server`
4. 保存

## 验证

在对话中输入：

> 帮我实现企微 OAuth 扫码登录

Cherry Studio 会自动调用 OmniSocKit MCP Server 读取相关 SKILL。
