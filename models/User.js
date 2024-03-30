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
    phone:{
        type: Number,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    license:{
        type: String,
        required: false,
    },
    aadhar:{
        type: String,
        required: false,
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