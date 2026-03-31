import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { View, CollectionView } from 'backbone.marionette';
import LocalFilesView from '../../views/local-files-view.js';
import { ItemsCollection } from '../../collections/items.js';
import { Radio } from 'backbone';
import 'backbone.radio';

describe('LocalFilesView', () => {
  let view;
  let items;
  let channel;

  beforeEach(() => {
    items = new ItemsCollection();
    items.baseUrl = 'http://test.example.com';
    items.reset([
      { id: 1, title: 'Song 1', artist: 'Artist 1' },
      { id: 2, title: 'Song 2', artist: 'Artist 2' },
      { id: 3, title: 'Song 3', artist: 'Artist 3' },
    ]);

    channel = Radio.channel('beets');

    // Mock ItemView to avoid complexity
    const MockItemView = View.extend({
      render: vi.fn(() => this),
      triggerPlay: vi.fn(),
      resetView: vi.fn(),
    });

    const TestLocalFilesView = LocalFilesView.extend({
      childView: MockItemView,
    });

    view = new TestLocalFilesView({ items });
    view.render();
  });

  afterEach(() => {
    if (view) {
      view.destroy();
    }
    vi.restoreAllMocks();
  });

  it('should set collection from options.items in onBeforeRender', () => {
    expect(view.collection).toBe(items);
  });

  it('should create beetsChannel and have beetsEvents defined', () => {
    expect(view.beetsChannel).toBe(channel);
    expect(view.beetsEvents).toEqual({
      'item:play': 'doPlay',
      'play:ended': 'playNext',
      'play:pause': 'doPause',
    });
  });

  it('should set currentItem on doPlay', () => {
    const model = items.at(0);
    view.doPlay(model);
    expect(view.currentItem).toBe(model);
  });

  it('should play next song when playNext is called with current item in collection', () => {
    const model = items.at(0);
    view.currentItem = model;

    // Spy on children methods to verify behavior
    const nextChild = view.children.findByIndex(1);
    const triggerSpy = vi.spyOn(nextChild, 'triggerPlay');

    view.playNext();

    expect(triggerSpy).toHaveBeenCalled();
  });

  it('should not play next if current item not in collection', () => {
    view.currentItem = { id: 99 };

    // Spy on first child to ensure triggerPlay not called
    const child = view.children.findByIndex(0);
    const triggerSpy = vi.spyOn(child, 'triggerPlay');

    view.playNext();

    expect(triggerSpy).not.toHaveBeenCalled();
  });

  it('should not play next if current item found but index is -1', () => {
    const model = items.at(0);
    view.currentItem = model;

    // Mock children methods to simulate edge case
    const mockChild = { triggerPlay: vi.fn() };
    const originalChildren = view.children;
    view.children = {
      findByModel: vi.fn(() => mockChild),
      findIndexByView: vi.fn(() => -1),
      findByIndex: vi.fn(),
    };

    view.playNext();

    expect(view.children.findByModel).toHaveBeenCalledWith(model);
    expect(view.children.findIndexByView).toHaveBeenCalledWith(mockChild);
    expect(view.children.findByIndex).not.toHaveBeenCalled();
    expect(mockChild.triggerPlay).not.toHaveBeenCalled();

    // Restore children to avoid destruction errors
    view.children = originalChildren;
  });

  it('should not play next if current item found but index is undefined', () => {
    const model = items.at(0);
    view.currentItem = model;

    const mockChild = { triggerPlay: vi.fn() };
    const originalChildren = view.children;
    view.children = {
      findByModel: vi.fn(() => mockChild),
      findIndexByView: vi.fn(() => undefined),
      findByIndex: vi.fn(),
    };

    view.playNext();

    expect(view.children.findByModel).toHaveBeenCalledWith(model);
    expect(view.children.findIndexByView).toHaveBeenCalledWith(mockChild);
    expect(view.children.findByIndex).not.toHaveBeenCalled();
    expect(mockChild.triggerPlay).not.toHaveBeenCalled();

    view.children = originalChildren;
  });

  it('should handle missing CollectionView.prototype.initialize', () => {
    const originalInitialize = CollectionView.prototype.initialize;
    CollectionView.prototype.initialize = undefined;

    try {
      const TestView = LocalFilesView.extend({});
      const testView = new TestView({ items });
      expect(testView.beetsChannel).toBeDefined();
    } finally {
      CollectionView.prototype.initialize = originalInitialize;
    }
  });

  it('should handle missing beetsEvents', () => {
    const TestView = LocalFilesView.extend({});
    delete TestView.prototype.beetsEvents;
    const testView = new TestView({ items });
    expect(testView.beetsChannel).toBeDefined();
  });

  it('should handle null beetsEvents', () => {
    const TestView = LocalFilesView.extend({ beetsEvents: null });
    const testView = new TestView({ items });
    expect(testView.beetsChannel).toBeDefined();
  });

  it('should not play next if current item is last in collection', () => {
    const model = items.at(2);
    view.currentItem = model;

    const nextChild = view.children.findByIndex(3);
    expect(nextChild).toBeUndefined();
    const triggerSpy = vi.spyOn(view.children, 'findByIndex');

    view.playNext();

    expect(triggerSpy).toHaveBeenCalledWith(3);
  });
});
