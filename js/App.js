import { Application } from 'backbone.marionette';
import { history } from 'backbone';
import IndexView from './views/index-view.js';
import { ItemsCollection } from './collections/items.js';
import { createRouter } from './routers/beets-router.js';

const App = Application.extend({
  region: '#app',

  onBeforeStart(app, options) {
    const items = new ItemsCollection();
    items.baseUrl = options.settings.dataUrl;

    const router = createRouter(items);

    options.items = items;
    options.router = router;
  },

  onStart(app, options) {
    const indexView = new IndexView(options);

    this.showView(indexView);

    history.start();
  },
});

export default App;
