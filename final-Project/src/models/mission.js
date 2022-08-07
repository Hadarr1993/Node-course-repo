const mongoose = require('mongoose')

const Mission = mongoose.model('Mission' , {
    title: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true
    },
    owner: {
        type: String,
        require: true,
        default: ""
    },
    status: {
        default: "backlog",
        type:String
    }    
})

module.exports = Mission