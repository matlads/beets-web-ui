import Item from "../models/item.js";
const ItemsCollection = Backbone.Collection.extend({
  model: Item,
  parse: function (data) {
    return data.items || data.results;
  },
});

const items = new ItemsCollection();

export { items };
