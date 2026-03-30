import BaseView from "./base-view.js";
import { template } from "underscore";
import { router } from "../routers/beets-router.js";
import { SearchIcon } from "../icons.js";

const ENTER_KEY = 13;

const SearchView = BaseView.extend({
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

  onDataEntered(view, e) {
    if (e.which === ENTER_KEY) {
      const query = e.target.value;
      this.navigateRouter(query);
    }
  },

  onItemSearch(query) {
    const $searchInput = this.getUI("searchInput");
    $searchInput.val(query);
    this.navigateRouter(query);
  },

  onSearchIconClicked(view, event) {
    const $searchInput = this.getUI("searchInput");
    const query = $searchInput.val();
    this.navigateRouter(query);
  },

  navigateRouter(query) {
    router.navigate('item/query/' + encodeURIComponent(query), true);
  }
});

export default SearchView;
