const Transaction = require('../models/transaction.model');
const {
  generateCategoryStats,
} = require('../utils/generateCategoryStats.util');
const { generateMonthlyStats } = require('../utils/generateMonthlyStats.util');

const getCategoryStats = async (req, res) => {
  try {
    const { account_id, fromDate, toDate } = req.query;
    const findQuery = {
      account_id,
    };

    if (fromDate && toDate) {
      findQuery.date_of_creation = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    const transactions = await Transaction.find(findQuery);
    res.json(generateCategoryStats(transactions));
  } catch (err) {
    res.status(400).json(err);
  }
};

const getMonthlyStats = async (req, res) => {
  try {
    const { account_id, fromDate, toDate } = req.query;
    const findQuery = {
      account_id,
    };

    if (fromDate && toDate) {
      findQuery.date_of_creation = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate),
      };
    }

    const transactions = await Transaction.find(findQuery);
    res.json(generateMonthlyStats(transactions));
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  getCategoryStats,
  getMonthlyStats,
};
