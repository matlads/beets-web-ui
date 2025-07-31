import Item from "../models/item.js";

const beetsChannel = Backbone.Radio.channel('beets');

const ItemView = Marionette.View.extend({
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
							<i class="bi bi-play"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
	`),
	events: {
		'click': 'onClick',
		'dblclick': 'onDblClick',

		'click .bi-info-square': 'onClick',
		'click .bi-play': 'onDblClick',
	},
	onClick() {
		beetsChannel.trigger('item:selected', this.model.get('id'));
	},
	onDblClick() {
		beetsChannel.trigger('item:play', this.model.get('id'));
	}
});

export default ItemView;
