const express = require('express')
const ride = require('../models/Ride')
const bookvehicle = require('../models/Bookvehicle')
const rating = require('../models/Rating')
const router = require('express').Router();
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'masknxanxlanla';



// post todo
router.post('/postride', fetchuser, async (req, res) =>{        
    try {
        console.log(req.user.id)
        const user = await ride.create({
            user: req.user.id,
            tripfrom : req.body.tripfrom,
            tripto : req.body.tripto,
            travelcost : req.body.travelcost,
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

router.post('/bookride', fetchuser, async (req, res) =>{        
    try {

        const existingScore = await ride.findOne({ _id: req.body.ride });
        existingScore.seatavailable = existingScore.seatavailable - 1;
        await existingScore.save();        

        const user = await bookvehicle.create({
            ride: req.body.ride,
            driver: req.body.driver,
            passenger : req.body.passenger,
            from : req.body.from,
            to : req.body.to,
            date : req.body.date,
            time : req.body.time,
            vehicleNumber : req.body.vehicleNumber
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
        const user = await ride.create({
            ride: req.body.ride,
            driver : req.body.driver,
            passenger : req.body.passenger,
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
router.get('/getrating', fetchuser, async(req, res) =>{
    try {
        const notes = await rating.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})




module.exports = router
