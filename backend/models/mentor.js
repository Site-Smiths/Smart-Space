const mongoose = require('mongoose');
const userModel = require('./user'); 

const mentorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    },
    profilePic: {
        type: String,
        default: "default-profile-pic.jpg",
    },
    qualifications: { 
        type: [String], 
        default: [] 
    },
    subjects: { 
        type: [String], 
        default: [] 
    },
    hourlyRate: {
        type: Number,
        default: 300,
    },
    // availability: {
    //     type: Map,
    //     of: String,
    //     default: {},
    // },
    bio: {
        type: String,
        default: "",
    },
    reviews: [{
        reviewer: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
    }],
    location: {
        type: String,
        default: "",
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('mentor', mentorSchema);
