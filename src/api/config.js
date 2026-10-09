// Central place for the backend origin so it's never hardcoded in more than one spot.
// Matches the pattern already used for auth calls in App.jsx. VITE_API_PORT (e.g. in .env.local)
// points the UI at a backend on another port; it defaults to the usual 8080.
const API_PORT = import.meta.env.VITE_API_PORT || '8080';

export const API_BASE_URL = `http://${window.location.hostname}:${API_PORT}`;
