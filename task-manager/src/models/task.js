const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task', {
    name: {
        type: String,
        require:true,
        trim:true
    },
    description: {
        type: String,
        require: true,
        trim:true
        
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task
