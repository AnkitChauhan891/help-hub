const express = require("express");
const dotenv = require('dotenv').config();
const errorHandler = require("./middleware/errorHandler");
const dbConnect = require("./config/dbConnection");
const authRouter = require("./routes/authRouter");
const clientRouter = require("./routes/clientRouter");

const app = express();

const port = process.env.PORT || 3030;

dbConnect();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/clients", clientRouter);
// app.use("/api/tickets", (req, res, next) => {});
// app.use("/api/attachments", (req, res, next) => {});
// app.use("/api/articles", (req, res, next) => {});
// app.use("/api/reports", (req, res, next) => {});
// app.use("/api/admin", (req, res, next) => {});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listing on port ${port}`);
});