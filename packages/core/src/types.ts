/**
 * OmniSocKit 核心类型定义
 *
 * 所有平台模块和 MCP Server 共享的接口。
 */

// ─── 模式 A：知识交付 ────────────────────────────

/** 平台模块接口 */
export interface SkillPlatform {
  /** 平台标识，如 'wecom' */
  name: string;
  /** 平台显示名，如 '企业微信' */
  displayName: string;
  /** 是否为免费平台（Phase A 企微 = true） */
  isFree: boolean;
  /** SKILL 资源列表 */
  resources: SkillResource[];
  /** 🔜 预留：模式 B 的 Tool 列表 */
  tools?: ToolDefinition[];
}

/** 单个 SKILL 资源 */
export interface SkillResource {
  /** MCP Resource URI，如 'skill://wecom/core' */
  uri: string;
  /** SKILL 名称，如 'wecom-core' */
  name: string;
  /** 给 AI 客户端显示的一句话描述 */
  description: string;
  /** 能力域分组，如 'foundation' / 'crm' / 'messaging' */
  group?: string;
  /** MIME 类型 */
  mimeType: 'text/markdown';
  /** 加载 SKILL 完整内容 */
  load(): Promise<string>;
}

/** SKILL frontmatter 中的版本追踪字段 */
export interface SkillVersionMeta {
  /** 编写时参照的官方 API 版本日期 */
  api_version: string;
  /** SKILL 自身版本 */
  skill_version: string;
  /** 最后一次人工确认准确的日期 */
  last_verified: string;
}

// ─── 模式 B：API 执行（预留） ──────────────────────

/** 🔜 预留：模式 B Tool 接口 */
export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: object;
  execute(input: unknown): Promise<ToolResult>;
  /** 风险等级：read（只读）/ write（写入）/ dangerous（高危） */
  riskLevel: 'read' | 'write' | 'dangerous';
}

/** Tool 执行结果 */
export interface ToolResult {
  content: Array<{ type: 'text'; text: string }>;
  isError?: boolean;
}
