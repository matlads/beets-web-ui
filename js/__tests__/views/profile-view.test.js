import { describe, it, expect } from 'vitest';
import ProfileView from '../../views/profile-view.js';
import ProfileModel from '../../models/profile.js';

describe('ProfileView', () => {
  it('should render the profile name from its model', () => {
    const model = new ProfileModel({ name: 'Alice' });
    const view = new ProfileView({ model });

    view.render();
    const html = view.el.innerHTML.trim();

    expect(html).toBe('Alice');
  });
});
