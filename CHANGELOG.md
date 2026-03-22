# Changelog

## v0.1.0 (2026-03-13)

### 🎉 Initial Release — Phase A: Knowledge Delivery

**Core**
- `@omnisockit/core` — 核心类型定义（SkillPlatform / SkillResource / ToolDefinition）
- `@omnisockit/core` — 环境变量管理与 stderr 日志

**Platform**
- `@omnisockit/platform-wecom` — 企业微信 41 个 SKILL
  - 企业内部开发：30 个 SKILL
  - 服务商代开发（ISV）：8 个 SKILL
  - 第三方应用：3 个 SKILL
- SKILL 编译脚本：.md → TypeScript 常量
- 每个 SKILL 包含 `api_version` / `skill_version` / `last_verified` 版本追踪字段

**Server**
- `@omnisockit/server` — MCP Server 引擎
  - 41 个 MCP Resource 注册
  - stdio JSON-RPC 传输
  - 模式 B Tool 注册预留

**CLI**
- `@omnisockit/mcp-server` — npx 入口
  - `npx @omnisockit/mcp-server` 一行命令启动

**Testing**
- 20 个单元测试全部通过
- 覆盖：SKILL 编译数量、版本字段、Resource 属性、关键 SKILL 存在性

**Documentation**
- 14 个 AI 工具配置示例
- 中文 README
