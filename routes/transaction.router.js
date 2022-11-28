const express = require('express');

const isAuth = require('../middlewares/isAuth');
const transactionController = require('../controllers/transaction.controller');

const Router = express.Router();

Router.use(isAuth);

Router.get('/', transactionController.getTransactions);
Router.delete('/:id', transactionController.deleteTransactionById);
Router.post('/', transactionController.addTransaction);
Router.put('/:id', transactionController.updateTransactionById);

module.exports = Router;
