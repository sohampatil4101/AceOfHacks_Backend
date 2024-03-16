const express = require('express')
const ride = require('../models/Ride')
const car = require('../models/Todoscore')
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
        const existingScore = await todoscore.findOne({ user: req.user.id });

        if (!existingScore) {
            // If no score entry exists for the user, create a new one
            const newScore = new todoscore({
                user: req.user.id,
                score: req.body.score
            });
            await newScore.save();
        } else {
            // If a score entry exists, update the score by adding the provided score
            existingScore.score += req.body.score;
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
