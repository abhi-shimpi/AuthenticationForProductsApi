const express = require("express");
const signupController = require("../controller/signup");

const router = express.Router();
router.post("/", signupController.signup);

module.exports = router;
