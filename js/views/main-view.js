import LocalFilesView from "./local-files-view.js";
import SearchResultsView from "./search-results-view.js";
import QueueView from "./queue-view.js";
import SearchView from "./search-view.js";


const MainView = Marionette.View.extend({
  className: "row",
  template: _.template(`
		<div class="col-3">
      <div id="search-area"></div>
      <div id="left-column"></div>
    </div>
		<div id="center-column" class="col-6"></div>
		<div id="right-column" class="col-3"></div>
	`),

  initialize(options) {
    this.localFilesView = new LocalFilesView(options);
    this.searchResultsView = new SearchResultsView();
    this.queueView = new QueueView();
    this.searchView = new SearchView(options);
  },

  regions: {
    searchRegion: '#search-area',
    localFileRegion: "#left-column",
    searchResultsRegion: "#center-column",
    queueRegion: "#right-column",
  },

  onRender(options) {
    this.showChildView("searchRegion", this.searchView);
    this.showChildView("localFileRegion", this.localFilesView);
    this.showChildView("searchResultsRegion", this.searchResultsView);
    this.showChildView("queueRegion", this.queueView);
  },
});
export default MainView;
