const express = require('express');

const isAuth = require('../middlewares/isAuth');

const statsController = require('../controllers/stats.controller');

const statsRouter = express.Router();

statsRouter.get('/category', isAuth, statsController.getCategoryStats);

statsRouter.get('/monthly', isAuth, statsController.getMonthlyStats);

module.exports = statsRouter;
