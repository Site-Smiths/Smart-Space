const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const mentorModel = require('../models/mentor');
const { isLoggedIn } = require('../middleware/isLoggedIn');  // Assuming this is the correct path to your middleware
const { isMentor } = require('../middleware/isMentor');
// Middleware to check if the user is a mentor


// Mentor registration form (GET) - Only accessible to logged-in mentors
router.get("/register/:userId", isLoggedIn, isMentor, async (req, res) => {
    const userId = req.params.userId;
    res.render("mentor-register", { userId });
});

// Handle mentor registration (POST) - Only accessible to logged-in mentors
router.post("/register/:userId", isLoggedIn, isMentor, async (req, res) => {
    const { profilePic, qualifications, subjects, hourlyRate, bio, location } = req.body;

    if (!location) {
        return res.status(400).send("Location is required.");
    }

    const userId = req.params.userId;
    const user = await userModel.findById(userId);
    
    // Create mentor profile
    const mentor = await mentorModel.create({
        user: userId,
        profilePic,
        qualifications,
        subjects,
        hourlyRate,
        bio,
        location,
    });

    // Redirect to mentor's profile
    res.redirect(`/mentor/profile/${mentor._id}`);
});

// View mentor's profile (GET) - Only accessible to logged-in users
router.get("/profile/:mentorId", isLoggedIn, async (req, res) => {
    const mentorId = req.params.mentorId;
    const mentor = await mentorModel.findById(mentorId).populate("user");

    if (!mentor) {
        return res.status(404).send("Mentor not found");
    }

    res.render("mentor-profile", { mentor });
});

module.exports = router;
