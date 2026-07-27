// Global Configuration
const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '')
    ? 'http://localhost:5000'
    : window.location.origin; // Automatically uses your live Vercel URL in production