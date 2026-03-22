/**
 * Core 模块测试
 *
 * 覆盖 logger、config 的核心逻辑
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger, setLogLevel, loadConfig } from '@omnisockit/core';

describe('Logger', () => {
  let stderrSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    stderrSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    setLogLevel('debug');
  });

  afterEach(() => {
    stderrSpy.mockRestore();
    setLogLevel('info');
  });

  it('debug 级别应输出 debug 日志', () => {
    logger.debug('test debug');
    expect(stderrSpy).toHaveBeenCalledOnce();
    expect(stderrSpy.mock.calls[0][0]).toContain('[DEBUG]');
    expect(stderrSpy.mock.calls[0][0]).toContain('test debug');
  });

  it('info 级别应输出 info 日志', () => {
    logger.info('test info');
    expect(stderrSpy).toHaveBeenCalledOnce();
    expect(stderrSpy.mock.calls[0][0]).toContain('[INFO]');
  });

  it('warn 级别应输出 warn 日志', () => {
    logger.warn('test warn');
    expect(stderrSpy).toHaveBeenCalledOnce();
    expect(stderrSpy.mock.calls[0][0]).toContain('[WARN]');
  });

  it('error 级别应输出 error 日志', () => {
    logger.error('test error');
    expect(stderrSpy).toHaveBeenCalledOnce();
    expect(stderrSpy.mock.calls[0][0]).toContain('[ERROR]');
  });

  it('error 应附带 Error 对象的 message', () => {
    logger.error('failed', new Error('something went wrong'));
    expect(stderrSpy.mock.calls[0][0]).toContain('something went wrong');
  });

  it('日志级别过滤：设为 warn 后 debug/info 不输出', () => {
    setLogLevel('warn');
    logger.debug('ignored');
    logger.info('ignored');
    expect(stderrSpy).not.toHaveBeenCalled();
    logger.warn('visible');
    expect(stderrSpy).toHaveBeenCalledOnce();
  });

  it('日志包含 ISO 时间戳', () => {
    logger.info('timestamp test');
    expect(stderrSpy.mock.calls[0][0]).toMatch(/\d{4}-\d{2}-\d{2}T/);
  });
});

describe('Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('默认日志级别为 info', () => {
    delete process.env.OMNISOCKIT_LOG_LEVEL;
    const config = loadConfig();
    expect(config.logLevel).toBe('info');
  });

  it('从环境变量读取日志级别', () => {
    process.env.OMNISOCKIT_LOG_LEVEL = 'debug';
    const config = loadConfig();
    expect(config.logLevel).toBe('debug');
  });

  it('默认 apiKey 为 undefined', () => {
    delete process.env.OMNISOCKIT_API_KEY;
    const config = loadConfig();
    expect(config.apiKey).toBeUndefined();
  });

  it('从环境变量读取 apiKey', () => {
    process.env.OMNISOCKIT_API_KEY = 'test-key-123';
    const config = loadConfig();
    expect(config.apiKey).toBe('test-key-123');
  });
});
