const mongoose = require('mongoose')
const validator = require('validator')


const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,

    },
    password: {
        type: String,
        require: true,
        trim: true,
        minLength: 6,
    },
    age: {
        type: Number,
        default: 0,
    }
})

module.exports = User