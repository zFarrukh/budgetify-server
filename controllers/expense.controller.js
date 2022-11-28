const Transaction = require('../models/transaction.model');
const Account = require('../models/account.model');

const addExpense = async (req, res) => {
  const { title, amount, category, account_id, description } = req.body;
  if ((!title || isNaN(amount) || !category, !account_id)) {
    return res.status(400).json({ error: 'Bad request' });
  }
  try {
    const account = await Account.findById(account_id);
    const newAmount = account.amount - amount;
    if (newAmount < 0) throw new Error('Amount could not be lower than 0');
    const expense = new Transaction({
      title,
      amount,
      category,
      account_id,
      description,
      type: 'expense',
      date_of_creation: new Date(),
    });
    await expense.save();
    await Account.findByIdAndUpdate(account_id, { amount: newAmount });
    res.json(expense);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Bad request' });
  }
};

const deleteExpenseById = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Transaction.findByIdAndDelete(id);
    const account = await Account.findById(expense.account_id);
    const newAmount = account.amount + expense.amount;
    await Account.findByIdAndUpdate(expense.account_id, { amount: newAmount });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

const updateExpenseById = async (req, res) => {
  const { title, amount, category, description } = req.body;
  const id = req.params.id;
  try {
    const expense = await Transaction.findById(id);
    const account = await Account.findById(expense.account_id);
    const newAmount = !isNaN(amount)
      ? account.amount + expense.amount - amount
      : account.amount;
    if (newAmount < 0) throw new Error('Amount could not be lower than 0');
    await Transaction.findByIdAndUpdate(id, {
      title,
      amount,
      category,
      description,
      date_of_update: new Date(),
    });

    await Account.findByIdAndUpdate(expense.account_id, { amount: newAmount });
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

const getExpenses = async (req, res) => {
  const account_id = req.query.account_id;
  if (!account_id) {
    return res.status(400).json({ error: 'Bad request' });
  }
  try {
    const expenses = await Transaction.find({ account_id, type: 'expense' });
    res.json(expenses);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

module.exports = {
  addExpense,
  deleteExpenseById,
  updateExpenseById,
  getExpenses,
};
