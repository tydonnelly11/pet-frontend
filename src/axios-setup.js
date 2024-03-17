import axios from 'axios';
import router from '@/router/router.js'; // Import your router instance

// Create an Axios instance or use the default global instance
const apiClient = axios.create({
  baseURL: 'http://localhost:80/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    router.push('/login');
    localStorage.removeItem('logginstatus');
    localStorage.removeItem('auth');
    localStorage.removeItem('storeUser');
    localStorage.removeItem('storeSection');
    
  }
  return Promise.reject(error);
});

export default apiClient;