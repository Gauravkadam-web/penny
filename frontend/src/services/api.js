import axios from 'axios';

let rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Strip trailing slashes
rawBaseUrl = rawBaseUrl.replace(/\/+$/, '');

// Ensure /api suffix is present regardless of how VITE_API_BASE_URL is entered
if (!rawBaseUrl.endsWith('/api')) {
  rawBaseUrl += '/api';
}

const api = axios.create({
  baseURL: rawBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
