const generateCategoryStats = (arr) => {
  const result = {};
  let total = 0;
  arr.forEach((item) => {
    if (item.type === 'expense') {
      for (let title of item.category) {
        if (result[title]) {
          result[title] += item.amount;
        } else {
          result[title] = item.amount;
        }
        total += item.amount;
      }
    }
  });

  const categories = Object.keys(result);
  const stats = categories.map((category) => {
    const percentage = ((result[category] / total) * 100).toFixed(2);
    return {
      category,
      amount: result[category],
      percentage,
    };
  });
  return stats;
};

module.exports = {
  generateCategoryStats,
};
