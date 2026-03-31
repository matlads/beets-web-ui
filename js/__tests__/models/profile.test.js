import { describe, it, expect } from 'vitest';
import ProfileModel from '../../models/profile.js';

describe('ProfileModel', () => {
  it('should have default name', () => {
    const profile = new ProfileModel();
    expect(profile.get('name')).toBe('John Doe');
  });

  it('should allow constructor override', () => {
    const profile = new ProfileModel({ name: 'Alice' });
    expect(profile.get('name')).toBe('Alice');
  });

  it('should allow set and get', () => {
    const profile = new ProfileModel();
    profile.set('name', 'Bob');
    expect(profile.get('name')).toBe('Bob');

    profile.set({ name: 'Charlie' });
    expect(profile.get('name')).toBe('Charlie');
  });
});
