import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import HeaderView from '../../views/header-view.js';

describe('HeaderView', () => {
  let view;
  let showChildViewSpy;

  beforeEach(() => {
    view = new HeaderView({
      user: { name: 'Test User' },
    });
    showChildViewSpy = vi.spyOn(view, 'showChildView');
    view.render();
  });

  afterEach(() => {
    if (view) {
      view.destroy();
    }
    vi.restoreAllMocks();
  });

  it('should show ProfileView in profileRegion', () => {
    expect(showChildViewSpy).toHaveBeenCalledWith('profileRegion', expect.any(Object));
    const call = showChildViewSpy.mock.calls.find((call) => call[0] === 'profileRegion');
    expect(call).toBeDefined();
    const childView = call[1];
    expect(childView).toBeDefined();
  });
});
