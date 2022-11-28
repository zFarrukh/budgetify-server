const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  type: {
    required: true,
    trim: true,
    type: String,
    validate: {
      validator: function (type) {
        if (type === 'income' || type === 'expense') {
          return true;
        }
        return false;
      },
      message: 'type should be income or expense',
    },
  },
  title: {
    type: String,
    maxlength: 128,
    minlength: 1,
    trim: true,
    required: true,
  },
  user_id: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
