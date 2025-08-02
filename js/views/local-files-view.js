import ItemView from "./item-view.js";
import { items } from "../collections/items.js";

const LocalFilesView = Marionette.CollectionView.extend({
  className: "border",
  childView: ItemView,

  initialize() {
    this.currentItem = null;

    this.beetsChannel = Backbone.Radio.channel("beets");
    this.bindEvents(this.beetsChannel, this.beetsEvents);
  },
  beetsEvents: {
    "item:play": "doPlay",
    "play:ended": "playNext",
    "play:pause": "doPause",
  },

  onBeforeRender() {
    this.collection = items;
  },

  doPlay(model) {
    var that = this;
    this.currentItem = model;
    this.children.each(function (childView) {
      if (childView.model !== model) {
        childView.resetView();
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
      this.beetsChannel.trigger("item:play", nextChild.model.get("id"));
    }
  },
});

export default LocalFilesView;
