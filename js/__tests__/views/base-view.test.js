import { describe, it, expect, afterEach, vi } from 'vitest';
import BaseView from '../../views/base-view.js';
import { View } from 'backbone.marionette';
import { Radio } from 'backbone';
import 'backbone.radio';

describe('BaseView', () => {
  let view;

  afterEach(() => {
    if (view) {
      view.destroy();
    }
  });

  it('should create beetsChannel on initialize', () => {
    view = new BaseView();
    expect(view.beetsChannel).toBeDefined();
    expect(view.beetsChannel).toBe(Radio.channel('beets'));
  });

  it('should bind beetsEvents when defined', () => {
    const handler = vi.fn();
    const TestView = BaseView.extend({
      beetsEvents: {
        'test:event': 'onTestEvent',
      },
      onTestEvent: handler,
    });

    view = new TestView();
    view.beetsChannel.trigger('test:event');

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should initialize safely without beetsEvents', () => {
    const TestView = BaseView.extend({});
    view = new TestView();
    expect(view.beetsChannel).toBeDefined();
  });

  it('should handle missing View.prototype.initialize', () => {
    const originalInitialize = View.prototype.initialize;
    View.prototype.initialize = undefined;

    try {
      const TestView = BaseView.extend({});
      view = new TestView();
      expect(view.beetsChannel).toBeDefined();
    } finally {
      View.prototype.initialize = originalInitialize;
    }
  });

  it('should remove listeners when destroyed', () => {
    const handler = vi.fn();
    const TestView = BaseView.extend({
      beetsEvents: {
        'test:event': 'onTestEvent',
      },
      onTestEvent: handler,
    });

    view = new TestView();
    view.destroy();

    view.beetsChannel.trigger('test:event');
    expect(handler).not.toHaveBeenCalled();
  });
});
