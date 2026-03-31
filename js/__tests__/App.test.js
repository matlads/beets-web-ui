import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../App.js';
import { ItemsCollection } from '../collections/items.js';
import { history } from 'backbone';

describe('App', () => {
  let app;
  let mockShowView;
  let options;

  beforeEach(() => {
    // Ensure history is stopped before each test
    if (history.started) {
      history.stop();
    }

    options = {
      settings: { dataUrl: 'http://test.example.com' },
    };

    mockShowView = vi.fn();
    // Mock Application's showView method
    App.prototype.showView = mockShowView;

    app = new App();
  });

  afterEach(() => {
    if (history.started) {
      history.stop();
    }
    vi.restoreAllMocks();
  });

  describe('onBeforeStart', () => {
    it('should create items collection and router', () => {
      app.onBeforeStart(app, options);

      expect(options.items).toBeInstanceOf(ItemsCollection);
      expect(options.items.baseUrl).toBe('http://test.example.com');
      expect(options.router).toBeDefined();
      expect(options.router.items).toBe(options.items);
    });
  });

  describe('onStart', () => {
    beforeEach(() => {
      // Setup required options from onBeforeStart
      app.onBeforeStart(app, options);
    });

    it('should create IndexView and show it', () => {
      app.onStart(app, options);

      // showView should have been called with an IndexView instance
      expect(mockShowView).toHaveBeenCalledTimes(1);
      const indexView = mockShowView.mock.calls[0][0];
      expect(indexView).toBeDefined();
      expect(indexView.options).toEqual(options);
    });

    it('should start Backbone.history', () => {
      const historyStartSpy = vi.spyOn(history, 'start').mockImplementation(() => {});

      app.onStart(app, options);

      expect(historyStartSpy).toHaveBeenCalled();
    });
  });
});
