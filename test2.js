
const { categories } = require('./data.json')

// const sorted =  categories.sort((a,b) => {
//     return a.month - b.month
// })

// const lastYear = new Date().getFullYear() - 1

// const summerMerged = (lb, hb, sortedArr) => {
//     const summerData = []
//     sortedArr.flatMap((category) => {
//         const {
//           year,
//           month,
//           data 
//         } = category


//         lastYear != year ? null : 
//         (month == lb) ?  summerData.push(data)  : 
//         (month <= hb) ? data.flatMap(element => {
//             summerData.map(record => {
//                 if(record.category === element.category)
//                   record.amount += element.amount
//             })
//         }) : null           
//     })
//     return summerData
// }
// console.log(summerMerged(7,8, sorted)) 
const lastYear = new Date().getFullYear() -1


const summerArr = categories.flatMap(((category) => {
    const {
      year,
      month,
      data,
    } = category
    const summerData = []
    if (lastYear === year) {
      summerData.push((month >= 7 && month <= 8) ? { data } : [])
    }
    return summerData
  }))
  console.log(JSON.stringify(summerArr));

// const restYearArr = categories.flatMap((category => {
//   const {
//     year,
//     month,
//     data,
//   } = category
  
//   const restYearData = lastYear != year ? [] :
//   (month < 7 || month > 8) ? {
//     year,
//     month,
//     data,
//   } : []
//   return restYearData
// }))

// console.log(summerArr);
// const arrangeData = (data) => {
//   const arrangedData = {}
//   for (i of data) {
//     for (j of i.data) {
//       if (arrangedData[j.category]) {
//         arrangedData[j.category] += j.amount
//       }
//       else {
//         arrangedData[j.category] = j.amount
//       }
//     }
//   }
// }

// const initialValue = [
//   {
//     category: "סכום רכישות ענף משק חברות ביטוח",
//     amount: 0
//   },
//   {
//     category: "סכום רכישות ענף משק סופרמרקט",
//     amount: 0
//   },
//   {
//     category: "סכום רכישות ענף משק הלבשה",
//     amount: 0
//   }
// ]


// console.log(initialValue);
