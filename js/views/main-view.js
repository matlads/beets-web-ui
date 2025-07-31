import LocalFilesView from "./local-files-view.js";
import SearchResultsView from "./search-results-view.js";
import QueueView from "./queue-view.js";


const MainView = Marionette.View.extend({
  className: "row",
  template: _.template(`
		<div id="left-column" class="col-3"></div>
		<div id="center-column" class="col-6"></div>
		<div id="right-column" class="col-3"></div>
	`),

  initialize(options) {
    this.localFilesView = new LocalFilesView(options);
    this.searchResultsView = new SearchResultsView();
    this.queueView = new QueueView();
  },

  regions: {
    localFileRegion: "#left-column",
    searchResultsRegion: "#center-column",
    queueRegion: "#right-column",
  },

  onRender(options) {
    this.showChildView("localFileRegion", this.localFilesView);
    this.showChildView("searchResultsRegion", this.searchResultsView);
    this.showChildView("queueRegion", this.queueView);
  },
});
export default MainView;
