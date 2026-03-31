import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import PlayerView from '../../views/player-view.js';
import Item from '../../models/item.js';
import { stubAudio, restoreAudio } from '../utils/audio.js';

describe('PlayerView', () => {
  let view;

  beforeEach(() => {
    view = new PlayerView({
      settings: {
        dataUrl: 'http://test.example.com',
      },
    });
    view.render();
    stubAudio();
  });

  afterEach(() => {
    if (view) {
      view.destroy();
    }
    restoreAudio();
  });

  it('should render as audio element with controls', () => {
    expect(view.el.tagName).toBe('AUDIO');
    expect(view.el.hasAttribute('controls')).toBe(true);
  });

  it('should store model and call play on doPlay', () => {
    const model = new Item({ id: 123, title: 'Test Song' });

    view.doPlay(model);

    expect(view.model).toBe(model);
    expect(view.model.get('id')).toBe(123);
  });

  it('should set src and call play when play() is called', () => {
    const model = new Item({ id: 456 });
    view.model = model;

    view.play();

    expect(view.el.src).toBe('http://test.example.com/item/456/file');
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  it('should call pause on doPause', () => {
    view.doPause();
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  });

  it('should trigger play:ended on ended event', () => {
    const triggerSpy = vi.spyOn(view.beetsChannel, 'trigger');

    view.onEnded();

    expect(triggerSpy).toHaveBeenCalledWith('play:ended');
  });
});
