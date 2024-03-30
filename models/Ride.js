const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const {Schema} = mongoose

const RideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    tripfrom:{
        type: String,
        required: true
    },
    tripto:{
        type: String,
        required: true
    },
    description:{   
        type: String,
        required: true
    },
    vehicletype:{
        type: String,
        required: true
    },
    vehiclecapacity:{
        type: Number,
        required: true
    },
    seatavailable:{
        type: Number,
        required: true
    },
    vehicleNumber:{
        type: String,
        required: true
    },
    time:{
        type: String,
        require: true
    },
    date:{
        type: String,
        require: true
    },


});
module.exports = mongoose.model('ride', RideSchema);   

