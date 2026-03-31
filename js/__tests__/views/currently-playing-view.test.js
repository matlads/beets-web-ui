import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import CurrentlyPlayingView from '../../views/currently-playing-view.js';
import Item from '../../models/item.js';

describe('CurrentlyPlayingView', () => {
  let view;

  beforeEach(() => {
    view = new CurrentlyPlayingView();
    view.render();
  });

  afterEach(() => {
    if (view) {
      view.destroy();
    }
  });

  it('should update title and artist on item:play', () => {
    const model = new Item({
      title: 'Playing Song',
      artist: 'Playing Artist',
    });

    view.doPlay(model);
    view.render();

    const text = view.el.textContent;
    expect(text).toContain('Playing Song');
    expect(text).toContain('Playing Artist');
  });
});
