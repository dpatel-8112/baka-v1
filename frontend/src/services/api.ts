import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Current token:', token); // Debug log
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Request headers:', config.headers); // Debug log
    } else {
      console.warn('No token found in localStorage'); // Debug log
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error); // Debug log
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error.response?.status, error.response?.data); // Debug log
    if (error.response?.status === 401) {
      console.log('Unauthorized - clearing auth data'); // Debug log
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;

export const fetchMyProfile = () => api.get('/users/me');
export const updateMyProfile = (profileData: any) => api.put('/users/me', profileData);

export const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const fetchAllUsers = () => api.get('/users'); 