import ProfileView from "./profile-view.js";
import ProfileModel from "../models/profile.js";

const HeaderView = Marionette.View.extend({
  template: _.template(`
		<div>
				<a class="navbar-brand" href="#">Beets</a>
		</div>
		<div>
			<div class="mb-3">
				<input type="search" class="form-control" id="searchInputControl" />
			</div>
		</div>
		<div id="profile">Profile</div>`),
  className: "container text-center",

  regions: {
    profileRegion: "#profile",
  },

  onRender() {
    const profile = new ProfileModel({
      userName: "Martin Atukunda",
    });
    const profileView = new ProfileView({ model: profile });
    this.showChildView("profileRegion", profileView);
  },
});

export default HeaderView;
