import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@omnisockit/core': path.resolve(__dirname, 'packages/core/src/index.ts'),
      '@omnisockit/platform-wecom': path.resolve(__dirname, 'packages/platform-wecom/src/index.ts'),
      '@omnisockit/server': path.resolve(__dirname, 'packages/server/src/index.ts'),
    },
  },
});
