const express = require('express');
const userControllers = require('../controllers/user.controller');
const Router = express.Router();

Router.post('/login', userControllers.loginUser);
Router.post('/register', userControllers.registerUser);

module.exports = Router;
