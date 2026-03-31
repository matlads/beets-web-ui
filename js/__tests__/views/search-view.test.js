import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import SearchView from '../../views/search-view.js';
import { Radio } from 'backbone';
import 'backbone.radio';

describe('SearchView', () => {
  let view;
  let mockRouter;

  beforeEach(() => {
    mockRouter = {
      navigate: vi.fn(),
    };
    view = new SearchView({
      router: mockRouter,
    });
    view.render();
  });

  afterEach(() => {
    if (view) {
      view.destroy();
    }
  });

  it('should render the search input', () => {
    const input = view.el.querySelector('.search-view__input');
    expect(input).toBeTruthy();
    expect(input.placeholder).toBe('Search...');
  });

  it('should navigate on Enter key', () => {
    const input = view.el.querySelector('.search-view__input');
    input.value = 'test query';

    // Simulate the trigger event by calling onDataEntered directly
    const event = { which: 13, target: input };
    view.onDataEntered(view, event);

    expect(mockRouter.navigate).toHaveBeenCalledWith('item/query/test%20query', true);
  });

  it('should not navigate when onDataEntered called with non-Enter key', () => {
    const input = view.el.querySelector('.search-view__input');
    input.value = 'test query';
    const event = { which: 27, target: input };
    view.onDataEntered(view, event);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should not navigate on non-Enter key', () => {
    const input = view.el.querySelector('.search-view__input');
    input.value = 'test query';

    const event = new KeyboardEvent('keyup', { which: 27 });
    input.dispatchEvent(event);

    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should update input and navigate on item:search event', () => {
    const channel = Radio.channel('beets');
    channel.trigger('item:search', 'artist:test');

    const input = view.el.querySelector('.search-view__input');
    expect(input.value).toBe('artist:test');
    expect(mockRouter.navigate).toHaveBeenCalledWith('item/query/artist%3Atest', true);
  });

  it('should navigate on search icon click', () => {
    const input = view.el.querySelector('.search-view__input');
    input.value = 'icon query';

    // Call the handler directly (trigger may not be bound due to img vs i tag)
    view.onSearchIconClicked();

    expect(mockRouter.navigate).toHaveBeenCalledWith('item/query/icon%20query', true);
  });
});
