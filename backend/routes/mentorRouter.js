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

router.get("/register/:userId",isMentor, async (req, res) => {
    const userId = req.params.userId;
    res.render("mentor-register", { userId });
  });
  

  router.post("/register/:userId",isMentor, async (req, res) => {
      const { profilePic, qualifications, subjects, hourlyRate, bio, location } = req.body;
      if (!location) {
        return res.status(400).send("Location is required.");
      }
      const userId = req.params.userId;
      const user = await userModel.findById(userId);
      
      const mentor = await mentorModel.create({
          user: userId,
          profilePic,
          qualifications,
          subjects,
          hourlyRate,
          bio,
          location,
        });
        res.redirect(`/mentor/profile/${mentor._id}`);
  });

  
  router.get("/profile/:mentorId", async (req, res) => {
      const mentorId = req.params.mentorId;
      const mentor = await mentorModel.findById(mentorId).populate("user");
      
      if (!mentor) {
          return res.status(404).send("Mentor not found");
        }
        res.render("mentor-profile", { mentor });
  
  });
  

module.exports = router