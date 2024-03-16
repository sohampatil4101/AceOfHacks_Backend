const express = require('express')
const ride = require('../models/Ride')
const todoscore = require('../models/Todoscore')
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
            vehicleNumber : req.body.vehicleNumber,
        })
        
        success = true
        res.json({success})
    
    
}    

catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
}


})


// fetch todo
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



// route to get the score
router.get('/fetchmytodoscore', fetchuser, async(req, res) =>{
    try {
        const notes = await todoscore.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
    }
})




module.exports = router
