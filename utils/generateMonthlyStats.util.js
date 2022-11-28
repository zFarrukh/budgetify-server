const generateMonthlyStats = (arr) => {
  const result = [];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const transactionsByMonth = arr.reduce((acc, item) => {
    const month =
      months[item.date_of_creation.getMonth()] +
      ' ' +
      item.date_of_creation.getFullYear();

    if (!acc[month]) {
      acc[month] = {
        month,
        income: 0,
        expense: 0,
        economy: 0,
        economy_percentage: 0,
      };
    }
    if (item.type === 'income') {
      acc[month].income += item.amount;
    } else {
      acc[month].expense += item.amount;
    }
    return acc;
  }, {});

  const economyByMonth = Object.keys(transactionsByMonth).reduce(
    (acc, month) => {
      const income = transactionsByMonth[month].income;
      const expense = transactionsByMonth[month].expense;
      const economy = income - expense;
      let economyPercentage = (economy / income) * 100;
      if (income === 0) {
        economyPercentage = 0;
      }

      acc[month] = {
        month,
        income,
        expense,
        economy,
        economy_percentage: economyPercentage.toFixed(2),
      };
      return acc;
    },
    {}
  );
  Object.keys(economyByMonth).forEach((month) => {
    result.push(economyByMonth[month]);
  });
  return result;
};

module.exports = { generateMonthlyStats };

// Should be added year
