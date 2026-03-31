import BaseView from './base-view.js';
import { template } from 'underscore';

import Item from '../models/item.js';

import { PersonIcon as FilePerson } from '../icons.js';

const SearchResultsView = BaseView.extend({
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
    <div class='search-results-view__lyrics'>
<%= lyrics %>
    </div>
  `),
  className: 'border',
  beetsEvents: {
    'item:selected': 'doShowItemDetails',
    'item:play': 'doShowItemDetails',
  },
  initialize() {
    BaseView.prototype.initialize.apply(this, arguments);
    this.model = new Item();
  },
  doShowItemDetails(model) {
    this.model = model;

    if (!this.model.get('lyrics') && this.model.get('id')) {
      this.fetchItemDetails();
    } else {
      this.render();
    }
  },

  fetchItemDetails() {
    const itemId = this.model.get('id');
    const dataUrl = this.options && this.options.settings && this.options.settings.dataUrl;

    if (!itemId || !dataUrl) {
      this.render();
      return;
    }

    this.model.fetch({
      url: `${dataUrl}/item/${itemId}`,
      success: () => {
        this.render();
      },
      error: () => {
        this.render();
      },
    });
  },
});

export default SearchResultsView;
