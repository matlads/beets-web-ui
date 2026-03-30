import BaseView from "./base-view.js";
import { template } from "underscore";

import Item from "../models/item.js";

const CurrentlyPlayingView = BaseView.extend({
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
    BaseView.prototype.initialize.apply(this, arguments);
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
