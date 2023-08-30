const express = require("express");

const {
  registeredUser,
  userLoggedIn,
} = require("../controller/userController");
const router = express.Router();
router.route("/signin").post(userLoggedIn);
router.route("/signup").post(registeredUser);

module.exports = router;
