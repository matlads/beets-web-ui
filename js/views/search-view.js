import { items } from "../collections/items.js";

const ENTER_KEY = 13;

const SearchView = Marionette.View.extend({
  template: _.template(`
        <input type="text" class="form-control search-input" placeholder="Search...">
        <i class="bi bi-search search-icon"></i>
    `),

  className: "search-container",

  ui: {
    searchInput: ".search-input",
  },

  events: {
    keydown: "keyAction",
  },

  beetsEvents: {
    "item:search": "onItemSearch",
  },

  initialize() {
    this.beetsChannel = Backbone.Radio.channel("beets");
    this.bindEvents(this.beetsChannel, this.beetsEvents);
  },

  keyAction(e) {
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
});

export default SearchView;
