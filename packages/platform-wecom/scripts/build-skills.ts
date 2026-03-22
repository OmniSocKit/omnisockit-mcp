/**
 * SKILL 编译脚本
 *
 * 读取 skills/*.md → 生成 src/generated/skills.ts
 * 将 .md 内容嵌入为 TypeScript 常量，运行时不依赖外部文件。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_DIR = path.resolve(__dirname, '../skills');
const OUTPUT_DIR = path.resolve(__dirname, '../src/generated');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'skills.ts');

// 读取所有 .md 文件
const files = fs.readdirSync(SKILLS_DIR).filter((f) => f.endsWith('.md') && f !== 'README.md');

if (files.length === 0) {
  console.error('Error: no .md files found in skills/');
  process.exit(1);
}

// 生成 TypeScript 常量
const entries = files.map((file) => {
  const name = path.basename(file, '.md');
  const content = fs.readFileSync(path.join(SKILLS_DIR, file), 'utf-8');
  return `  '${name}': ${JSON.stringify(content)}`;
});

const output = `// ⚠️ 自动生成，请勿手动编辑
// 由 scripts/build-skills.ts 从 skills/*.md 编译
// 生成时间：${new Date().toISOString()}

export const SKILLS: Record<string, string> = {
${entries.join(',\n')}
};

export const SKILL_COUNT = ${files.length};
`;

// 确保输出目录存在
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');

console.log(`✅ Generated ${files.length} skills → ${path.relative(process.cwd(), OUTPUT_FILE)}`);
