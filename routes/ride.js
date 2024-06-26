const express = require('express')
const ride = require('../models/Ride')
const bookvehicle = require('../models/Bookvehicle')
const user = require('../models/User')
const rating = require('../models/Rating')
const router = require('express').Router();
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'masknxanxlanla';



// post ride
router.post('/postride', fetchuser, async (req, res) =>{        
    try {
        console.log(req.user.id)
        const user = await ride.create({
            user: req.user.id,
            tripfrom : req.body.tripfrom,
            tripto : req.body.tripto,
            description : req.body.description,
            vehicletype : req.body.vehicletype,
            vehiclecapacity : req.body.vehiclecapacity,
            seatavailable : req.body.seatavailable,
            vehicleNumber : req.body.vehicleNumber,
            payment : req.body.payment,
            date : req.body.date,
            time : req.body.time,
        })        
        success = true
        res.json({success})
}
catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
}})

// get ride
router.post('/getrideinfo', fetchuser, async (req, res) =>{        
    try {

        const user = await ride.findById({_id: req.body.id})        
        success = true
        res.json({user})
}
catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
}})



router.post('/bookride', fetchuser, async (req, res) =>{        
    try {

        const existingScore = await ride.findOne({ _id: req.body.ride });
        existingScore.seatavailable = existingScore.seatavailable - 1;
        await existingScore.save();        

        const user = await bookvehicle.create({
            ride: req.body.ride,
            driver: req.body.driver,
            passenger : req.body.passenger
        })        
        success = true
        res.json({success})
}
catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
}})



// post payment done
router.post('/paymentdone', fetchuser, async (req, res) => {
    try {
        console.log(req.user.id);
        const existingScore = await bookvehicle.findOne({ _id: req.body.id });
        existingScore.payment = "payment completed";
        existingScore.amountpaid = req.body.amountpaid;
        existingScore.km = req.body.km;
        await existingScore.save();

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});



router.post('/getride', fetchuser, async (req, res) => {
    try {
        const tripfromRegex = new RegExp(req.body.tripfrom, 'i'); // 'i' flag for case-insensitive search
        const triptoRegex = new RegExp(req.body.tripto, 'i');

        const notes = await ride.find({
            tripfrom: { $regex: tripfromRegex },
            tripto: { $regex: triptoRegex }
        });

        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occurred");
    }
});



// route to post ratings
router.post('/addrating', fetchuser, async (req, res) =>{        
    try {
        console.log(req.user.id)
        const user = await rating.create({
            ride: req.body.ride,
            driver : req.body.driver,
            passenger : req.user.id,
            rating : req.body.rating,
            review : req.body.review
        })        
        success = true
        res.json({success})
}
catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
}})

// route to get my rides scheduled
router.post('/getrating', fetchuser, async(req, res) =>{
    try {
        const notes = await rating.find({driver: req.body.id});
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})

// get username for given ids
router.post('/getusername', fetchuser, async(req, res) =>{
    try {
        const notes = await user.findOne({_id: req.body.id});
        res.json(notes.name)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some error occured")
    }
})

// get username 
router.get('/getmydata', fetchuser, async(req, res) =>{
    try {
        console.log(req.user.id)
        const notes = await user.findById({_id: req.user.id});
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})
// get average rating 
router.post('/getaveragerating', fetchuser, async (req, res) => {
    try {
        const ratings = await rating.find({ driver: req.body.id });

        // Check if there are any ratings
        if (ratings.length === 0) {
            return res.status(404).json({ message: "No ratings found for this driver." });
        }

        let sum = 0;
        ratings.forEach((rating) => {
            sum += rating.rating; // Use 'rating' field to get the rating value
        });

        const averageRating = sum / ratings.length;

        res.json({ averageRating });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occurred");
    }
});




module.exports = router
