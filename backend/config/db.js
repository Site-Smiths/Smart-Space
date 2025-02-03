const mongoose = require('mongoose');

const DB_URI = 'mongodb+srv://sitesmiths:12345@devjam1.fe87g.mongodb.net/';

mongoose.connect(DB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully');
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });


module.exports = mongoose.connection;