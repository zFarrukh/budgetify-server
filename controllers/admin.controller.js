const Transaction = require('../models/transaction.model');
const {
  generateCategoryStats,
} = require('../utils/generateCategoryStats.util');
const { generateMonthlyStats } = require('../utils/generateMonthlyStats.util');

const getCategoryStats = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    const findQuery = {};

    if (fromDate && toDate) {
      findQuery.date_of_creation = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    const transactions = await Transaction.find(findQuery);
    const myTransactions = {};
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].currency) {
        if (myTransactions[transactions[i].currency]) {
          myTransactions[transactions[i].currency].push(transactions[i]);
        } else if (transactions[i].currency) {
          myTransactions[transactions[i].currency] = [transactions[i]];
        }
      }
    }
    const categoryStats = {};
    const currencies = Object.keys(myTransactions);
    if (currencies.length > 0) {
      for (let i = 0; i < currencies.length; i++) {
        categoryStats[currencies[i]] = generateCategoryStats(
          myTransactions[currencies[i]]
        );
      }
    }

    res.json(categoryStats);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getMonthlyStats = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    const findQuery = {};

    if (fromDate && toDate) {
      findQuery.date_of_creation = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    const transactions = await Transaction.find(findQuery);
    const myTransactions = {};
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].currency) {
        if (myTransactions[transactions[i].currency]) {
          myTransactions[transactions[i].currency].push(transactions[i]);
        } else {
          myTransactions[transactions[i].currency] = [transactions[i]];
        }
      }
    }
    const currencies = Object.keys(myTransactions);
    const monthlyStats = {};
    if (currencies.length > 0) {
      for (let i = 0; i < currencies.length; i++) {
        monthlyStats[currencies[i]] = generateMonthlyStats(
          myTransactions[currencies[i]]
        );
      }
    }
    res.json(monthlyStats);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getCategoryStats,
  getMonthlyStats,
};
