import IndexView from "./views/index-view.js";
import { items } from "./collections/items.js";

const App = Marionette.Application.extend({
  region: "#app",

  onBeforeStart(app, options) {
    const beetsApi = options.settings.dataUrl;
    items.url = `${beetsApi}/item/query/`;
    items.fetch();
  },

  onStart(app, options) {
    const indexView = new IndexView(options);

    this.showView(indexView);

    Backbone.history.start();
  },
});

export default App;
