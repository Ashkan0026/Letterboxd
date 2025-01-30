const express = require('express');
const UserController = require('../controller/userController');
const { authenticateToken, authorizeRole } = require('../utils/jwt');

const router = express.Router();
const UserController = new UserController();

// get all users
router.get('/users', authenticateToken, authorizeRole('admin'), (req, res) => UserController.getUsers(req, res));

// delete a user
router.delete('/users/:user_id', authenticateToken, authorizeRole('admin'), (req, res) => UserController.deleteUser(req, res));

// edit a user
router.put('/users/:user_id', authenticateToken, authorizeRole('admin'), (req, res) => UserController.editUser(req, res));

module.exports = router;
