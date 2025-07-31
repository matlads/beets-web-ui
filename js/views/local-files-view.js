import ItemView from "./item-view.js";
import { items } from "../collections/items.js";

const LocalFilesView = Marionette.CollectionView.extend({
  className: 'border',
  childView: ItemView,

  initialize() {
    this.currentItem = null;

    this.beetsChannel = Backbone.Radio.channel('beets');
    this.bindEvents(this.beetsChannel, this.beetsEvents);
  },
  beetsEvents: {
    'item:play': 'markActive',
    'play:ended': 'playNext',
  },

  onBeforeRender() {
    this.collection = items;
  },

  markActive(itemId) {
    var that = this;
    this.children.each(function (child) {
      if (child.model.get('id') == itemId) {
        child.model.active = true;
        child.$el.addClass('text-bg-success');
        that.currentItem = child;
      } else {
        child.model.active = false;
        child.$el.removeClass('text-bg-success');
      }
    });
  },

  playNext() {
    const bView = this.currentItem;
    const idx = this.children.findIndexByView(bView);
    if (idx == -1 || idx === undefined) {
      // Not in current list.
      return;
    }
    var nextIdx = idx + 1;
    const nextChild = this.children.findByIndex(nextIdx);
    if (nextChild) {
      this.beetsChannel.trigger('item:play', nextChild.model.get('id'));
    }
  }
});

export default LocalFilesView;
