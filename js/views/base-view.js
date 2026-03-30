import { View } from "backbone.marionette";
import { Radio } from "backbone";

/**
 * Base view that automatically sets up the Radio channel for beets events.
 * Views that extend BaseView can define a `beetsEvents` object to automatically
 * bind events from the "beets" channel.
 */
const BaseView = View.extend({
  initialize() {
    if (View.prototype.initialize) {
      View.prototype.initialize.apply(this, arguments);
    }

    this.beetsChannel = Radio.channel("beets");
    
    if (this.beetsEvents) {
      this.bindEvents(this.beetsChannel, this.beetsEvents);
    }
  },
});

export default BaseView;