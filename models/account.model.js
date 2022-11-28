const mongoose = require('mongoose');

const { decimalCount } = require('../utils/decimalCount.util');

const accountSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    maxlength: 128,
    minlength: 1,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    maxlength: 256,
    minlength: 1,
    trim: true,
  },
  currency: {
    type: String,
    trim: true,
    minlength: 1,
  },
  amount: {
    type: Number,
    trim: true,
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
  dateOfCreation: {
    type: Date,
  },
  dateOfUpdate: {
    type: Date,
  },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
