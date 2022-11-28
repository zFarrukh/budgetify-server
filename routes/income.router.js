const express = require('express');
const isAuth = require('../middlewares/isAuth');
const incomeControllers = require('../controllers/income.controller');

const Router = express.Router();

Router.get('/', isAuth, incomeControllers.getIncomes);
Router.post('/', isAuth, incomeControllers.addIncome);
Router.put('/:id', isAuth, incomeControllers.updateIncomeById);
Router.delete('/:id', isAuth, incomeControllers.deleteIncomeById);

module.exports = Router;
