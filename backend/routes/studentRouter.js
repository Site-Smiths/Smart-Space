const express = require('express');
const router = express.Router();
const studentModel = require('../models/student');
const mentorModel = require('../models/mentor');
const { isLoggedIn } = require('../middleware/isLoggedIn');


router.get('/profile', async (req, res) => {
  try {
    const student = await studentModel.findOne({ user: req.user.userid })
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.get("/mentors", async (req, res) => {
  try {
      const { location } = req.query;
      let filter = {};

      if (location) {
          filter.location = location;
      }

      const mentors = await mentorModel.find(filter).populate("user");

      if (mentors.length === 0) {
          return res.status(404).json({ message: "No mentors found" });
      }

      res.status(200).json({ mentors });

  } catch (err) {
      console.error("Error fetching mentors:", err);
      res.status(500).json({ message: err.message });
  }
});

module.exports = router
