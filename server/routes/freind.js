const express = require('express');
const FriendController = require('../controller/friendController');
const { authenticateToken, authorizeRole } = require('../utils/jwt');

const router = express.Router();
const friendController = new FriendController();

// add a new friend
router.post('/friend/add', authenticateToken, (req, res) => friendController.addFriend(req, res));

// get friends of user by user_id in JWT
router.get('/friend/my', authenticateToken, (req, res) => friendController.getMyFriends(req, res));

// delete a friend
router.delete('/friend/delete/:friend_id', authenticateToken, (req, res) => friendController.deleteFriend(req, res));

module.exports = router;
