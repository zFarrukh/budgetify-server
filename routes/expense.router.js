const express = require('express');
const isAuth = require('../middlewares/isAuth');
const expenseControllers = require('../controllers/expense.controller');

const Router = express.Router();

Router.get('/', isAuth, expenseControllers.getExpenses);
Router.post('/', isAuth, expenseControllers.addExpense);
Router.put('/:id', isAuth, expenseControllers.updateExpenseById);
Router.delete('/:id', isAuth, expenseControllers.deleteExpenseById);

module.exports = Router;
