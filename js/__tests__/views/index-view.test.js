import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import IndexView from '../../views/index-view.js';
import { ItemsCollection } from '../../collections/items.js';

describe('IndexView', () => {
  let view;
  let showChildViewSpy;
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
    view = new IndexView(options);
    showChildViewSpy = vi.spyOn(view, 'showChildView');
    view.render();
  });

  afterEach(() => {
    if (view) {
      view.destroy();
    }
    vi.restoreAllMocks();
  });

  it('should construct HeaderView, MainView, and FooterView', () => {
    expect(view.headerView).toBeDefined();
    expect(view.mainView).toBeDefined();
    expect(view.footerView).toBeDefined();
  });

  it('should show each child view in the correct regions', () => {
    expect(showChildViewSpy).toHaveBeenCalledTimes(3);

    const regionCalls = {
      header: false,
      main: false,
      footer: false,
    };

    showChildViewSpy.mock.calls.forEach(([regionName, childView]) => {
      regionCalls[regionName] = true;
      expect(childView).toBeDefined();
    });

    expect(regionCalls.header).toBe(true);
    expect(regionCalls.main).toBe(true);
    expect(regionCalls.footer).toBe(true);
  });
});
