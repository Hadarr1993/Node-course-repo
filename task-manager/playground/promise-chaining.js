require('../src/db/mongoose')
const User = require('../src/models/user')

const _id = "624ae38918993d8767e41885"
 
const updateAgeAndCount = async (_id, age) => {
    const user = await User.findByIdAndUpdate(_id , {age})
    const count = await User.countDocuments({age})
    return count
}
updateAgeAndCount(_id, 4).then(count => {
    console.log(count);
}).catch(e => {
    console.log(e);
})