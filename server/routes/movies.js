const express = require('express');
const MoviesController = require('../controller/moviesController');
const { authenticateToken, authorizeRole } = require('../utils/jwt');

const router = express.Router();
const moviesController = new MoviesController();

// ✅ Public: Get all movies (Requires authentication)
router.get('/movies', authenticateToken, (req, res) => moviesController.getMovies(req, res));

// ✅ User: Get favorite movies (Requires authentication)
router.get('/movies/favorites', authenticateToken, (req, res) => moviesController.getFavoriteMovies(req, res));

// 🔒 Admin: Add new movie
router.post('/movies', authenticateToken, authorizeRole('admin'), (req, res) => moviesController.addMovie(req, res));

// 🔒 Admin: Edit movie
router.put('/movies/:movie_id', authenticateToken, authorizeRole('admin'), (req, res) => moviesController.editMovie(req, res));

// 🔒 Admin: Delete movie
router.delete('/movies/:movie_id', authenticateToken, authorizeRole('admin'), (req, res) => moviesController.deleteMovie(req, res));

module.exports = router;
