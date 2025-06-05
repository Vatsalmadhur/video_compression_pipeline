
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:6000', // fallback
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios error:', error);
    return Promise.reject(error);
  }
);

export default axiosClient;

