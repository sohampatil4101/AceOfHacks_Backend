const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const {Schema} = mongoose

const BookvehicleSchema = new mongoose.Schema({
    driver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    passenger:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    from:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    vehicleNumber:{
        type: String,
        required: true
    },
    payment:{
        type: String,
        required: true,
        default:"not paid"
    },


});
module.exports = mongoose.model('bookvehicle', BookvehicleSchema);   

