// setTimeout(() => {
//     console.log("two seconds");
// }, 2000)

// const names = ['memase' , 'masa', 'mojojojo', 'dor']
// const shortNames = names.filter(name => {return name.length <= 4})

// const geocode = (address , callback) => {
//     setTimeout(() => {
//         const data = {
//             latitude: 0,
//             longtitude: 0
//         }
//         callback(data)
//     },3000)
// }

// geocode('tel aviv',(data) => {console.log(data);})




const add = (num1,num2,callback) => {
    setTimeout(() => {
        const data = num1 + num2
        callback(data)
    }, 2000)
}
add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})
