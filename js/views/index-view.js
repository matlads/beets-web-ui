import HeaderView from "./header-view.js";
import FooterView from "./footer-view.js";
import MainView from "./main-view.js";

const IndexView = Marionette.View.extend({
  template: _.template(`
		<nav id="header" class="navbar fixed-top bg-body-tertiary"></nav>
		<main id="main" class="mh-100"></main>
		<nav id="footer" class="navbar fixed-bottom bg-body-tertiary"></nav>
	`),

  initialize(options) {
    this.headerView = new HeaderView();
    this.mainView = new MainView(options);
    this.footerView = new FooterView(options);
  },

  regions: {
    header: "#header",
    main: "main",
    footer: "#footer",
  },

  onRender(options) {
    this.showChildView("header", this.headerView);
    this.showChildView("main", this.mainView);
    this.showChildView("footer", this.footerView);
  },
});

export default IndexView;
