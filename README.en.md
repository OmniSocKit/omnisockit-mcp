# OmniSocKit MCP Server

> **Turn your AI into a social platform development expert.**

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-green.svg)](https://nodejs.org)
[![Skills](https://img.shields.io/badge/Skills-41-orange.svg)](packages/platform-wecom/skills)

[中文](README.md) | English

---

## What is OmniSocKit?

OmniSocKit is an [MCP (Model Context Protocol)](https://modelcontextprotocol.io) Server that injects social platform development knowledge into your AI tools.

Once installed, when you tell your AI "help me implement WeCom OAuth login," it generates **precise code** with correct token caching, error retry, and rate limiting — instead of hallucinations.

### Core Value

- 🎯 **Precise Coding** — AI no longer guesses API parameters — it has read the complete SKILL docs
- 🛡️ **Avoid Pitfalls** — Every SKILL includes real constraints, limitations, and error code handling
- ⚡ **Zero Config** — No API keys, no servers, no Docker required
- 🔒 **Zero Risk** — No API calls are made — knowledge delivery only

---

## Quick Start

Add the following to your AI tool's MCP configuration:

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

Done. Now ask your AI:

> "Help me implement WeCom OAuth scan-to-login"

The AI will automatically read the relevant SKILL and generate precise, constraint-aware code.

---

## Supported AI Tools

OmniSocKit works with any MCP-compatible AI tool:

| Tool | Type | Config Example |
|------|------|:--------------:|
| [Claude Desktop](https://claude.ai/download) | Desktop App | [View](examples/claude-desktop/) |
| [Claude Code](https://docs.anthropic.com/en/docs/claude-code) | CLI | [View](examples/claude-code/) |
| [Cursor](https://cursor.com) | AI IDE | [View](examples/cursor/) |
| [Antigravity](https://antigravity.dev) | Desktop App | [View](examples/antigravity/) |
| [Windsurf](https://codeium.com/windsurf) | AI IDE | [View](examples/windsurf/) |
| [VS Code + Copilot](https://code.visualstudio.com) | IDE | [View](examples/vscode-copilot/) |
| [Trae](https://trae.ai) | AI IDE | [View](examples/trae/) |
| [Cline](https://github.com/cline/cline) | VS Code Extension | [View](examples/cline/) |
| [Roo Code](https://roocode.com) | VS Code Extension | [View](examples/roo-code/) |
| [Kilo Code](https://kilo.ai) | VS Code Extension | [View](examples/kilo-code/) |
| [Continue](https://continue.dev) | VS Code / JetBrains | [View](examples/continue/) |
| [Cherry Studio](https://cherry-ai.com) | Desktop App | [View](examples/cherry-studio/) |
| [Zed](https://zed.dev) | Editor | [View](examples/zed/) |
| [OpenAI Codex CLI](https://github.com/openai/codex) | CLI | [View](examples/openai-codex/) |

> 💡 Any tool supporting the MCP protocol will work. The above lists mainstream tools only.

---

## Platform Coverage

### ✅ Enterprise WeChat / WeCom (Free)

| Dimension | Data |
|-----------|------|
| Skills | 41 |
| Modes | Enterprise Internal · ISV (Service Provider) · Third-Party Apps |
| API Coverage | 550+ endpoints |
| Code Templates | 5 languages (Python / Node.js / Java / Go / PHP) |

### 🔜 Coming Soon

- Xiaohongshu (RED)
- Douyin / TikTok
- WeChat Official Account
- Feishu / Lark

---

## Example Scenarios

| You Say | SKILL Read | AI Response Includes |
|---------|-----------|---------------------|
| "Get WeCom access_token" | wecom-core | Token caching rules, 7200s TTL, multi-instance eviction |
| "Implement WeCom QR login" | wecom-auth | OAuth URL format, 5-min code expiry, redirect_uri encoding |
| "Send WeCom messages" | wecom-message | msgtype options, required agentid, rate limits |
| "WeCom errcode 42001" | wecom-core | Token expired reasons, multi-instance token eviction |

---

## How It Works

```
┌──────────────────────────────────────────┐
│           Your AI Tool                   │
│  (Claude / Cursor / VS Code / ...)       │
│                                          │
│  User: "Implement WeCom OAuth login"     │
│                                          │
│  AI determines it needs wecom-auth       │
│  ↓ Reads via MCP protocol               │
└──────────────┬───────────────────────────┘
               │ stdio (JSON-RPC)
┌──────────────▼───────────────────────────┐
│        OmniSocKit MCP Server             │
│                                          │
│  41 SKILLs → 41 MCP Resources            │
│  AI reads on-demand, not bulk-loaded     │
│                                          │
│  Returns wecom-auth SKILL content        │
└──────────────────────────────────────────┘
               ↓
  AI generates precise code based on SKILL
  User executes the code (we never touch APIs)
```

---

## Project Structure

```
omnisockit-mcp/
├── packages/
│   ├── core/                 ← Core type definitions
│   ├── platform-wecom/       ← WeChat Work 41 SKILLs
│   ├── server/               ← MCP Server engine
│   ├── cli/                  ← npx entry point
│   └── execution/            ← 🔜 API execution layer (reserved)
├── examples/                 ← 14 AI tool config examples
└── tests/                    ← Unit tests
```

---

## License

[Apache License 2.0](LICENSE)

---

## Links

- 📖 [WeCom SKILL Open Source Repo](https://github.com/omnisockit/open-wecom-skills)
- 🌐 [MCP Official Documentation](https://modelcontextprotocol.io)
