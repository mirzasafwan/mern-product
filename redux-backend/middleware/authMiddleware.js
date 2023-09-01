require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const asyncHandler = require("express-async-handler");
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token:", token); // Add this line to check the extracted token
      const decoded = jwt.verify(token, process.env.JWT_SECRETE);
      req.user = await User.findById(decoded._id).select("-password");
      next();
    } catch (e) {
      res
        .status(401)
        .json({ error: "Token verification failed", message: e.message });
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized ,no token");
  }
});
module.exports = { protect };
