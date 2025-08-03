import { View } from 'backbone.marionette';
import { template } from 'underscore';

const ProfileView = View.extend({
  template: template("<%= name %>"),
});
export default ProfileView;
