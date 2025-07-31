import ProfileView from "./profile-view.js";
import ProfileModel from "../models/profile.js";
import SearchView from "./search-view.js";

const HeaderView = Marionette.View.extend({
  template: _.template(`
		<div>
				<a class="navbar-brand" href="#">Beets</a>
		</div>
    <div>
    </div>
		<div id="profile">Profile</div>`),
  className: "container text-center",

  regions: {
    profileRegion: "#profile",
  },

  onRender() {
    const profile = new ProfileModel({
      name: this.options.user.name,
    });
    const profileView = new ProfileView({ model: profile });
    this.showChildView("profileRegion", profileView);
  },
});

export default HeaderView;
