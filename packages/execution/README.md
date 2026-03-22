# Execution Layer（模式 B 预留）

> 🔜 此包为 Phase B 预留，当前不包含任何可执行代码。

## 模式 B 概念

模式 A（当前）：AI 读取 SKILL 知识 → 生成代码 → 用户自行执行
模式 B（未来）：AI 通过 MCP Tool 直接调用 API → 返回结果

## 预留接口

```typescript
// Phase B 将实现：
export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: object;
  execute(input: unknown): Promise<ToolResult>;
  riskLevel: 'read' | 'write' | 'dangerous';
}
```

## 安全设计

- `read` 级别：自动执行（如查询通讯录）
- `write` 级别：需用户确认（如发送消息）
- `dangerous` 级别：需二次确认 + API Key（如删除客户）
