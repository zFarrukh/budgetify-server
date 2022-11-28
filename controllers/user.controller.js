const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const Category = require('../models/category.model');
const generateDefaultCategories = require('../utils/generateDefaultCategories.util');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Bad Request' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: 'email is not valid',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: 'Unathorized',
      });
    }

    const match = await user.comparePassword(password);
    if (match) {
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return res.status(200).json({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        token: `${token}`,
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
    }
    return res.status(401).json({
      error: 'Unauthorized',
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

const registerUser = async (req, res) => {
  const { email, password, role, name } = req.body;
  try {
    const user = new User({ email, password, role, name });
    await user.save();
    await Category.insertMany(generateDefaultCategories(user._id));
    res.status(201).json(user);
  } catch (err) {
    res.status(401).json({ error: 'Bad request' });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
