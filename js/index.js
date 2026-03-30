// import "@fontsource/inter";

import App from "./App.js";
import { config } from "./config.js";

import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/app.css';

(function () {
  var app = new App();

  app.start({
    settings: {
      dataUrl: config.apiUrl,
    },
    user: {
      name: config.defaultUser.name,
    },
  });
})();
