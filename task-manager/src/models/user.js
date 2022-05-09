const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()} , "thisisnewuser")

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findbyCredentials = async (email,password) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('unable to login')
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    
    if(!isMatch) {
        throw new Error('unable to login')
    }
    return user
}

userSchema.pre('save' , async function(next) {
    const user = this
    
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User