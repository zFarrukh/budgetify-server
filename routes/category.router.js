const express = require('express');
const categoryController = require('../controllers/category.controller');
const isAuth = require('../middlewares/isAuth');

const Router = express.Router();

Router.get('/', isAuth, categoryController.getAllCategories);
Router.post('/', isAuth, categoryController.addCategory);
Router.delete('/:id', isAuth, categoryController.deleteCategoryById);
Router.put('/:id', isAuth, categoryController.updateCategoryById);

module.exports = Router;
