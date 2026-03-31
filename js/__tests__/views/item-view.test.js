import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import ItemView from '../../views/item-view.js';
import Item from '../../models/item.js';
import { Radio } from 'backbone';
import 'backbone.radio';
import { PlayIcon, PauseIcon } from '../../icons.js';

describe('ItemView', () => {
  let view;
  let model;
  let channel;

  beforeEach(() => {
    model = new Item({
      title: 'Test Song',
      album: 'Test Album',
      artist: 'Test Artist',
      year: 2023,
      duration: 180,
    });
    channel = Radio.channel('beets');
    view = new ItemView({ model });
    view.render();
  });

  afterEach(() => {
    if (view) {
      view.destroy();
    }
  });

  it('should render title, album, and artist content', () => {
    expect(view.el.textContent).toContain('Test Song');
    expect(view.el.textContent).toContain('Test Album');
    expect(view.el.textContent).toContain('Test Artist');
  });

  it('should trigger item:selected when info button clicked', () => {
    const triggerSpy = vi.spyOn(channel, 'trigger');
    const infoButton = view.el.querySelector('.info-square');
    infoButton.click();
    expect(triggerSpy).toHaveBeenCalledWith('item:selected', model);
  });

  it('should trigger item:play when play button clicked', () => {
    const triggerSpy = vi.spyOn(channel, 'trigger');
    const playButton = view.el.querySelector('.play');
    playButton.click();
    expect(triggerSpy).toHaveBeenCalledWith('item:play', model);
  });

  it('should switch icon from play to pause after play', () => {
    const playButton = view.el.querySelector('.play');
    playButton.click();
    expect(view.options.playOrPause).toBe(PauseIcon);
    view.render();
    const img = view.el.querySelector('#playOrPause img');
    expect(img.src).toContain(PauseIcon);
  });

  it('should trigger item:pause when pause button clicked', () => {
    view.el.querySelector('.play').click();
    const pauseButton = view.el.querySelector('.pause');
    const triggerSpy = vi.spyOn(channel, 'trigger');
    pauseButton.click();
    expect(triggerSpy).toHaveBeenCalledWith('item:pause', model);
  });

  it('should switch icon back to play after pause', () => {
    view.el.querySelector('.play').click();
    view.el.querySelector('.pause').click();
    expect(view.options.playOrPause).toBe(PlayIcon);
    view.render();
    const img = view.el.querySelector('#playOrPause img');
    expect(img.src).toContain(PlayIcon);
  });

  it('should trigger item:search with artist when artist link clicked', () => {
    const triggerSpy = vi.spyOn(channel, 'trigger');
    const artistLink = view.el.querySelector('#artist');
    artistLink.click();
    expect(triggerSpy).toHaveBeenCalledWith('item:search', 'artist:Test Artist');
  });

  it('should trigger item:search with album when album link clicked', () => {
    const triggerSpy = vi.spyOn(channel, 'trigger');
    const albumLink = view.el.querySelector('#album');
    albumLink.click();
    expect(triggerSpy).toHaveBeenCalledWith('item:search', 'album:Test Album');
  });
});
