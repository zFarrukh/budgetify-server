const defaultCategories = [
  {
    title: 'Food',
    type: 'expense',
  },
  {
    title: 'Transportation',
    type: 'expense',
  },
  {
    title: 'Housing',
    type: 'expense',
  },
  {
    title: 'Education',
    type: 'expense',
  },
  {
    title: 'Shopping',
    type: 'expense',
  },
  {
    title: 'Kids',
    type: 'expense',
  },
  {
    title: 'Entertainment',
    type: 'expense',
  },
  {
    title: 'Health and Beauty',
    type: 'expense',
  },
  {
    title: 'Pet',
    type: 'expense',
  },
  {
    title: 'Internet',
    type: 'expense',
  },
  {
    title: 'Mobile',
    type: 'expense',
  },
  {
    title: 'Salary',
    type: 'income',
  },
  {
    title: 'Dept repayments',
    type: 'income',
  },
  {
    title: 'Gifts',
    type: 'income',
  },
  {
    title: 'rental income',
    type: 'income',
  },
  {
    title: 'premium/bonus',
    type: 'income',
  },
];

const generateDefaultCategories = (userId) => {
  return defaultCategories.map((category) => {
    const newCategory = {
      user_id: userId,
      title: category.title,
      type: category.type,
    };
    return newCategory;
  });
};

module.exports = generateDefaultCategories;
