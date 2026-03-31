import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('config', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('should use VITE_API_URL from environment', async () => {
    vi.stubEnv('VITE_API_URL', 'http://test.example.com');

    const { config } = await import('../config.ts');

    expect(config.apiUrl).toBe('http://test.example.com');
  });

  it('should default API_URL if VITE_API_URL not set', async () => {
    vi.stubEnv('VITE_API_URL', undefined);

    const { config } = await import('../config.ts');

    expect(config.apiUrl).toBe('http://127.0.0.1:8337');
  });

  it('should use VITE_USER_NAME from environment', async () => {
    vi.stubEnv('VITE_USER_NAME', 'Alice');

    const { config } = await import('../config.ts');

    expect(config.defaultUser.name).toBe('Alice');
  });

  it('should default USER_NAME if VITE_USER_NAME not set', async () => {
    vi.stubEnv('VITE_USER_NAME', undefined);

    const { config } = await import('../config.ts');

    expect(config.defaultUser.name).toBe('John Doe');
  });
});
