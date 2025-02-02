const express=require('express');
const router = express.Router();
const userModel = require('../models/user');
const mentorModel = require('../models/mentor');

async function isMentor(req, res, next) {
    const user = await userModel.findById(req.params.userId);
    if (!user || user.role !== "mentor") {
        return res.redirect("/register");
    }
    req.user = user; 
    next();
}

router.get("/users/:userId",isMentor, async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await userModel.findById(userId).select("-password");
      if (!user) {
        return res.status(404).send("User not found");
      }


      return res.status(200)
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
      
    }
  });
  

  router.post("/register/:userId",isMentor, async (req, res) => {
      const { profilePic, qualifications, subjects, hourlyRate, bio, location } = req.body;
      if (!location) {
        return res.status(400).send("Location is required.");
      }
      const userId = req.params.userId;
      const user = await userModel.findById(userId).select("-password");
      
      const mentor = await mentorModel.create({
          user: userId,
          profilePic,
          qualifications,
          subjects,
          hourlyRate,
          bio,
          location,
        });
      const newMentor = await mentorModel.findById(mentor._id).populate("user");
      return res.status(201).json(200, {newMentor}, "Mentor registered successfully"); 
  });

  
  router.get("/profile/:mentorId", async (req, res) => {
    try{
      const user = req.user;
      const mentorId = req.params.mentorId;
      const mentor = await mentorModel.findById(mentorId).populate("user");
      
      if (!mentor) return res.status(404).json({ message: "Mentor not found" });
      res.status(200).json({ mentor });
      }
      catch(err){
        res.status(500).json({ message: "Something went wrong" });
      }
  
  });
  

module.exports = router