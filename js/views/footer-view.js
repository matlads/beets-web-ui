import { View } from "backbone.marionette";
import { template } from "underscore";

import PlayerView from "./player-view.js";
import CurrentlyPlayingView from "./currently-playing-view.js";

const FooterView = View.extend({
  template: template(`
		<div id="currently-playing"></div>
		<div id="player" class="mx-auto"></div>
		<div>Right</div>`),
  className: "container-fluid",
  regions: {
    player: "#player",
    currentlyPlaying: "#currently-playing",
  },
  onRender() {
    this.showChildView("player", new PlayerView(this.options));
    this.showChildView("currentlyPlaying", new CurrentlyPlayingView());
  },
});
export default FooterView;
