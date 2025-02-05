const express = require('express');
const UserController = require('../controller/userController');
const { authenticateToken, authorizeRole } = require('../utils/jwt');

const router = express.Router();
const userController = new UserController();

// get all users
router.get('/users', authenticateToken, (req, res) => userController.getUsers(req, res));

// get user by username
router.get('/user/:username', authenticateToken, (req, res) => userController.getUserByUsername(req, res));

// delete a user
router.delete('/users/:username', authenticateToken, authorizeRole('admin'), (req, res) => userController.deleteUser(req, res));

// edit a user
router.put('/users/:username', authenticateToken, authorizeRole('admin'), (req, res) => userController.editUser(req, res));

module.exports = router;
