const express = require("express");
const router = express.Router();
const {
  registeredUser,
  userLoggedIn,
} = require("../controller/userController");

router.route("/signin").post(userLoggedIn);
router.route("/signup").post(registeredUser);

module.exports = router;
