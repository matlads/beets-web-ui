import BaseView from "./base-view.js";
import { template } from "underscore";

import Item from "../models/item.js";

import {
  FileMusicIcon,
  JournalAlbumIcon,
  PersonIcon,
  InfoSquareIcon,
  PlayIcon,
  PauseIcon,
} from "../icons.js";

const ItemView = BaseView.extend({
  options: {
    playOrPause: PlayIcon,
  },
  model: Item,
  className: "card",
  template: template(`
		<div class="card-body">
			<div class="card-title">
        <img src="${FileMusicIcon}" />
				<%- title %>
			</div>
			<div class="row">
				<div class="col-8">
					<p class="card-text">
            <img src="${JournalAlbumIcon}" />
						<a href="/item/query/album:<%- album %>" id="album"><%- album %></a>
					</p>
					<p class="card-text">
            <img src="${PersonIcon}" />
						<a href="/item/query/artist:<%- artist %>" id="artist"><%- artist %></a>
					</p>
				</div>
				<div class="col-4">
					<div class="btn-group" role="group" aria-label="Basic example">
						<button type="button" class="btn btn-primary info-square">
              <img src="${InfoSquareIcon}"/>
						</button>
						<button id="playOrPause" type="button" class="btn btn-primary play">
              <img src="<%= playOrPause %>" />
						</button>
					</div>
				</div>
			</div>
		</div>
	`),
  events: {
    "click .info-square": "onClick",
    "click .play": "triggerPlay",
    "click .pause": "triggerPause",
    "click #artist": "searchArtist",
    "click #album": "searchAlbum",
  },
  ui: {
    playOrPauseButton: "#playOrPause"
  },
  templateContext() {
    return {
      playOrPause: this.options.playOrPause,
    };
  },
  onClick() {
    this.beetsChannel.trigger("item:selected", this.model);
  },
  triggerPlay() {
    this.options.playOrPause = PauseIcon;

    const playOrPauseButton = this.getUI("playOrPauseButton");
    playOrPauseButton.removeClass("pause");
    playOrPauseButton.addClass("play");

    this.render();
    this.beetsChannel.trigger("item:play", this.model);
  },
  triggerPause() {
    this.resetView();
    this.beetsChannel.trigger("item:pause", this.model);
  },
  resetView() {
    this.options.playOrPause = PlayIcon;

    const playOrPauseButton = this.getUI("playOrPauseButton");
    playOrPauseButton.removeClass("play");
    playOrPauseButton.addClass("pause");

    this.render();
  },
  setQuery(query = "") {
    this.beetsChannel.trigger("item:search", query);
  },
  searchArtist(event) {
    event.preventDefault();
    const artist = this.model.get("artist");
    const query = `artist:${artist}`;
    this.setQuery(query);
  },
  searchAlbum(event) {
    event.preventDefault();
    const album = this.model.get("album");
    const query = `album:${album}`;
    this.setQuery(query);
  }
});

export default ItemView;
