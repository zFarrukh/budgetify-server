const Transaction = require('../models/transaction.model');
const Account = require('../models/account.model');

const addIncome = async (req, res) => {
  const { title, amount, category, account_id, description } = req.body;
  if ((!title || isNaN(amount) || !category, !account_id)) {
    return res.status(400).json({ error: 'Bad request' });
  }
  try {
    const account = await Account.findById(account_id);
    const newAmount = account.amount + amount;

    const income = new Transaction({
      title,
      amount,
      category,
      account_id,
      description,
      type: 'income',
      date_of_creation: new Date(),
    });
    await income.save();
    await Account.findByIdAndUpdate(account_id, { amount: newAmount });
    res.json(income);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Bad request' });
  }
};

const deleteIncomeById = async (req, res) => {
  try {
    const id = req.params.id;
    const income = await Transaction.findByIdAndDelete(id);
    const account = await Account.findById(income.account_id);
    const newAmount = account.amount - income.amount;
    if (newAmount < 0) throw new Error('Amount could not be lower than 0');
    await Account.findByIdAndUpdate(income.account_id, { amount: newAmount });
    res.json(income);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

const updateIncomeById = async (req, res) => {
  const { title, amount, category, description } = req.body;
  const id = req.params.id;
  try {
    const income = await Transaction.findById(id);
    const account = await Account.findById(income.account_id);
    const newAmount = !isNaN(amount)
      ? account.amount - income.amount + amount
      : account.amount;
    if (newAmount < 0) throw new Error('Amount could not be lower than 0');
    await Transaction.findByIdAndUpdate(id, {
      title,
      amount,
      category,
      description,
      date_of_update: new Date(),
    });

    await Account.findByIdAndUpdate(income.account_id, { amount: newAmount });
    res.json(income);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

const getIncomes = async (req, res) => {
  const account_id = req.query.account_id;
  if (!account_id) {
    return res.status(400).json({ error: 'Bad request' });
  }
  try {
    const incomes = await Transaction.find({ account_id, type: 'income' });
    res.json(incomes);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

module.exports = {
  addIncome,
  deleteIncomeById,
  updateIncomeById,
  getIncomes,
};
