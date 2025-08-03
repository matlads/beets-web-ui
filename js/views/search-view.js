import { View } from "backbone.marionette";
import { Radio } from "backbone";
import { template } from "underscore";
import { items } from "../collections/items.js";

import SearchIcon from '../../icons/person.svg';

const ENTER_KEY = 13;

const SearchView = View.extend({
  template: template(`
        <input type="text" class="form-control search-input" placeholder="Search...">
        <img class="search-icon" src="${SearchIcon}" />
    `),

  className: "search-container",

  ui: {
    searchInput: ".search-input",
  },

  beetsEvents: {
    "item:search": "onItemSearch",
  },

  triggers: {
    'keyup input': 'data:entered',
    'click i': 'search:icon:clicked',
  },

  initialize() {
    this.beetsChannel = Radio.channel("beets");
    this.bindEvents(this.beetsChannel, this.beetsEvents);
  },

  onDataEntered(view, e) {
    if (e.which === ENTER_KEY) {
      // perform the search
      const t = e.target.value;
      items.setQuery(t).fetch();
    }
  },

  onItemSearch(searchString) {
    const $searchInput = this.getUI("searchInput");
    $searchInput.val(searchString);
  },

  onSearchIconClicked(view, event) {
    const $searchInput = this.getUI("searchInput");
    const t = $searchInput.val();
    items.setQuery(t).fetch();
  }
});

export default SearchView;
