import axios from 'axios';

const API_BASE_URL = 'http://localhost:9090/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Movies API
export const moviesApi = {
  getAllMovies: (filters) => api.get('/movies', { params: filters }),
  getFavoriteMovies: () => api.get('/movies/favorites'),
  addMovie: (movieData) => api.post('/movies', movieData),
  editMovie: (movieId, movieData) => api.put(`/movies/${movieId}`, movieData),
  deleteMovie: (movieId) => api.delete(`/movies/${movieId}`),
};

// Users API
export const usersApi = {
  getAllUsers: () => api.get('/users'),
  getUserByUsername: (username) => api.get(`/user/${username}`),
  deleteUser: (userId) => api.delete(`/users/${userId}`),
  editUser: (userId, userData) => api.put(`/users/${userId}`, userData),
  followUser: async (follower_username, following_username) => {
    try {
      const response = await api.post(`/friend/add`, { follower_username: follower_username , following_username: following_username });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to follow user');
    }
  },
  unfollowUser: (userId) => api.delete(`/friend/delete/${userId}`),
};

// Auth API
export const authApi = {
  login: (credentials) => api.post('/login', credentials),
};

// Feedback API
export const feedbackApi = {
  addFeedback: (feedbackData) => api.post('/feedback/register', feedbackData),
  getAllFeedbacks: () => api.get('/feedbacks'),
  getUserFeedbacks: (userId) => api.get(`/feedbacks/${userId}`),
  getMyFeedbacks: () => api.get('/feedbacks/me'),
  getMovieFeedbacks: (movieId) => api.get(`/feedbacks/movie/${movieId}`),
  deleteFeedback: (feedbackId) => api.delete(`/feedbacks/${feedbackId}`),
};

export default api;
