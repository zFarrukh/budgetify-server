const express = require('express');

const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

const adminController = require('../controllers/admin.controller');

const adminRouter = express.Router();

adminRouter.get('/category', isAuth, isAdmin, adminController.getCategoryStats);

adminRouter.get('/monthly', isAuth, isAdmin, adminController.getMonthlyStats);

module.exports = adminRouter;
