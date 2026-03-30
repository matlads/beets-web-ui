// Configuration module for beets-web-ui
// Reads environment variables (via Vite's import.meta.env)

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8337';
const USER_NAME = import.meta.env.VITE_USER_NAME || 'John Doe';

export const config = {
  apiUrl: API_URL,
  defaultUser: {
    name: USER_NAME,
  },
};