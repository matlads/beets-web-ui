import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import QueueView from '../../views/queue-view.js';
import Item from '../../models/item.js';

describe('QueueView', () => {
  let view;

  beforeEach(() => {
    view = new QueueView();
    view.render();
  });

  afterEach(() => {
    if (view) {
      view.destroy();
    }
  });

  it('should show empty state initially', () => {
    const text = view.el.textContent;
    expect(text).toContain('Queue is empty');
    expect(text).toContain('Play a song to add it here');
  });

  it('should prepend items with addToQueue', () => {
    const model1 = new Item({ title: 'First Song', artist: 'Artist1', album: 'Album1' });
    const model2 = new Item({ title: 'Second Song', artist: 'Artist2', album: 'Album2' });

    view.addToQueue(model1);
    view.addToQueue(model2);
    view.render();

    const text = view.el.textContent;
    expect(text).toContain('Second Song');
    expect(text).toContain('First Song');
    expect(text).toContain('Artist1');
    expect(text).toContain('Album1');
  });

  it('should cap queue length at 5', () => {
    for (let i = 1; i <= 7; i++) {
      const model = new Item({ title: `Song ${i}` });
      view.addToQueue(model);
    }

    expect(view.queue.length).toBe(5);
    view.render();

    const text = view.el.textContent;
    expect(text).toContain('Song 7');
    expect(text).toContain('Song 6');
    expect(text).toContain('Song 5');
    expect(text).toContain('Song 4');
    expect(text).toContain('Song 3');
    expect(text).not.toContain('Song 2');
    expect(text).not.toContain('Song 1');
  });

  it('should render item details for non-empty queue', () => {
    const model = new Item({
      title: 'Test Title',
      artist: 'Test Artist',
      album: 'Test Album',
    });

    view.addToQueue(model);
    view.render();

    const text = view.el.textContent;
    expect(text).toContain('Test Title');
    expect(text).toContain('Test Artist');
    expect(text).toContain('Test Album');
    expect(text).not.toContain('Queue is empty');
  });
});
