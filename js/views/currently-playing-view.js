import Item from "../models/item.js";

const CurrentlyPlayingView = Marionette.View.extend({
    template: _.template(`
        <div class="card-body">
            <p class="card-text">
                <small><%= title %></small>
                <small class="text-muted"><%= artist %></small>
            </p>
        </div>
    `),
    className: 'card',
    initialize() {
        this.beetsChannel = Backbone.Radio.channel('beets');
        this.bindEvents(this.beetsChannel, this.beetsEvents);
        this.model = new Item();
    },
    beetsEvents: {
        'item:play': 'doPlay',
    },
    doPlay(model) {
        this.model = model;
        this.render();
    }
});

export default CurrentlyPlayingView;