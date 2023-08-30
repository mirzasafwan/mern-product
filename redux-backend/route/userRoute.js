const express = require("express");
const cors = require("cors");
const {
  registeredUser,
  userLoggedIn,
} = require("../controller/userController");
const router = express.Router();

router.route("/register").post(registeredUser);
router.route("/login").post(userLoggedIn);

module.exports = router;
