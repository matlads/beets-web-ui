import ItemView from "./item-view.js";
import { items } from "../collections/items.js";

const LocalFilesView = Marionette.CollectionView.extend({
  className: 'border',
  childView: ItemView,

  initialize() {
    this.beetsChannel = Backbone.Radio.channel('beets');
    this.bindEvents(this.beetsChannel, this.beetsEvents);
  },
  beetsEvents: {
    'item:play': 'markActive',
  },

  onBeforeRender() {
    this.collection = items;
  },

  markActive(itemId) {
    this.children.each(function (child) {
      if (child.model.get('id') == itemId) {
        child.model.active = true;
        child.$el.addClass('text-bg-success');
      } else {
        child.model.active = false;
        child.$el.removeClass('text-bg-success');
      }
    });
  },

});

export default LocalFilesView;
