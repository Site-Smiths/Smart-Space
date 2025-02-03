const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require('../models/user');
const mentorModel = require('../models/mentor');
const { isLoggedIn } = require('../middleware/isLoggedIn');  // Assuming this is the correct path to your middleware
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

      // Check if longitude, latitude, and radius are provided
      if (longitude && latitude) {
          const location = {
              type: "Point",
              coordinates: [parseFloat(longitude), parseFloat(latitude)], // [longitude, latitude]
          };

          filter.location = {
              $near: {
                  $geometry: location, // Center point
                  $maxDistance: radius ? parseInt(radius) : 5000, // Default radius 5km
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
