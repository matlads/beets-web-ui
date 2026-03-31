import { describe, it, expect } from 'vitest';
import Item from '../../models/item.js';

describe('Item', () => {
  it('should have correct defaults', () => {
    const item = new Item();
    expect(item.get('title')).toBe('N/A');
    expect(item.get('album')).toBe('N/A');
    expect(item.get('artist')).toBe('N/A');
    expect(item.get('year')).toBeNull();
    expect(item.get('duration')).toBe(0);
    expect(item.get('lyrics')).toBeNull();
    expect(item.get('active')).toBe(false);
  });

  it('should allow constructor overrides', () => {
    const item = new Item({
      title: 'Test Song',
      album: 'Test Album',
      artist: 'Test Artist',
      year: 2023,
      duration: 180,
      lyrics: 'Test lyrics',
      active: true,
    });
    expect(item.get('title')).toBe('Test Song');
    expect(item.get('album')).toBe('Test Album');
    expect(item.get('artist')).toBe('Test Artist');
    expect(item.get('year')).toBe(2023);
    expect(item.get('duration')).toBe(180);
    expect(item.get('lyrics')).toBe('Test lyrics');
    expect(item.get('active')).toBe(true);
  });

  it('should allow set and get', () => {
    const item = new Item();
    item.set('title', 'New Title');
    expect(item.get('title')).toBe('New Title');

    item.set({ album: 'New Album', year: 2024 });
    expect(item.get('album')).toBe('New Album');
    expect(item.get('year')).toBe(2024);
  });
});
