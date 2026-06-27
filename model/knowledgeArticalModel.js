const mongoose = require("mongoose");

const knowledgeArticalSchema = mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: String,
    body: String,
    status: {
        type: String,
        enum: ['client', 'agent', "supervisor", "admin"],
        default: 'client'
    }
}, {
    timestamp: true
});

module.exports = mongoose.model("client_account", knowledgeArticalSchema);