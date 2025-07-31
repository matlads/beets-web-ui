import PlayerView from "./player-view.js";

const FooterView = Marionette.View.extend({
	template: _.template(`
		<div>Left</div>
		<div id="player">

		</div>
		<div>Right</div>`),
	className: "container text-center",
	regions: {
		player: '#player'
	},
	onRender() {
		this.showChildView('player', new PlayerView(this.options));
	}
});
export default FooterView;
