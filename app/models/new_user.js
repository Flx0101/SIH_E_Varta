const mongoose = require('mongoose');

const NUserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('NUser', NUserSchema);