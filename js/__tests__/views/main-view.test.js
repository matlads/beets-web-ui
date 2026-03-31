import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import MainView from '../../views/main-view.js';
import { ItemsCollection } from '../../collections/items.js';

describe('MainView', () => {
  let view;
  let items;
  let options;

  beforeEach(() => {
    items = new ItemsCollection();
    items.baseUrl = 'http://test.example.com';
    options = {
      items,
      router: { navigate: vi.fn() },
      settings: { dataUrl: 'http://test.example.com' },
      user: { name: 'Test' },
    };
    view = new MainView(options);
    view.render();
  });

  afterEach(() => {
    if (view) {
      view.destroy();
    }
  });

  it('should construct LocalFilesView, SearchResultsView, QueueView, and SearchView', () => {
    expect(view.localFilesView).toBeDefined();
    expect(view.searchResultsView).toBeDefined();
    expect(view.queueView).toBeDefined();
    expect(view.searchView).toBeDefined();
  });

  it('should show each child view in the correct regions', () => {
    expect(view.getRegion('searchRegion').hasView()).toBe(true);
    expect(view.getRegion('localFileRegion').hasView()).toBe(true);
    expect(view.getRegion('searchResultsRegion').hasView()).toBe(true);
    expect(view.getRegion('queueRegion').hasView()).toBe(true);
  });
});
