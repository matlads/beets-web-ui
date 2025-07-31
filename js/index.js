import App from "./App.js";

(function () {
  var app = new App();

  app.start({
    settings: {
      dataUrl: "http://127.0.0.1:8337",
    },
    user: {
      name: "John Doe",
    },
  });
})();
