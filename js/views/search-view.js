import { items } from "../collections/items.js";

const ENTER_KEY = 13;

const SearchView = Marionette.View.extend({
    template: _.template(`
        <input type="text" class="form-control search-input" placeholder="Search...">
        <i class="bi bi-search search-icon"></i>
    `),

    className: 'search-container',

    ui: {
        searchInput: '.search-input'
    },

    events: {
        "keydown": "keyAction",
    },

    keyAction(e) {
        if (e.which === ENTER_KEY) {
            // perform the search
            const t = e.target.value;
            const url = `${this.options.settings.dataUrl}/item/query/${t}`;
            items.url = url;
            items.fetch();
        }
    }
});

export default SearchView;