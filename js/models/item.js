import { Model } from 'backbone';

const Item = Model.extend({
  defaults: {
    title: "N/A",
    album: "N/A",
    artist: "N/A",
    year: null,
    duration: 0,
    lyrics: null,
    active: false, // active is true if this item is playing.
  },
});
export default Item;
