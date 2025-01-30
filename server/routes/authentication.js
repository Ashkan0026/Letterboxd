const express = require('express');
const AuthenticationController = require('../controller/authenticationController');

const router = express.Router();
const authenticationController = new AuthenticationController();

router.get('/login', (req, res) => authenticationController.login(req, res));

module.exports = router;
