import { View } from "backbone.marionette";
import { template } from "underscore";
import { Radio } from "backbone";

import Item from "../models/item.js";

const CurrentlyPlayingView = View.extend({
  template: template(`
        <div class="card-body">
            <p class="card-text">
                <small><%= title %></small>
                <small class="text-muted"><%= artist %></small>
            </p>
        </div>
    `),
  className: "card",
  initialize() {
    this.beetsChannel = Radio.channel("beets");
    this.bindEvents(this.beetsChannel, this.beetsEvents);
    this.model = new Item();
  },
  beetsEvents: {
    "item:play": "doPlay",
  },
  doPlay(model) {
    this.model = model;
    this.render();
  },
});

export default CurrentlyPlayingView;
