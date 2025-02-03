const express = require('express');
const router = express.Router();
const studentModel = require('../models/student');
const { isLoggedIn } = require('../middleware/isLoggedIn');


router.get('/profile', async (req, res) => {
  try {
    const student = await studentModel.findOne({ user: req.user.userid }).populate('reviews.mentor');
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/updateProfile',  async (req, res) => {
  try {
    const { location, courses } = req.body;
    const updatedProfile = {};

    if (location) updatedProfile.location = location;
    if (courses && Array.isArray(courses)) updatedProfile.courses = courses;

    const student = await studentModel.findOneAndUpdate(
      { user: req.user.userid },
      updatedProfile,
      { new: true }
    );

    if (!student) return res.status(404).send('Student not found');
    res.redirect('/student/profile');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Add a review for a mentor
// router.post('/reviews', isLoggedIn, async (req, res) => {
//   try {
//     const { mentorId, content, rating } = req.body;

//     if (!mentorId || !content) {
//       return res.status(400).send('Mentor and content are required');
//     }

//     const student = await studentModel.findOne({ user: req.user.userid });
//     if (!student) return res.status(404).send('Student not found');

//     // Add the review
//     const review = {
//       mentor: mentorId,
//       content,
//       rating: rating || 5, // Default to 5 stars if not provided
//     };
//     student.reviews.push(review);

//     await student.save();
//     res.send('Review added successfully');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // Fetch all reviews for a mentor
// router.get('/reviews/:mentorId', async (req, res) => {
//   try {
//     const { mentorId } = req.params;

//     const students = await studentModel.find({ 'reviews.mentor': mentorId })
//       .select('reviews')
//       .populate('reviews.mentor', 'name');

//     if (!students.length) return res.status(404).send('No reviews for this mentor');

//     const reviews = students.flatMap(student => student.reviews.filter(review => review.mentor.toString() === mentorId));
//     res.json(reviews);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

module.exports = router
