import IndexView from "./views/index-view.js";
import { items } from "./collections/items.js";

const App = Marionette.Application.extend({
  region: "#app",

  onBeforeStart(app, options) {
    const beetsApi = options.settings.dataUrl;
    items.baseUrl = options.settings.dataUrl;
    items.setQuery().fetch();
    items.fetch();
  },

  onStart(app, options) {
    const indexView = new IndexView(options);

    this.showView(indexView);

    Backbone.history.start();
  },
});

export default App;
