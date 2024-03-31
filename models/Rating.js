const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const {Schema} = mongoose

const RatingSchema = new mongoose.Schema({
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
    rating:{
        type: Number,
        required: true
    },
    review:{
        type: String,
        required: false
    },   
    date:{
        type: Date,
        default: Date.now
    },


});
module.exports = mongoose.model('ratng', RatingSchema);   

