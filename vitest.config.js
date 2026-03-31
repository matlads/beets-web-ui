import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./js/__tests__/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['js/**/*.js'],
      exclude: [
        'js/__tests__/**',
        'js/icons.js',
        '**/*.config.js',
        '**/*.test.js',
      ],
      thresholds: {
        lines: 90,
        statements: 90,
        functions: 90,
        branches: 85,
      },
    },
  },
});
