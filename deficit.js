const mergeMonthsAndAverage = require('./merge-months-amount-average')
const spreadData = require('./spread-months-data')
const { hebMonthLabel } = require('../consts')

const {
  july,
  august,
} = hebMonthLabel

module.exports = async (categories, logger) => {
  try {
    logger.debug('start deficit reason format builder func')
    const lastYear = new Date().getFullYear() - 1
    const summerMonths = []
    const restYearMonths = []

    categories.flatMap(((category) => {
      const {
        year,
        month,
        data,
      } = category
      if (lastYear === year) {
        (month >= july && month <= august) ? summerMonths.push({ data })
          : restYearMonths.push({ data })
      }
      return {}
    }))
    const newSummerMonths = spreadData(summerMonths)
    const newRestYearMonth = spreadData(restYearMonths)

    const mergedSummerMonths = mergeMonthsAndAverage(newSummerMonths, summerMonths.length)
    const mergedRestYearMonths = mergeMonthsAndAverage(newRestYearMonth, restYearMonths.length)
    console.log(` THIS IS SHITTT ${mergedSummerMonths}`)
    const diffAmount = mergedSummerMonths.map((summerData, index) => Math.floor(summerData.amount - mergedRestYearMonths[index].amount))
    const diffPercent = mergedSummerMonths.map((summerData, index) => Math.floor(Math.abs(((summerData.amount - mergedRestYearMonths[index].amount) / mergedRestYearMonths[index].amount) * 100)))
    const sign = diffAmount.map((number) => (number > -1 ? {
      arrow: 'arrow-up',
      numColor: '#3a9c99',
    }
      : {
        arrow: 'arrow-down',
        numColor: '#f0000c',
      }))

    const highestCalculateDifference = mergedSummerMonths.map((data) => {
      const {
        category,
        amount,
      } = data
      return {
        label: category,
        last3monthAmount: amount,
      }
    })
    const firstDeficit = highestCalculateDifference.length > 0 ? { ...highestCalculateDifference[0] } : {}
    const secondDeficit = highestCalculateDifference.length > 1 ? { ...highestCalculateDifference[1] } : {}
    const thirdDeficit = highestCalculateDifference.length > 2 ? { ...highestCalculateDifference[2] } : {}
    return {
      deficitReasonFormatedObj: {
        firstDeficit,
        secondDeficit,
        thirdDeficit,
        diffPercent,
        sign,
      },
    }
  } catch (e) {
    logger.error({ stack: e.stack }, 'error with building deficit reason data', { message: e.toString() })
    return {
      success: true,
    }
  }
}
