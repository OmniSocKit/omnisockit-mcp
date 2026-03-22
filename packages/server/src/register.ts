/**
 * Resource & Tool 注册器
 *
 * Resource：AI 客户端按需拉取 SKILL 内容
 * Tool：AI 主动调用 list_skills / read_skill（兼容性更强）
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { SkillPlatform } from '@omnisockit/core';
import { logger } from '@omnisockit/core';

/**
 * 将平台的所有 SKILL 注册为 MCP Resource
 */
export function registerPlatformResources(
  server: McpServer,
  platform: SkillPlatform,
): void {
  for (const resource of platform.resources) {
    server.resource(
      resource.name,
      resource.uri,
      {
        description: resource.description,
        mimeType: resource.mimeType,
      },
      async (uri) => {
        let text: string;
        try {
          text = await resource.load();
        } catch (e) {
          logger.error(`Failed to load SKILL: ${resource.name}`, e);
          text = `[Error] Failed to load SKILL: ${resource.name}`;
        }
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: resource.mimeType,
              text,
            },
          ],
        };
      },
    );
  }

  logger.info(
    `Registered ${platform.resources.length} resources for ${platform.displayName}`,
  );
}

/**
 * 注册 list_skills / read_skill Tool
 *
 * 让 AI 能主动调用，而非等待客户端拉取 Resource。
 * 解决部分 MCP 客户端不主动读取 Resource 的兼容性问题。
 */
export function registerPlatformTools(
  server: McpServer,
  platform: SkillPlatform,
): void {
  // ── list_skills ──
  server.tool(
    `list_${platform.name}_skills`,
    `列出所有 ${platform.displayName} SKILL（按能力域分组）。当用户咨询${platform.displayName}（企微/WeCom）相关开发时，先调用此工具查看有哪些 SKILL 可用，再用 read_${platform.name}_skill 读取具体内容。\n\n分组引导：\n- foundation（基座）：认证、OAuth、JSSDK、通讯录 → 所有场景的前置依赖\n- messaging（消息）：消息发送、素材、客服、会议 → 消息与实时通信\n- crm（客户关系）：客户管理、标签、群发、朋友圈 → 营销与私域\n- office（办公协同）：审批、文档、日程、考勤 → 企业办公\n- isv（服务商）：第三方应用、代开发 → ISV/代开发模式\n- advanced（高级）：会话存档、安全、数据智能 → 特殊场景`,
    {},
    async () => {
      // 按 group 分组组织返回结构
      const grouped: Record<string, Array<{ name: string; description: string; uri: string }>> = {};
      for (const r of platform.resources) {
        const group = r.group ?? 'other';
        if (!grouped[group]) grouped[group] = [];
        grouped[group].push({
          name: r.name,
          description: r.description,
          uri: r.uri,
        });
      }
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(grouped, null, 2),
          },
        ],
      };
    },
  );

  // ── read_skill ──
  server.tool(
    `read_${platform.name}_skill`,
    `读取指定的 ${platform.displayName} SKILL 完整内容。传入 skill_name（如 wecom-core、wecom-auth、wecom-crm-customer 等），返回该 SKILL 的完整 Markdown 文档，包含 API 规范、代码模板和最佳实践。`,
    {
      skill_name: z
        .string()
        .describe('SKILL 名称，如 wecom-core、wecom-auth、wecom-message'),
    },
    async ({ skill_name }) => {
      const resource = platform.resources.find((r) => r.name === skill_name);
      if (!resource) {
        const available = platform.resources.map((r) => r.name).join(', ');
        return {
          content: [
            {
              type: 'text' as const,
              text: `SKILL "${skill_name}" not found. Available skills: ${available}`,
            },
          ],
          isError: true,
        };
      }

      let text: string;
      try {
        text = await resource.load();
      } catch (e) {
        logger.error(`Failed to load SKILL: ${skill_name}`, e);
        return {
          content: [
            {
              type: 'text' as const,
              text: `[Error] Failed to load SKILL: ${skill_name}`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: 'text' as const,
            text,
          },
        ],
      };
    },
  );

  logger.info(
    `Registered tools: list_${platform.name}_skills, read_${platform.name}_skill`,
  );
}
