import { View } from "backbone.marionette";
import { template } from "underscore";
import { Radio } from "backbone";

import Item from "../models/item.js";

import FilePerson from '../../icons/person.svg';

const SearchResultsView = View.extend({
  template: template(`
    <div>
      <h1><%= title %></h1>
      <h2><%= album %></h2>
    </div>
    <div>
      <img src="${FilePerson}" />
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
    this.beetsChannel = Radio.channel("beets");
    this.bindEvents(this.beetsChannel, this.beetsEvents);
    this.model = new Item();
  },
  doShowItemDetails(model) {
    this.model = model;
    this.render();
  },
});

export default SearchResultsView;
