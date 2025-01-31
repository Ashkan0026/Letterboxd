const express = require('express');
const FeedbackController = require('../controller/feedbackController');
const { authenticateToken, authorizeRole } = require('../utils/jwt');

const router = express.Router();
const feedbackController = new FeedbackController();

// ✅ Public: Register a new feedback
router.post('/feedback/register', authenticateToken, (req, res) => feedbackController.registerFeedback(req, res));

// ✅ Admin: Get all feedbacks
router.get('/feedbacks', authenticateToken, authorizeRole('admin'), (req, res) => feedbackController.getAllFeedbacks(req, res));

// ✅ Public: Get feedbacks by user_id in param
router.get('/feedbacks/:user_id', authenticateToken, (req, res) => feedbackController.getFeedbacks(req, res));

// ✅ Public: Get feedbacks of user by user_id in JWT
router.get('/feedbacks/me', authenticateToken, (req, res) => feedbackController.getMyFeedbacks(req, res));

// ✅ Public: Get movie feedbacks
router.get('/feedbacks/movie/:movie_id', authenticateToken, (req, res) => feedbackController.getMovieFeedbacks(req, res));

// 🔒 Admin: delete feedback
router.delete('/feedbacks/:feedback_id', authenticateToken, authorizeRole('admin'), (req, res) => feedbackController.deleteFeedback(req, res));

module.exports = router;
