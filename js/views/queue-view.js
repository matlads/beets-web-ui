import { View } from "backbone.marionette";
import { template } from "underscore";
import { Radio } from "backbone";

import { items } from "../collections/items.js";

const QueueView = View.extend({
  template: template(`Queue Go here`),
  className: "border",
  initialize() {
    this.beetsChannel = Radio.channel("beets");
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
