import { CollectionView } from 'backbone.marionette';
import { Radio } from 'backbone';

import ItemView from './item-view.js';

const LocalFilesView = CollectionView.extend({
  className: 'border',
  childView: ItemView,

  initialize() {
    if (CollectionView.prototype.initialize) {
      CollectionView.prototype.initialize.apply(this, arguments);
    }

    this.currentItem = null;
    this.beetsChannel = Radio.channel('beets');

    if (this.beetsEvents) {
      this.bindEvents(this.beetsChannel, this.beetsEvents);
    }
  },
  beetsEvents: {
    'item:play': 'doPlay',
    'play:ended': 'playNext',
    'play:pause': 'doPause',
  },

  onBeforeRender() {
    this.collection = this.options.items;
  },

  doPlay(model) {
    this.currentItem = model;
    this.children.each(function (childView) {
      if (childView.model !== model) {
        childView.resetView();
      }
    });
  },

  playNext() {
    const bView = this.children.findByModel(this.currentItem);
    if (bView) {
      const idx = this.children.findIndexByView(bView);
      if (idx == -1 || idx === undefined) {
        // Not in current list.
        return;
      }
      const nextIdx = idx + 1;
      const nextChild = this.children.findByIndex(nextIdx);
      if (nextChild) {
        nextChild.triggerPlay();
      }
    }
  },
});

export default LocalFilesView;
