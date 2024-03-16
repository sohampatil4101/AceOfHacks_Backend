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
    travelcost:{
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
    vehicleNumber:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('ride', RideSchema);   
