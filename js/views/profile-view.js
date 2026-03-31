import { View } from 'backbone.marionette';
import { template } from 'underscore';
import { PersonIcon } from '../icons.js';

const ProfileView = View.extend({
  template: template(`
    <div style="display: flex; align-items: center; gap: 8px;">
      <img src="${PersonIcon}" alt="Avatar" style="height: 24px; width: 24px; border-radius: 50%;" />
      <%= name %>
    </div>
  `),
});
export default ProfileView;
