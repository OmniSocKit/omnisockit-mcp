/**
 * 企微平台模块 — SkillPlatform 实现
 *
 * 将编译后的 41 个 SKILL 暴露为 MCP Resource。
 */

import type { SkillPlatform } from '@omnisockit/core';
import { SKILLS, SKILL_COUNT } from './generated/skills.js';

/**
 * 从 SKILL markdown 的 YAML frontmatter 中提取 description 字段
 */
function extractDescription(markdown: string): string {
  // 匹配 description: 后面的内容（支持单行和多行 | 格式）
  const singleLine = markdown.match(/^description:\s*(?![\|>])(.+)$/m);
  if (singleLine) {
    return singleLine[1].trim();
  }

  // 多行格式：description: |\n  内容\n  内容
  const multiLine = markdown.match(/^description:\s*[\|>]\s*\n((?:\s{2,}.+\n?)+)/m);
  if (multiLine) {
    return multiLine[1]
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .join(' ')
      .slice(0, 200); // 限制长度，避免 description 过长
  }

  return '';
}

/**
 * 从 SKILL 名称生成 MCP Resource URI
 *
 * 例：wecom-core → skill://wecom/core
 *     wecom-crm-customer → skill://wecom/crm-customer
 *     wecom-isv-auth → skill://wecom/isv-auth
 *     wecom-3rd-data → skill://wecom/3rd-data
 */
function nameToUri(name: string): string {
  const suffix = name.replace(/^wecom-/, '');
  return `skill://wecom/${suffix}`;
}

/**
 * 从 SKILL 名称推断所属能力域分组
 *
 * 分组逻辑：
 *   foundation — 基座能力（认证、JSSDK、应用、小程序、移动端）
 *   messaging  — 消息与实时通信（消息、素材、客服、会议、直播）
 *   crm        — 客户关系管理（wecom-crm-* 系列）
 *   office     — 办公协同（审批、文档、日程、考勤、邮件、微盘）
 *   isv        — 第三方服务商 / 代开发（wecom-isv-*、wecom-3rd-*）
 *   advanced   — 高级能力（会话存档、安全、数据智能、行业）
 */
function nameToGroup(name: string): string {
  // CRM 系列
  if (name.startsWith('wecom-crm-')) return 'crm';
  // ISV / 第三方
  if (name.startsWith('wecom-isv-') || name.startsWith('wecom-3rd-')) return 'isv';
  // 办公协同
  if (name.startsWith('wecom-office-')) return 'office';

  // 按精确名称映射
  const groupMap: Record<string, string> = {
    'wecom-core': 'foundation',
    'wecom-auth': 'foundation',
    'wecom-jssdk': 'foundation',
    'wecom-app': 'foundation',
    'wecom-miniapp': 'foundation',
    'wecom-mobile-sdk': 'foundation',
    'wecom-contact': 'foundation',
    'wecom-message': 'messaging',
    'wecom-media': 'messaging',
    'wecom-kf': 'messaging',
    'wecom-meeting': 'messaging',
    'wecom-approval': 'office',
    'wecom-doc': 'office',
    'wecom-advanced': 'advanced',
    'wecom-security': 'advanced',
    'wecom-data-intelligence': 'advanced',
    'wecom-vertical': 'advanced',
  };

  return groupMap[name] ?? 'advanced';
}

export const wecomPlatform: SkillPlatform = {
  name: 'wecom',
  displayName: '企业微信',
  isFree: true,
  resources: Object.entries(SKILLS).map(([name, content]) => ({
    uri: nameToUri(name),
    name,
    description: extractDescription(content),
    group: nameToGroup(name),
    mimeType: 'text/markdown' as const,
    load: async () => content,
  })),
};

export { SKILL_COUNT };
