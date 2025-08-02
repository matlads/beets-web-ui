import Item from "../models/item.js";
import { items } from "../collections/items.js";

const beetsChannel = Backbone.Radio.channel("beets");

const ItemView = Marionette.View.extend({
  options: {
    playOrPause: "bi-play",
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
						<a id="artist"><%- artist %></a>
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
    "click .bi-info-square": "onClick",
    "click .bi-play": "triggerPlay",
    "click .bi-pause": "triggerPause",
    "click #artist": "searchArtist",
  },
  templateContext() {
    return {
      playOrPause: this.options.playOrPause,
    };
  },
  onClick() {
    beetsChannel.trigger("item:selected", this.model);
  },
  triggerPlay() {
    this.options.playOrPause = "bi-pause";
    this.$el.addClass("text-bg-success");
    this.render();
    beetsChannel.trigger("item:play", this.model);
  },
  triggerPause() {
    this.resetView();
    beetsChannel.trigger("item:pause", this.model);
  },
  resetView() {
    this.model.active = false;
    this.options.playOrPause = "bi-play";
    this.$el.removeClass("text-bg-success");
    this.render();
  },
  searchArtist() {
    const artist = this.model.get("artist");
    const query = `artist:${artist}`;
    items.setQuery(query).fetch();
    beetsChannel.trigger("item:search", query);
  },
});

export default ItemView;
