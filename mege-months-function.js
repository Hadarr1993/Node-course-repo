module.exports = (monthsArr, devide) => {
    const mergedArr = Array.from(monthsArr.reduce(
      (acc, {
        category, amount,
      }) => acc.set(category, Math.floor((acc.get(category) || 0) + amount / devide)), new Map(),
    ), ([category, amount]) => ({
      category, amount,
    }))
    return mergedArr
  }
  