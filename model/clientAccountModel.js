const mongoose = require("mongoose");

const clientAccountSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    company_name: String,
    billing_reference: String,
    is_verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamp: true,
    strictPopulate: false
});

module.exports = mongoose.model("client_account", clientAccountSchema);