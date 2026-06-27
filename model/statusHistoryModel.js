const mongoose = require("mongoose");

const statusHistorySchema = mongoose.Schema({
    ticket_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ticket"
    },
    from_status: String,
    to_status: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    timestamp: true
});

module.exports = mongoose.model("status_history", statusHistorySchema);