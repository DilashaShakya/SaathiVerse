const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },

    email: {
        type : String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    userName:{
        type: String,
        required: true,
        minlength:4,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    avatar:{
        type: String,
        default: null,
    },
    bio: {
        type: String,
        default: null,
    },
    
})

const User = mongoose.model('User', userSchema)
module.exports = User;