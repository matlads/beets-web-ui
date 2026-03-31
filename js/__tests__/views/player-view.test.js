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

  it('should render as div container with custom controls', () => {
    expect(view.el.tagName).toBe('DIV');
    expect(view.el.classList.contains('player-container')).toBe(true);
    const audioElement = view.el.querySelector('#audio-element');
    expect(audioElement).toBeTruthy();
    expect(audioElement.tagName).toBe('AUDIO');
    expect(audioElement.style.display).toBe('none');
    expect(view.el.querySelector('#play-pause-btn')).toBeTruthy();
    expect(view.el.querySelector('#progress-bar')).toBeTruthy();
    expect(view.el.querySelector('#volume-slider')).toBeTruthy();
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

    const audioElement = view.el.querySelector('#audio-element');
    expect(audioElement.src).toBe('http://test.example.com/item/456/file');
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
