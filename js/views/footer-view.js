import PlayerView from "./player-view.js";
import CurrentlyPlayingView from "./currently-playing-view.js";

const FooterView = Marionette.View.extend({
	template: _.template(`
		<div id="currently-playing" class="col-3"></div>
		<div id="player" class="col-6 mx-auto"></div>
		<div class="col-3">Right</div>`),
	className: "container",
	regions: {
		player: '#player',
		currentlyPlaying: '#currently-playing'
	},
	onRender() {
		this.showChildView('player', new PlayerView(this.options));
		this.showChildView('currentlyPlaying', new CurrentlyPlayingView());
	}
});
export default FooterView;
