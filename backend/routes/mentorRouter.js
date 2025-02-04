const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require('../models/user');
const mentorModel = require('../models/mentor');
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { isMentor } = require('../middleware/isMentor');
const upload = require('../config/multerconfig')
const cloudinary = require("../config/cloudinary");


router.post("/register/:userId", isLoggedIn,upload.single("profilePic"), async (req, res) => {
  try {
      const { qualifications, subjects, hourlyRate, bio, location } = req.body;

      
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
      if (!req.file) {
        return res.status(400).send("No profile picture uploaded.");
      }
      const imageUrl = req.file.path;
      const mentor = await mentorModel.create({
          user,
          profilePic:imageUrl,
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
