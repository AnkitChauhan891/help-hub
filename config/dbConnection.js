const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const client = await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log("Database Connected: " + client.connection.name);
    } catch (err) {
        console.log("Database connection failed. Error: " + err);
    }
}

module.exports = dbConnect;