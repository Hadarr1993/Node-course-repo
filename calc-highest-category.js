module.exports = (array) => {
    const result = Object.values(array.reduce((acc, obj) => {
        acc[obj.category] = (acc[obj.category] && acc[obj.category].amount > obj.amount) ? acc[obj.category] : obj
      
        return acc
      }, {}))
      return result
}