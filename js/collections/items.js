import { Collection } from "backbone";
import Item from "../models/item.js";

const ItemsCollection = Collection.extend({
  model: Item,
  baseUrl: null,
  parse: function (data) {
    return data.items || data.results;
  },
  setQuery(query = "") {
    this.url = `${this.baseUrl}/item/query/${query}`;
    this.trigger("items:setQuery");
    return this;
  },
  
  fetch: function(options = {}) {
    this.trigger('items:fetch:start');
    
    const success = options.success;
    const error = options.error;
    
    options.success = (collection, response, opts) => {
      this.trigger('items:fetch:success', collection, response, opts);
      if (success) success(collection, response, opts);
    };
    
    options.error = (collection, response, opts) => {
      this.trigger('items:fetch:error', collection, response, opts);
      if (error) error(collection, response, opts);
    };
    
    return Collection.prototype.fetch.call(this, options);
  },
});

const items = new ItemsCollection();

export { items };
