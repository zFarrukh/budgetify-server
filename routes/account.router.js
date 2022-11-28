const express = require('express');
const accountController = require('../controllers/account.controller');
const isAuth = require('../middlewares/isAuth');

const Router = express.Router();

Router.get('/', isAuth, accountController.getAllAccounts);
Router.post('/', isAuth, accountController.addAccount);
Router.delete('/:id', isAuth, accountController.deleteAccountById);
Router.put('/:id', isAuth, accountController.updateAccountById);

module.exports = Router;
