const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/SmartSpace');

const userSchema =  mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profilePic: {
        type: String,
        default: 'default.jpg'
    },
});


module.exports = mongoose.model('user', userSchema);