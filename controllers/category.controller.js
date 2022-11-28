const Category = require('../models/category.model');

const getAllCategories = async (req, res) => {
  const user_id = req.user._id;
  try {
    const categories = await Category.find({ user_id });
    res.json(categories);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

const addCategory = async (req, res) => {
  const { type, title } = req.body;
  const user_id = req.user._id;

  try {
    const categories = await Category.find({
      user_id,
      type,
      title,
    });
    if (categories.length > 0) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const category = new Category({
      type,
      title,
      user_id,
    });
    await category.save();

    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByIdAndDelete(id);
    res.json(category);
  } catch (err) {
    res.status(404).json({ error: 'Not Found' });
  }
};

const updateCategoryById = async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  try {
    const oldCategory = await Category.findById(id);
    const categories = await Category.find({
      user_id: req.user._id,
      title,
      type: oldCategory.type,
    });
    if (categories.length > 0) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  deleteCategoryById,
  updateCategoryById,
};
