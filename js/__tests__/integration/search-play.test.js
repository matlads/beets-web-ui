import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Radio } from 'backbone';
import 'backbone.radio';
import { history } from 'backbone';

import { ItemsCollection } from '../../collections/items.js';
import { BeetsRouter } from '../../routers/beets-router.js';
import SearchView from '../../views/search-view.js';
import SearchResultsView from '../../views/search-results-view.js';
import PlayerView from '../../views/player-view.js';
import { mockSyncSuccess } from '../utils/sync.js';
import { stubAudio, restoreAudio } from '../utils/audio.js';

describe('Integration: Search and Play Flow', () => {
  let channel;
  let items;
  let router;
  let searchView;
  let searchResultsView;
  let playerView;
  const settings = { dataUrl: 'http://test.example.com' };

  beforeEach(() => {
    channel = Radio.channel('beets');

    items = new ItemsCollection();
    items.baseUrl = settings.dataUrl;

    router = new BeetsRouter({ items });

    const options = { router, items, settings };
    searchView = new SearchView({ router });
    searchResultsView = new SearchResultsView(options);
    playerView = new PlayerView(options);

    playerView.bindEvents(playerView.beetsChannel, playerView.beetsEvents);

    stubAudio();

    searchView.render();
    searchResultsView.render();
    playerView.render();

    if (history.started) {
      history.stop();
    }
  });

  afterEach(() => {
    if (history.started) {
      history.stop();
    }
    restoreAudio();
    vi.restoreAllMocks();
  });

  it('playerView should respond to item:play channel event', () => {
    const model = items.at(0) || new ItemsCollection.prototype.model({ id: 999 });
    const playSpy = vi.spyOn(playerView, 'play');
    playerView.beetsChannel.trigger('item:play', model);
    expect(playSpy).toHaveBeenCalled();
    expect(playerView.model).toBe(model);
  });

  it('should search for a query and play a result', async () => {
    const mockResults = {
      items: [
        { id: 1, title: 'Test Song', album: 'Test Album', artist: 'Test Artist', duration: 180 },
      ],
    };
    mockSyncSuccess(mockResults);

    router.itemQuery('test query');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(items.length).toBe(1);
    const model = items.at(0);
    expect(model.get('title')).toBe('Test Song');

    expect(searchResultsView.model.get('title')).toBe('N/A');

    channel.trigger('item:selected', model);

    expect(searchResultsView.model).toBe(model);
    expect(searchResultsView.model.get('title')).toBe('Test Song');

    const playSpy = vi.spyOn(playerView, 'play');
    channel.trigger('item:play', model);
    expect(playSpy).toHaveBeenCalled();
    expect(playerView.model).toBe(model);
  });
});
