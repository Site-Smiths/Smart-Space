const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require('../models/user');
const mentorModel = require('../models/mentor');
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { isMentor } = require('../middleware/isMentor');


router.post("/register/:userId", isLoggedIn, async (req, res) => {
  try {
      const { profilePic, qualifications, subjects, hourlyRate, bio, location } = req.body;

      
      if (!location || !location.coordinates || location.coordinates.length !== 2) {
        return res.status(400).send("Location with valid coordinates (longitude, latitude) is required in the format: { type: 'Point', coordinates: [longitude, latitude] }.");
      }

      const { coordinates } = location;
      const [longitude, latitude] = coordinates;  

      
      if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
        return res.status(400).send("Invalid longitude or latitude values.");
      }

      const userId = req.params.userId;
      const user = await userModel.findById(userId).select("-password");

      if (!user) {
          return res.status(404).json({ error: "User not found." });
      }

    
      const mentor = await mentorModel.create({
          user,
          profilePic,
          qualifications,
          subjects,
          hourlyRate,
          bio,
          location: {
              type: "Point", 
              coordinates: [longitude, latitude] 
          },
      });

      
      const newMentor = await mentorModel.findById(mentor._id).populate("user");

      return res.status(201).json({
          message: "Mentor registered successfully",
          mentor: newMentor,
      });

  } catch (err) {
      console.error("Error in /register/:userId route:", err);
      return res.status(500).json({ message: err.message });
  }
});
router.post('/mentors/:mentorId/reviews', isLoggedIn, async (req, res) => {
  try {
    const { mentorId } = req.params;
    const { reviewText, rating } = req.body;

    if (!reviewText || !rating) {
      return res.status(400).json({ message: 'Review text and rating are required.' });
    }

    
    const student = await studentModel.findById(req.user.userid);
    if (!student) {
      return res.status(403).json({ message: 'Only students can leave reviews.' });
    }

  
    const mentor = await mentorModel.findById(mentorId);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found.' });

    const review = {
      reviewer: student._id,
      reviewText,
      rating,
    };

    mentor.reviews.push(review);
    await mentor.save();

    res.status(201).json({ message: 'Review added successfully', mentor });
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


  
  router.get("/profile/:mentorId", isLoggedIn,async (req, res) => {
    try{
      const mentorId = req.params.mentorId;
      const mentor = await mentorModel.findById(mentorId).populate("user");
      
      if (!mentor) return res.status(404).json({ message: "Mentor not found" });
      res.status(200).json({ mentor });
      }
      catch(err){
        console.log("Error fetching mentor profile",err);
        res.status(500).json({ message: err.message });
      }
  
  });
  router.get("/mentors", async (req, res) => {
    try {
      const { longitude, latitude, radius } = req.query;

      let filter = {};

      
      if (longitude && latitude) {
          const location = {
              type: "Point",
              coordinates: [parseFloat(longitude), parseFloat(latitude)], 
          };

          filter.location = {
              $near: {
                  $geometry: location, 
                  $maxDistance: radius ? parseInt(radius) : 5000, 
              }
          };
        }

        const mentors = await mentorModel.find(filter).populate("user");

        if (mentors.length === 0) {
            return res.status(404).json({ message: "No mentors found" });
        }

        res.status(200).json({ mentors });

    } catch (err) {
        console.error("Error fetching mentors:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




module.exports = router;
