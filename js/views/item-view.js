import Item from "../models/item.js";

const beetsChannel = Backbone.Radio.channel('beets');

const ItemView = Marionette.View.extend({
	options: {
		playOrPause: 'bi-play',
	},
	model: Item,
	className: "card",
	template: _.template(`
		<div class="card-body">
			<div class="card-title">
				<i class="bi bi-file-music"></i>
				<%- title %>
			</div>
			<div class="row">
				<div class="col-8">
					<p class="card-text">
						<i class="bi bi-journal-album"></i>
						<%- album %>
					</p>
					<p class="card-text">
						<i class="bi bi-person"></i>
						<%- artist %>
					</p>
				</div>
				<div class="col-4">
					<div class="btn-group" role="group" aria-label="Basic example">
						<button type="button" class="btn btn-primary">
							<i class="bi bi-info-square"></i>
						</button>
						<button type="button" class="btn btn-primary">
							<i class="bi <%= playOrPause %>"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	`),
	events: {
		'click .bi-info-square': 'onClick',
		'click .bi-play': 'triggerPlay',
		'click .bi-pause': 'triggerPause',
	},
	templateContext() {
		return {
			playOrPause: this.options.playOrPause,
		};
	},
	onClick() {
		beetsChannel.trigger('item:selected', this.model.get('id'));
	},
	triggerPlay() {
		this.options.playOrPause = 'bi-pause';
		this.render();
		beetsChannel.trigger('item:play', this.model.get('id'));
	},
	triggerPause() {
		this.options.playOrPause = 'bi-play';
		this.render();
		beetsChannel.trigger('item:pause', this.model.get('id'));
	}
});

export default ItemView;
