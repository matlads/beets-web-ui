import BaseView from './base-view.js';
import { template } from 'underscore';
import { SearchIcon } from '../icons.js';

const ENTER_KEY = 13;

const SearchView = BaseView.extend({
  template: template(`
        <input type="text" class="form-control search-view__input" placeholder="Search...">
        <img class="search-view__icon" src="${SearchIcon}" />
    `),

  className: 'search-view__container',

  ui: {
    searchInput: '.search-view__input',
  },

  beetsEvents: {
    'item:search': 'onItemSearch',
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
    const $searchInput = this.getUI('searchInput');
    $searchInput.val(query);
    this.navigateRouter(query);
  },

  onSearchIconClicked(_view, _event) {
    const $searchInput = this.getUI('searchInput');
    const query = $searchInput.val();
    this.navigateRouter(query);
  },

  navigateRouter(query) {
    this.options.router.navigate('item/query/' + encodeURIComponent(query), true);
  },
});

export default SearchView;
