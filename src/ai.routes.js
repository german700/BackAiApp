const express = require("express");
const controller = require("./ai.controller");
const router = express.Router();

router.post("/predict", controller.predict);

module.exports = router;
