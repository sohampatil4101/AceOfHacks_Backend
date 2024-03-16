const mongoose = require('mongoose');
const {Schema} = mongoose

const CarbonSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    carbonscore:{
        type: Number,
        required: true
    },
    totalrides_othersvehicles:{
        type: Number,
        required: true
    },
    totalrides_ownvehicles:{
        type: Number,
        required: true
    },
    totalrides_othersvehicles_km:{
        type: Number,
        required: true
    },
    totalrides_ownvehicles_km:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('carbon', CarbonSchema);   

