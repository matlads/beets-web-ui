import Item from "../models/item.js";
import { items } from "../collections/items.js";

const SearchResultsView = Marionette.View.extend({
  template: _.template(`
    <div>
      <h1><%= title %></h1>
      <h2><%= album %></h2>
    </div>
    <div>
      <i class="bi bi-person"></i>
      <%= artist %>
      •
      <%= year %>
    </div>
    <hr/>
    <div class='lyrics'>
    <%= lyrics %>
    </div>
  `),
  className: "border",
  beetsEvents: {
    "item:selected": "doShowItemDetails",
  },
  initialize() {
    this.beetsChannel = Backbone.Radio.channel("beets");
    this.bindEvents(this.beetsChannel, this.beetsEvents);
    this.model = new Item();
  },
  doShowItemDetails(model) {
    this.model = model;
    this.render();
  },
});

export default SearchResultsView;
