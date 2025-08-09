import { Application } from "backbone.marionette";
import { history } from "backbone";
import IndexView from "./views/index-view.js";
import { items } from "./collections/items.js";

const App = Application.extend({
  region: "#app",

  onBeforeStart(app, options) {
    items.baseUrl = options.settings.dataUrl;
  },

  onStart(app, options) {
    const indexView = new IndexView(options);

    this.showView(indexView);

    history.start();
  },
});

export default App;
