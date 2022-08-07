module.exports = (previousArr) => {
    const newArr = []
    previousArr.map((el) => newArr.push(...el.data))
    return newArr
  }
  