import { Model } from 'backbone';

const ProfileModel = Model.extend({
  defaults: {
    name: "John Doe",
  },
});

export default ProfileModel;
