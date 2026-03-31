import { afterEach, vi } from 'vitest';

import 'backbone.radio';
import $ from 'jquery';
import { clearDOM } from './utils/dom.js';
import { resetRadioChannels } from './utils/radio.js';
import { stopHistory } from './utils/history.js';
import { restoreSync } from './utils/sync.js';
import { restoreAudio } from './utils/audio.js';

// Clear DOM after each test
afterEach(() => {
  clearDOM();
});

// Reset Backbone.Radio channels after each test
afterEach(() => {
  resetRadioChannels();
});

// Reset Backbone.history if started
afterEach(() => {
  stopHistory();
});

// Restore mocks after each test
afterEach(() => {
  restoreSync();
  restoreAudio();
  vi.restoreAllMocks();
});

// Global test utilities
global.jQuery = $;
global.$ = $;
