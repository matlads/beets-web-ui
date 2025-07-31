import Item from "../models/item.js";

const CurrentlyPlayingView = Marionette.View.extend({
    template: _.template(`
        <p class="fs-5"><%= title %></p>
        <p class="fs-6"><%= artist %></p>
    `),
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