const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    Name: String,
    type: {
        type: String,
        enum: ['ticket', 'article']
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamp: true
});

module.exports = mongoose.model("category", categorySchema);