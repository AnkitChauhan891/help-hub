const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    channel: {
        type: String,
        enum: ['email', 'internal'],
    },
    event_type: String,
    payload: String,
    is_read: {
        type: Boolean,
        default: false
    }

}, {
    timestamp: true
});

module.exports = mongoose.model("notification", notificationSchema);