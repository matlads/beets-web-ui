import { Router } from 'backbone';
import { Radio } from 'backbone';

const BeetsRouter = Router.extend({
  routes: {
    'item/query/:query': 'itemQuery',
    player: 'playerRoute',
    queue: 'queueRoute',
    profile: 'profileRoute',
  },

  initialize: function (options = {}) {
    this.items = options.items;
    this.beetsChannel = Radio.channel('beets');
    Router.prototype.initialize.call(this, options);
  },

  itemQuery: function (query) {
    const queryURL = query.split(/\s+/).map(encodeURIComponent).join('/');
    this.items.setQuery(queryURL).fetch();
  },

  playerRoute: function () {
    this.beetsChannel.trigger('route:player');
  },

  queueRoute: function () {
    this.beetsChannel.trigger('route:queue');
  },

  profileRoute: function () {
    this.beetsChannel.trigger('route:profile');
  },
});

export { BeetsRouter };

export function createRouter(items, options = {}) {
  return new BeetsRouter({ items, pushState: true, ...options });
}
