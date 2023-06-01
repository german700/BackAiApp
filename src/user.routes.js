const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.post("/create", userController.create);
router.post("/login", userController.login);

module.exports = router;
