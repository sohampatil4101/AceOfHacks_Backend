const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const {Schema} = mongoose

const BookvehicleSchema = new mongoose.Schema({
    ride:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ride',
    },  
    driver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    passenger:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    km:{
        type: Number,
        required: true,
        default:0
    },
    amountpaid:{
        type: Number,
        required: true,
        default:0
    },
    payment:{
        type: String,
        required: true,
        default:"not paid"
    },


});
module.exports = mongoose.model('bookvehicle', BookvehicleSchema);   

