import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import SearchResultsView from '../../views/search-results-view.js';
import Item from '../../models/item.js';
import { mockSyncSuccess, mockSyncError, restoreSync } from '../utils/sync.js';

describe('SearchResultsView', () => {
  let view;
  beforeEach(() => {
    view = new SearchResultsView({
      settings: {
        dataUrl: 'http://test.example.com',
      },
    });
  });

  afterEach(() => {
    if (view) {
      view.destroy();
    }
    restoreSync();
  });

  it('should initialize with an Item model', () => {
    expect(view.model).toBeInstanceOf(Item);
  });

  it('should render without fetch when model has lyrics', () => {
    const modelWithLyrics = new Item({
      title: 'Song With Lyrics',
      lyrics: 'These are the lyrics',
    });

    view.doShowItemDetails(modelWithLyrics);
    view.render();

    expect(view.el.textContent).toContain('Song With Lyrics');
    expect(view.el.textContent).toContain('These are the lyrics');
  });

  it('should fetch from dataUrl when model has id but no lyrics', () => {
    const modelWithId = new Item({
      id: 123,
      title: 'Song Without Lyrics',
    });

    mockSyncSuccess({
      id: 123,
      title: 'Song Without Lyrics',
      lyrics: 'Fetched lyrics',
    });

    view.doShowItemDetails(modelWithId);

    expect(view.model.get('id')).toBe(123);
  });

  it('should render without fetch when missing id', () => {
    const modelWithoutId = new Item({
      title: 'Song Without ID',
    });

    view.doShowItemDetails(modelWithoutId);
    view.render();

    expect(view.el.textContent).toContain('Song Without ID');
  });

  it('should render without fetch when missing dataUrl', () => {
    const viewWithoutDataUrl = new SearchResultsView();
    const modelWithId = new Item({ id: 123, title: 'Test' });

    viewWithoutDataUrl.doShowItemDetails(modelWithId);
    viewWithoutDataUrl.render();

    expect(viewWithoutDataUrl.el.textContent).toContain('Test');
  });

  it('should render after successful fetch', () => {
    const modelWithId = new Item({
      id: 456,
      title: 'Original Title',
    });

    mockSyncSuccess({
      id: 456,
      title: 'Updated Title',
      lyrics: 'New lyrics',
    });

    view.doShowItemDetails(modelWithId);
    expect(view.model.get('id')).toBe(456);
  });

  it('should render after fetch error', () => {
    const modelWithId = new Item({
      id: 789,
      title: 'Error Song',
    });

    mockSyncError(new Error('Network error'));

    view.doShowItemDetails(modelWithId);
    expect(view.model.get('id')).toBe(789);
  });
});
