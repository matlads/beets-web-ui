import { items } from "../collections/items.js";
const QueueView = Marionette.View.extend({
  template: _.template(`Queue Go here`),
  className: "border",
  initialize() {
    this.beetsChannel = Backbone.Radio.channel("beets");
    this.bindEvents(this.beetsChannel, this.beetsEvents);
  },
  beetsEvents: {
    "item:play": "doPlay",
  },
  doPlay(itemId) {
    this.model = items.findWhere({ id: itemId });
  },
});

export default QueueView;
