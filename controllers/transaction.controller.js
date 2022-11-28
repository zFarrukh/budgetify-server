const Transaction = require('../models/transaction.model');
const Account = require('../models/account.model');

const addTransaction = async (req, res) => {
  const {
    title,
    amount,
    category,
    account_id,
    description,
    type,
    date_of_creation,
  } = req.body;
  if (
    !title ||
    isNaN(amount) ||
    !Array.isArray(category) ||
    !account_id ||
    !type
  ) {
    return res.status(400).json({ error: 'Bad request' });
  }
  if (type !== 'income' && type !== 'expense') {
    return res.status(400).json({ error: 'Bad request' });
  }
  try {
    const account = await Account.findById(account_id);
    let newAmount = 0;
    if (type === 'income') {
      newAmount = Number(account.amount) + Number(amount);
    } else {
      newAmount = Number(account.amount) - Number(amount);
    }
    if (newAmount < 0) throw new Error('Amount could not be lower than 0');
    let DateOfCreation = date_of_creation ? date_of_creation : new Date();
    const transaction = new Transaction({
      title,
      amount,
      category,
      account_id,
      description,
      type,
      currency: account.currency,
      date_of_creation: DateOfCreation,
    });
    await transaction.save();
    await Account.findByIdAndUpdate(account_id, { amount: newAmount });
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTransactions = async (req, res) => {
  const account_id = req.query.account_id;
  if (!account_id) {
    return res.status(400).json({ error: 'Bad request' });
  }
  try {
    const transactions = await Transaction.find({ account_id });
    res.json(transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteTransactionById = async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await Transaction.findById(id);
    const account = await Account.findById(transaction.account_id);
    let newAmount;
    if (transaction.type === 'expense') {
      newAmount = account.amount + transaction.amount;
    } else {
      newAmount = account.amount - transaction.amount;
    }
    if (newAmount < 0) throw new Error('Amount could not be lower than 0');
    await Account.findByIdAndUpdate(transaction.account_id, {
      amount: newAmount,
    });
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    res.json(deletedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateTransactionById = async (req, res) => {
  const id = req.params.id;
  const { title, amount, category, description, type, date_of_creation } =
    req.body;
  if (!id && type !== 'income' && type !== 'expense') {
    return res.status(400).json({ error: 'Bad request' });
  }

  try {
    const transaction = await Transaction.findById(id);
    const account = await Account.findById(transaction.account_id);
    let newAmount;
    if (!transaction || !account) {
      return res.status(400).json({ error: 'Bad request' });
    }
    if (transaction.type === 'income') {
      if (type === 'income') {
        newAmount = !isNaN(amount)
          ? account.amount - transaction.amount + amount
          : account.amount;
        if (newAmount < 0) throw new Error('Amount could not be lower than 0');
      } else {
        newAmount = !isNaN(amount)
          ? account.amount - transaction.amount - amount
          : account.amount - 2 * transaction.amount;
        if (newAmount < 0) throw new Error('Amount could not be lower than 0');
      }
    } else if (transaction.type === 'expense') {
      if (type === 'expense') {
        newAmount = !isNaN(amount)
          ? account.amount + transaction.amount - amount
          : account.amount;
        if (newAmount < 0) throw new Error('Amount could not be lower than 0');
      } else {
        newAmount = !isNaN(amount)
          ? account.amount + transaction.amount + amount
          : account.amount + 2 * transaction.amount;
        if (newAmount < 0) throw new Error('Amount could not be lower than 0');
      }
    }
    await Account.findByIdAndUpdate(transaction.account_id, {
      amount: newAmount,
    });
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      {
        title,
        amount,
        category,
        description,
        date_of_update: new Date(),
        type,
        date_of_creation,
      },
      { new: true }
    );

    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransactionById,
  updateTransactionById,
};
