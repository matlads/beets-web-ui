import { vi } from 'vitest';
import Backbone from 'backbone';

let originalSync = null;

export function mockSyncSuccess(responseData, delay = 0) {
  if (!originalSync) {
    originalSync = Backbone.sync;
  }
  Backbone.sync = vi.fn((method, model, options) => {
    if (delay > 0) {
      setTimeout(() => {
        options.success && options.success(responseData);
      }, delay);
    } else {
      options.success && options.success(responseData);
    }
    return Promise.resolve(responseData);
  });
}

export function mockSyncError(error, delay = 0) {
  if (!originalSync) {
    originalSync = Backbone.sync;
  }
  Backbone.sync = vi.fn((method, model, options) => {
    if (delay > 0) {
      setTimeout(() => {
        options.error && options.error(error);
      }, delay);
    } else {
      options.error && options.error(error);
    }
    return Promise.reject(error);
  });
}

export function restoreSync() {
  if (originalSync) {
    Backbone.sync = originalSync;
    originalSync = null;
  }
}
