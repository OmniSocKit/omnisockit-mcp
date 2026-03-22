/**
 * SKILL 编译与 Resource 注册测试
 *
 * 验证：
 * 1. SKILL 编译产出数量 = 41
 * 2. 每个 SKILL 都包含版本追踪字段
 * 3. SkillPlatform 实现正确
 * 4. Resource URI 格式正确
 * 5. Resource 内容可加载
 */

import { describe, it, expect } from 'vitest';
import { wecomPlatform, SKILL_COUNT } from '@omnisockit/platform-wecom';

describe('SKILL 编译', () => {
  it('应编译出 41 个 SKILL', () => {
    expect(SKILL_COUNT).toBe(41);
  });

  it('平台资源数量应与 SKILL_COUNT 一致', () => {
    expect(wecomPlatform.resources.length).toBe(SKILL_COUNT);
  });
});

describe('SkillPlatform 实现', () => {
  it('平台基本属性正确', () => {
    expect(wecomPlatform.name).toBe('wecom');
    expect(wecomPlatform.displayName).toBe('企业微信');
    expect(wecomPlatform.isFree).toBe(true);
  });
});

describe('SKILL Resource', () => {
  it('每个 Resource 的 URI 格式正确（skill://wecom/*）', () => {
    for (const resource of wecomPlatform.resources) {
      expect(resource.uri).toMatch(/^skill:\/\/wecom\/.+$/);
    }
  });

  it('每个 Resource 的 name 非空', () => {
    for (const resource of wecomPlatform.resources) {
      expect(resource.name).toBeTruthy();
      expect(resource.name.startsWith('wecom-')).toBe(true);
    }
  });

  it('每个 Resource 的 mimeType 为 text/markdown', () => {
    for (const resource of wecomPlatform.resources) {
      expect(resource.mimeType).toBe('text/markdown');
    }
  });

  it('每个 Resource 的 description 非空', () => {
    for (const resource of wecomPlatform.resources) {
      expect(resource.description.length).toBeGreaterThan(0);
    }
  });

  it('每个 Resource 的 load() 返回非空内容', async () => {
    for (const resource of wecomPlatform.resources) {
      const content = await resource.load();
      expect(content.length).toBeGreaterThan(100);
    }
  });
});

describe('SKILL 版本字段', () => {
  it('每个 SKILL 应包含 api_version 字段', async () => {
    for (const resource of wecomPlatform.resources) {
      const content = await resource.load();
      expect(content).toContain('api_version:');
    }
  });

  it('每个 SKILL 应包含 skill_version 字段', async () => {
    for (const resource of wecomPlatform.resources) {
      const content = await resource.load();
      expect(content).toContain('skill_version:');
    }
  });

  it('每个 SKILL 应包含 last_verified 字段', async () => {
    for (const resource of wecomPlatform.resources) {
      const content = await resource.load();
      expect(content).toContain('last_verified:');
    }
  });
});

describe('关键 SKILL 存在性', () => {
  const expectedSkills = [
    'wecom-core',
    'wecom-auth',
    'wecom-contact',
    'wecom-message',
    'wecom-crm-customer',
    'wecom-crm-tag',
    'wecom-kf',
    'wecom-isv-core',
    'wecom-3rd-quickstart',
  ];

  for (const skillName of expectedSkills) {
    it(`应包含 ${skillName}`, () => {
      const found = wecomPlatform.resources.find((r) => r.name === skillName);
      expect(found).toBeDefined();
    });
  }
});
