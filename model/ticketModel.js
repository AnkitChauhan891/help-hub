const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
    client_account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client_account"
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    title: String,
    description: String,
    priority: {
        type: String,
        enum: ['low', 'normal', "high", "urgent"],
        default: 'low'
    },
    status: {
        type: String,
        enum: ['open', 'in_progress', "resolved", "closed", "reopened"],
        default: 'low'
    },
    user_agent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    timestamp: true
});

module.exports = mongoose.model("ticket", ticketSchema);