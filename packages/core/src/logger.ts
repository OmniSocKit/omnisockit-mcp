/**
 * 日志工具
 *
 * MCP 协议约定：stdout 用于 JSON-RPC 通信，日志必须输出到 stderr。
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

let currentLevel: LogLevel = 'info';

export function setLogLevel(level: LogLevel): void {
  currentLevel = level;
}

function shouldLog(level: LogLevel): boolean {
  return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[currentLevel];
}

function formatMessage(level: LogLevel, msg: string): string {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${msg}`;
}

export const logger = {
  debug(msg: string): void {
    if (shouldLog('debug')) {
      console.error(formatMessage('debug', msg));
    }
  },

  info(msg: string): void {
    if (shouldLog('info')) {
      console.error(formatMessage('info', msg));
    }
  },

  warn(msg: string): void {
    if (shouldLog('warn')) {
      console.error(formatMessage('warn', msg));
    }
  },

  error(msg: string, err?: unknown): void {
    if (shouldLog('error')) {
      const detail = err instanceof Error ? ` — ${err.message}` : '';
      console.error(formatMessage('error', `${msg}${detail}`));
    }
  },
};
