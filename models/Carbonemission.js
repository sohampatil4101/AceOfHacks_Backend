const mongoose = require('mongoose');
const {Schema} = mongoose

const RideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    carbonscore:{
        type: String,
        required: true
    },
    totalrides_othersvehicles:{
        type: String,
        required: true
    },
    ownvehicles:{
        type: String,
        required: true
    },
    totalrides_othersvehicles_km:{
        type: String,
        required: true
    },
    ownvehicles_km:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('ride', RideSchema);   

