import { describe, it, expect, beforeEach } from 'vitest';
import { items } from '../collections/items.js';

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
});
