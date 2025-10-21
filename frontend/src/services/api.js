import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

// VHS API
export const vhsAPI = {
  getAll: () => api.get('/vhs'),
  getById: (id) => api.get(`/vhs/${id}`),
  getAvailable: () => api.get('/vhs/available'),
  search: (title) => api.get(`/vhs/search?title=${title}`),
  getByGenre: (genre) => api.get(`/vhs/genre/${genre}`),
  getGenres: () => api.get('/vhs/genres'),
  create: (data) => api.post('/vhs', data),
  update: (id, data) => api.put(`/vhs/${id}`, data),
  delete: (id) => api.delete(`/vhs/${id}`),
  filter: (filterDto) => api.post('/vhs/filter', filterDto),
};

// Rental API
export const rentalAPI = {
  rent: (data) => api.post('/rentals', data),
  return: (id) => api.put(`/rentals/${id}/return`),
  getMyRentals: () => api.get('/rentals/my-rentals'),
  getMyActiveRentals: () => api.get('/rentals/my-rentals/active'),
  getAll: () => api.get('/rentals'),
};

// Review API
export const reviewAPI = {
  create: (data) => api.post('/reviews', data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
  getVhsReviews: (vhsId) => api.get(`/reviews/vhs/${vhsId}`),
  getMyReviews: () => api.get('/reviews/my-reviews'),
};

export default api;

