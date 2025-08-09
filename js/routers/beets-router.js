import { Router } from "backbone";
import { items } from "../collections/items";

var BeetsRouter = Router.extend({
    routes: {
        "item/query/:query": "itemQuery",
    },
    itemQuery: function (query) {
        const queryURL = query.split(/\s+/).map(encodeURIComponent).join('/');
        items.setQuery(queryURL).fetch();
    }
});

const router = new BeetsRouter({ pushState: true });

export { router, BeetsRouter };