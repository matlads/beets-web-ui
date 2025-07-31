import Item from "../models/item.js";
import { items } from "../collections/items.js";

const PlayerView = Marionette.View.extend({
    tagName: 'audio',
    attributes: {
        controls: true
    },
    template: _.template(`
        Your browser does not support the audio element.
    `),
    initialize() {
        this.beetsChannel = Backbone.Radio.channel('beets');
        this.bindEvents(this.beetsChannel, this.beetsEvents);
        this.model = new Item();
    },
    events: {
        'ended': 'onEnded',
    },
    beetsEvents: {
        'item:play': 'doPlay',
    },
    doPlay(itemId) {
        this.model = items.findWhere({ "id": itemId });
        this.play();
    },
    play() {
        const itemId = this.model.get('id');
        const dataUrl = this.options.settings.dataUrl;
        const url = `${dataUrl}/item/${itemId}/file`;
        this.el.src = url;
        this.el.play();
        this.model.active = true;
    },
    onEnded() {
        this.model.active = false;
        this.beetsChannel.trigger('play:ended');
    }
});

export default PlayerView;