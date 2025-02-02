const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, 
    bio: { type: String, required: true },
    subjects: { type: [String], required: true },
    availability: { type: [String], required: true }, 
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: false }
    },
});

mentorSchema.index({ location: '2dsphere' }); 
module.exports = mongoose.model('Mentor', mentorSchema);
