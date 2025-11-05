const API_BASE_URL = 'https://virtual-lab-pycourse-production.up.railway.app';

if (import.meta.env.PROD && !API_BASE_URL) {
  console.warn(
    'WARNING: The VITE_BACKEND_URL environment variable is not set for the production build. ' +
    'The application will likely fail to connect to the backend.'
  );
}

export default API_BASE_URL;