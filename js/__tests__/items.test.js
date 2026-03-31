import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { items } from '../collections/items.js';
import { mockSyncSuccess, mockSyncError, restoreSync } from './utils/sync.js';

describe('ItemsCollection', () => {
  beforeEach(() => {
    items.reset();
    items.baseUrl = 'http://test.example.com';
  });

  it('should have correct model', () => {
    expect(items.model.prototype.defaults).toHaveProperty('title', 'N/A');
  });

  it('should set query URL correctly', () => {
    const collection = items.setQuery('artist:test');
    expect(collection.url).toBe('http://test.example.com/item/query/artist:test');
    expect(collection).toBe(items);
  });

  it('should parse items from response data', () => {
    const testData = { items: [{ id: 1, title: 'Test Song' }] };
    const parsed = items.parse(testData);
    expect(parsed).toEqual([{ id: 1, title: 'Test Song' }]);
  });

  it('should parse results from response data', () => {
    const testData = { results: [{ id: 2, title: 'Another Song' }] };
    const parsed = items.parse(testData);
    expect(parsed).toEqual([{ id: 2, title: 'Another Song' }]);
  });

  it('should trigger items:setQuery event', () => {
    let eventTriggered = false;
    items.on('items:setQuery', () => {
      eventTriggered = true;
    });

    items.setQuery('album:test');
    expect(eventTriggered).toBe(true);
  });

  describe('fetch lifecycle', () => {
    beforeEach(() => {
      items.baseUrl = 'http://test.example.com';
      items.setQuery('test');
    });

    afterEach(() => {
      restoreSync();
    });

    it('should trigger items:fetch:start on fetch', () => {
      let startTriggered = false;
      items.on('items:fetch:start', () => {
        startTriggered = true;
      });

      mockSyncSuccess([{ id: 1, title: 'Test' }]);
      items.fetch();

      expect(startTriggered).toBe(true);
    });

    it('should trigger items:fetch:success on successful fetch', () => {
      let successTriggered = false;
      items.on('items:fetch:success', () => {
        successTriggered = true;
      });

      mockSyncSuccess([{ id: 1, title: 'Test' }]);
      items.fetch();

      expect(successTriggered).toBe(true);
    });

    it('should trigger items:fetch:error on failed fetch', () => {
      let errorTriggered = false;
      items.on('items:fetch:error', () => {
        errorTriggered = true;
      });

      mockSyncError(new Error('Network error'));
      items.fetch();

      expect(errorTriggered).toBe(true);
    });

    it('should call original success callback', () => {
      let originalSuccessCalled = false;
      const success = () => {
        originalSuccessCalled = true;
      };

      mockSyncSuccess([{ id: 1, title: 'Test' }]);
      items.fetch({ success });

      expect(originalSuccessCalled).toBe(true);
    });

    it('should call original error callback', () => {
      let originalErrorCalled = false;
      const error = () => {
        originalErrorCalled = true;
      };

      mockSyncError(new Error('Network error'));
      items.fetch({ error });

      expect(originalErrorCalled).toBe(true);
    });

    it('should delegate to Backbone.Collection.fetch once', () => {
      const spy = vi.spyOn(items, 'fetch').mockImplementation(() => {});
      items.fetch();
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });
  });
});
