const mongoose = require('mongoose')

const Employee = mongoose.model('employee' , {
    name: {
        type:String,
        require:true,
        trim: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type:String,
        require: true
        
    },
    level: {
        type:String,
        default: "junior"

    }
})

module.exports = Employee