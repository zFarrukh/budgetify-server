const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (email) {
        return validator.isEmail(email);
      },
      message: 'Please enter a valid email',
    },
  },
  password: {
    required: [true, 'Password is required'],
    type: String,
    trim: true,
    minlength: 8,
  },
  name: {
    type: String,
    trim: true,
    minlength: 1,
  },
  role: {
    default: 'user',
    type: String,
    trim: true,
  },
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const match = await bcrypt.compare(candidatePassword, this.password);

  return match;
};

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, 8, function (err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
