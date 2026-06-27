const express = require("express");
const authController = require("../controller/authController");
const authenticateUser = require("../middleware/authenticateUser");
const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", authenticateUser, authController.me);

module.exports = authRouter;

