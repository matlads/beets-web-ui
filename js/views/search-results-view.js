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
    <div class='lyrics'>
<%= lyrics %>
    </div>
  `),
  className: 'border',
  beetsEvents: {
    'item:selected': 'doShowItemDetails',
  },
  initialize() {
    BaseView.prototype.initialize.apply(this, arguments);
    this.model = new Item();
  },
  doShowItemDetails(model) {
    this.model = model;
    this.render();
  },
});

export default SearchResultsView;
