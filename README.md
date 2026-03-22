# OmniSocKit MCP Server

> **让你的 AI 大模型成为社交营销平台开发专家。**

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-green.svg)](https://nodejs.org)
[![Skills](https://img.shields.io/badge/Skills-41-orange.svg)](packages/platform-wecom/skills)

中文 | [English](README.en.md)
---

## 什么是 OmniSocKit？

OmniSocKit 是一个 [MCP (Model Context Protocol)](https://modelcontextprotocol.io) Server，将社交营销平台的开发知识注入到你的 AI 工具中。

安装后，当你对 AI 说「帮我实现企微 OAuth 登录」，AI 能给出包含正确 Token 缓存、错误重试、频率限制处理的**精确代码**——而不是幻觉。

### 核心价值

- 🎯 **精准编码** — AI 不再猜测 API 参数，因为它读过完整的 SKILL 文档
- 🛡️ **避免踩坑** — 每个 SKILL 包含真实的约束、限制、错误码处理
- ⚡ **零配置** — 不需要 API Key、不需要服务器、不需要 Docker
- 🔒 **零风险** — 不调用任何 API，只提供知识

---

## 快速开始

在你的 AI 工具中添加以下配置：

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

安装完成。现在对 AI 说：

> "帮我实现企微 OAuth 扫码登录"

AI 会自动读取相关 SKILL，给出包含所有约束的精确代码。

---

## 支持的 AI 工具

OmniSocKit 兼容所有支持 MCP 协议的 AI 工具：

| 工具 | 类型 | 配置示例 |
|------|------|:--------:|
| [Claude Desktop](https://claude.ai/download) | 桌面应用 | [查看](examples/claude-desktop/) |
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | CLI | [查看](examples/claude-code/) |
| [Cursor](https://cursor.com) | AI IDE | [查看](examples/cursor/) |
| [Antigravity](https://antigravity.dev) | 桌面应用 | [查看](examples/antigravity/) |
| [Windsurf](https://codeium.com/windsurf) | AI IDE | [查看](examples/windsurf/) |
| [VS Code + Copilot](https://code.visualstudio.com) | IDE | [查看](examples/vscode-copilot/) |
| [Trae](https://trae.ai) | AI IDE | [查看](examples/trae/) |
| [Cline](https://github.com/cline/cline) | VS Code 插件 | [查看](examples/cline/) |
| [Roo Code](https://roocode.com) | VS Code 插件 | [查看](examples/roo-code/) |
| [Kilo Code](https://kilo.ai) | VS Code 插件 | [查看](examples/kilo-code/) |
| [Continue](https://continue.dev) | VS Code / JetBrains | [查看](examples/continue/) |
| [Cherry Studio](https://cherry-ai.com) | 桌面应用 | [查看](examples/cherry-studio/) |
| [Zed](https://zed.dev) | 编辑器 | [查看](examples/zed/) |
| [OpenAI Codex CLI](https://github.com/openai/codex) | CLI | [查看](examples/openai-codex/) |

> 💡 只要支持 MCP 协议的工具都可以使用，以上仅列出主流工具。

---

## 覆盖的平台

### ✅ 企业微信（免费）

| 维度 | 数据 |
|------|------|
| SKILL 数量 | 41 个 |
| 覆盖模式 | 企业内部开发 · 服务商代开发（ISV）· 第三方应用 |
| API 覆盖 | 550+ 接口 |
| 代码模板 | 五语言（Python / Node.js / Java / Go / PHP） |

### 🔜 更多平台（即将推出）

- 小红书
- 抖音 / TikTok
- 微信公众平台
- 飞书

---

## 常见场景

| 你对 AI 说 | AI 读取的 SKILL | AI 回答包含 |
|-----------|----------------|------------|
| "帮我获取企微 access_token" | wecom-core | Token 缓存规则、7200s 有效期、多实例互踢 |
| "帮我实现企微扫码登录" | wecom-auth | OAuth URL 格式、code 有效期 5 分钟、redirect_uri 编码 |
| "企微发消息怎么做" | wecom-message | msgtype 类型、agentid 必填、频率限制 |
| "企微 errcode 42001" | wecom-core | Token 过期原因、多实例部署 Token 互踢 |
| "企微客户标签怎么管理" | wecom-crm-tag | 标签上限、企业标签 vs 个人标签 |

---

## 工作原理

```
┌──────────────────────────────────────────┐
│           你的 AI 工具                     │
│  (Claude / Cursor / VS Code / ...)       │
│                                          │
│  用户: "帮我实现企微 OAuth 登录"            │
│                                          │
│  AI 判断需要 wecom-auth 的知识             │
│  ↓ 通过 MCP 协议读取                      │
└──────────────┬───────────────────────────┘
               │ stdio (JSON-RPC)
┌──────────────▼───────────────────────────┐
│        OmniSocKit MCP Server             │
│                                          │
│  41 个 SKILL → 41 个 MCP Resource         │
│  AI 按需读取，不是全量加载                   │
│                                          │
│  返回 wecom-auth SKILL 的完整内容           │
└──────────────────────────────────────────┘
               ↓
  AI 基于 SKILL 知识生成精确代码
  用户拿代码自己执行（我们不碰 API）
```

---

## 项目结构

```
omnisockit-mcp/
├── packages/
│   ├── core/                 ← 核心类型定义
│   ├── platform-wecom/       ← 企微 41 个 SKILL
│   ├── server/               ← MCP Server 引擎
│   ├── cli/                  ← npx 入口
│   └── execution/            ← 🔜 API 执行层（预留）
├── examples/                 ← 14 个 AI 工具配置示例
└── tests/                    ← 单元测试
```

---

## 许可证

[Apache License 2.0](LICENSE)

---

## 链接

- 📖 [企微 SKILL 开源仓库](https://github.com/omnisockit/open-wecom-skills)
- 🌐 [MCP 协议官方文档](https://modelcontextprotocol.io)
