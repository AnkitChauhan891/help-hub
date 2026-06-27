const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    ticket_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ticket"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    body: String,
    is_internal: {
        type: Boolean,
        default: false
    }
}, {
    timestamp: true
});

module.exports = mongoose.model("comment", commentSchema);