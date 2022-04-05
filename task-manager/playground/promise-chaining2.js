require('../src/db/mongoose')
const Task = require('../src/models/task')

const _id = "623b432a039791d80de879b4"

// Task.findByIdAndRemove({_id}).then(task => {
//     console.log(task);
//     return Task.countDocuments({completed: false}).then(result => {
//         console.log(result);
//     })
// }).catch(e => {
//     console.log(e);
// })

const deleteAndCount = async (id) => {
    const taskDelete = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteAndCount(_id).then(count => {
    console.log(count);
}).catch(e => {
    e
})
