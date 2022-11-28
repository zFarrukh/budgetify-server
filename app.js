require('dotenv').config();
require('./database/mogoose');
const express = require('express');
const passport = require('passport');
const cors = require('cors');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const categoryRouter = require('./routes/category.router');
const userRouter = require('./routes/user.router');
const expenseRouter = require('./routes/expense.router');
const incomeRouter = require('./routes/income.router');
const transactionRouter = require('./routes/transaction.router');
const accountRouter = require('./routes/account.router');
const statsRouter = require('./routes/stats.router');

const { jwtCallback } = require('./config/passport');
const adminRouter = require('./routes/admin.router');

const app = express();

app.use(express.json());
app.use(cors());

app.use(passport.initialize());

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(opts, jwtCallback));

app.use('/categories', categoryRouter);
app.use('/user', userRouter);
app.use('/expenses', expenseRouter);
app.use('/incomes', incomeRouter);
app.use('/transactions', transactionRouter);
app.use('/accounts', accountRouter);
app.use('/stats', statsRouter);
app.use('/admin', adminRouter);

module.exports = {
  app,
};
