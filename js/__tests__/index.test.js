import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock App before importing index
const MockApp = vi.fn();
const mockStart = vi.fn();
MockApp.prototype.start = mockStart;

vi.mock('../App.js', () => ({
  default: MockApp,
}));

vi.mock('../config.ts', () => ({
  config: {
    apiUrl: 'http://mocked.api',
    defaultUser: { name: 'Mock User' },
  },
}));

describe('index.js', () => {
  beforeEach(() => {
    vi.resetModules();
    MockApp.mockClear();
    mockStart.mockClear();
  });

  it('should instantiate App and start it with config', async () => {
    // Dynamically import index to execute IIFE
    await import('../index.js');

    expect(MockApp).toHaveBeenCalledTimes(1);
    expect(mockStart).toHaveBeenCalledTimes(1);
    expect(mockStart).toHaveBeenCalledWith({
      settings: {
        dataUrl: 'http://mocked.api',
      },
      user: {
        name: 'Mock User',
      },
    });
  });
});
