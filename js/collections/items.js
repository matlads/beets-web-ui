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
});

const items = new ItemsCollection();

export { items };
