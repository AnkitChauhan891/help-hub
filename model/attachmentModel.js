const mongoose = require("mongoose");

const attachmentSchema = mongoose.Schema({
    ticket_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ticket"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    orignal_file_name: String,
    generated_storage_key: String,
    mime_type: String,
    size_in_bytes: String,
}, {
    timestamp: true
});

module.exports = mongoose.model("attachment", attachmentSchema);