const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ['client', 'agent', "supervisor", "admin"],
        default: 'client'
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamp: true
});

module.exports = mongoose.model("user", userSchema);