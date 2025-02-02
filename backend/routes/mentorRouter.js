const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require('../models/user');
const mentorModel = require('../models/mentor');
const { isLoggedIn } = require('../middleware/isLoggedIn');  // Assuming this is the correct path to your middleware
const { isMentor } = require('../middleware/isMentor');




// router.get("/register/:userId", isLoggedIn, isMentor, async (req, res) => {
//     const userId = req.params.userId;
//     res.render("mentor-register", { userId });
// });

router.post("/register/:userId", isLoggedIn,async (req, res) => {
  try {
      const { profilePic, qualifications, subjects, hourlyRate, bio, location } = req.body;

      if (!location) {
          return res.status(400).send("Location is required.");
      }

      const userId = req.params.userId;
      const user = await userModel.findById(userId).select("-password");

      if (!user) {
          return res.status(404).json({ error: "User not found." });
      }

      const mentor = await mentorModel.create({
          mentorId: userId,
          profilePic,
          qualifications,
          subjects,
          hourlyRate,
          bio,
          location,
      });

      const newMentor = await mentorModel.findById(mentor._id).populate("user");

      return res.status(201).json({
          message: "Mentor registered successfully",
          mentor: newMentor,
      });

  } catch (err) {
      console.error("Error in /register/:userId route:", err); 
      return res.status(500).json({ message:err.message });
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

module.exports = router;
