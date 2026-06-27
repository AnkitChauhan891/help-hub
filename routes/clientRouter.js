const express = require("express");
const clientController = require("../controller/clientController");
const authenticateUser = require("../middleware/authenticateUser");
const clientRouter = express.Router();

clientRouter.get("/", authenticateUser, clientController.getClient);
clientRouter.get("/:id", authenticateUser, clientController.getSpecificClientDetails);
clientRouter.patch("/:id/verify", authenticateUser, clientController.verifiedClientAcount);
clientRouter.patch("/:id/deactivate", authenticateUser, clientController.deactivateClientAcount);

module.exports = clientRouter;