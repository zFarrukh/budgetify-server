const mongoose = require('mongoose');
const { decimalCount } = require('../utils/decimalCount.util');

const transactionSchema = new mongoose.Schema({
  type: {
    required: true,
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 128,
  },
  account_id: {
    ref: 'Account',
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    required: true,
    trim: true,
    type: String,
    minlength: 1,
    maxlength: 128,
  },
  description: {
    required: false,
    trim: true,
    type: String,
    maxlength: 256,
  },
  category: {
    type: [
      {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        maxlength: 128,
      },
    ],
    validate: [
      { validator: arrayLimit, msg: 'categories exceeds the limit of 5' },
      { validator: checkForUnique, msg: 'categories must be unique' },
      { validator: isArray, msg: 'categories must be an array' },
    ],
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (number) {
        const numAfterDots = decimalCount(number);
        if (numAfterDots > 2) {
          return false;
        }
        return true;
      },
      message: 'There is more than 2 numbers after dot',
    },
  },
  currency: {
    type: String,
    required: true,
  },
  date_of_creation: {
    type: Date,
    required: true,
  },
  date_of_update: {
    type: Date,
  },
});

function arrayLimit(val) {
  return val.length <= 5 && val.length > 0;
}

function isArray(val) {
  return Array.isArray(val);
}

function checkForUnique(arr) {
  return arr.length === new Set(arr).size;
}

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
