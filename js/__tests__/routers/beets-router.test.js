import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BeetsRouter, createRouter } from '../../routers/beets-router.js';
import { ItemsCollection } from '../../collections/items.js';
import { Radio } from 'backbone';
import 'backbone.radio';
import { history } from 'backbone';

describe('BeetsRouter', () => {
  let router;
  let items;
  let channel;

  beforeEach(() => {
    items = new ItemsCollection();
    items.baseUrl = 'http://test.example.com';
    items.setQuery = vi.fn(() => items);
    items.fetch = vi.fn();

    channel = Radio.channel('beets');

    router = new BeetsRouter({ items });
  });

  afterEach(() => {
    if (history.started) {
      history.stop();
    }
    vi.restoreAllMocks();
  });

  it('should initialize with items and beetsChannel', () => {
    expect(router.items).toBe(items);
    expect(router.beetsChannel).toBe(channel);
  });

  it('should have correct routes defined', () => {
    const routes = router.routes;
    expect(routes).toEqual({
      'item/query/:query': 'itemQuery',
      player: 'playerRoute',
      queue: 'queueRoute',
      profile: 'profileRoute',
    });
  });

  describe('itemQuery', () => {
    it('should encode query and fetch items', () => {
      router.itemQuery('test query');

      expect(items.setQuery).toHaveBeenCalledWith('test/query');
      expect(items.fetch).toHaveBeenCalled();
    });

    it('should handle single word query', () => {
      router.itemQuery('single');

      expect(items.setQuery).toHaveBeenCalledWith('single');
      expect(items.fetch).toHaveBeenCalled();
    });

    it('should handle empty query', () => {
      router.itemQuery('');

      expect(items.setQuery).toHaveBeenCalledWith('');
      expect(items.fetch).toHaveBeenCalled();
    });
  });

  describe('playerRoute', () => {
    it('should trigger route:player event on beetsChannel', () => {
      const triggerSpy = vi.spyOn(channel, 'trigger');

      router.playerRoute();

      expect(triggerSpy).toHaveBeenCalledWith('route:player');
    });
  });

  describe('queueRoute', () => {
    it('should trigger route:queue event on beetsChannel', () => {
      const triggerSpy = vi.spyOn(channel, 'trigger');

      router.queueRoute();

      expect(triggerSpy).toHaveBeenCalledWith('route:queue');
    });
  });

  describe('profileRoute', () => {
    it('should trigger route:profile event on beetsChannel', () => {
      const triggerSpy = vi.spyOn(channel, 'trigger');

      router.profileRoute();

      expect(triggerSpy).toHaveBeenCalledWith('route:profile');
    });
  });
});

describe('createRouter', () => {
  it('should create a new BeetsRouter instance with items', () => {
    const items = new ItemsCollection();
    const router = createRouter(items, { pushState: false });

    expect(router).toBeInstanceOf(BeetsRouter);
    expect(router.items).toBe(items);
  });

  it('should accept options for router configuration', () => {
    const items = new ItemsCollection();
    const router = createRouter(items, { pushState: false });

    // Router should be properly constructed with given options
    // (Backbone.Router may use them internally)
    expect(router).toBeDefined();
  });
});
