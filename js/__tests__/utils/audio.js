import { vi } from 'vitest';

let originalPlay = null;
let originalPause = null;

export function stubAudio() {
  if (!originalPlay) {
    originalPlay = HTMLMediaElement.prototype.play;
  }
  if (!originalPause) {
    originalPause = HTMLMediaElement.prototype.pause;
  }

  HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve());
  HTMLMediaElement.prototype.pause = vi.fn();
}

export function restoreAudio() {
  if (originalPlay) {
    HTMLMediaElement.prototype.play = originalPlay;
    originalPlay = null;
  }
  if (originalPause) {
    HTMLMediaElement.prototype.pause = originalPause;
    originalPause = null;
  }
}
