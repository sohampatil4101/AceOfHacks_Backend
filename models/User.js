const mongoose = require('mongoose');
const Schema = mongoose
const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    gender:{
        type: String,
        required: true,
    },
    license:{
        type: String,
        required: true,
    },
    aadhar:{
        type: String,
        required: true,
    },
    dob:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },


});

const User = mongoose.model('user', UserSchema);
module.exports = User