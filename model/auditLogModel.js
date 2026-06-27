const mongoose = require("mongoose");

const auditLogSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    action_performed: String,
    entity_type_affected: String,
    entity_type_id: String,
    metadata: String,
}, {
    timestamp: true
});

module.exports = mongoose.model("status_history", auditLogSchema);