const express = require('express')
const ride = require('../models/Ride')
const carbon = require('../models/Carbon')
const router = require('express').Router();
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'masknxanxlanla';




// Route to add score
router.post('/postemissionscore', fetchuser, async (req, res) => {
    try {
        console.log(req.user.id);
        const existingScore = await carbon.findOne({ user: req.user.id });

        if (!existingScore) {
            // If no score entry exists for the user, create a new one
            const newScore = new carbon({
                user: req.user.id,
                carbonscore: req.body.carbonscore,
                totalrides_othersvehicles: req.body.totalrides_othersvehicles,
                totalrides_ownvehicles: req.body.totalrides_ownvehicles,
                totalrides_othersvehicles_km: req.body.totalrides_othersvehicles_km,
                totalrides_ownvehicles_km: req.body.totalrides_ownvehicles_km
            });
            await newScore.save();
        } else {
            // If a score entry exists, update the score by adding the provided score
            existingScore.carbonscore += req.body.carbonscore;
            existingScore.totalrides_othersvehicles += req.body.totalrides_othersvehicles;
            existingScore.totalrides_ownvehicles += req.body.totalrides_ownvehicles;
            existingScore.totalrides_othersvehicles_km += req.body.totalrides_othersvehicles_km;
            existingScore.totalrides_ownvehicles_km += req.body.totalrides_ownvehicles_km;
            await existingScore.save();
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
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
