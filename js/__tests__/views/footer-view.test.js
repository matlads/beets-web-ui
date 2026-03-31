import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import FooterView from '../../views/footer-view.js';

describe('FooterView', () => {
  let view;
  let showChildViewSpy;

  beforeEach(() => {
    view = new FooterView({
      settings: { dataUrl: 'http://test.example.com' },
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

  it('should show PlayerView and CurrentlyPlayingView in correct regions', () => {
    expect(showChildViewSpy).toHaveBeenCalledTimes(2);

    const playerCall = showChildViewSpy.mock.calls.find((call) => call[0] === 'player');
    expect(playerCall).toBeDefined();
    expect(playerCall[1]).toBeDefined();

    const currentlyPlayingCall = showChildViewSpy.mock.calls.find(
      (call) => call[0] === 'currentlyPlaying'
    );
    expect(currentlyPlayingCall).toBeDefined();
    expect(currentlyPlayingCall[1]).toBeDefined();
  });
});
