const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    register: {
        type: Date,
        default: Date.now()
    },
    favMovies: [{
        type: String,
        required: false
    }]
})

module.exports = mongoose.model('User', UserSchema);
