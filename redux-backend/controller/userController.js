const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/User");

// Registration endpoint

const registeredUser = async (req, res) => {
  // Validation errors
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({
      name,
      email,
      password,
    });
    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Create and send JWT token
    const payload = {
      _id: user._id,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRETE, // Use your secret key for signing the token
      { expiresIn: "15d" }, // Token expiration time (adjust as needed)
      (err, token) => {
        if (err) throw err;
        const response = {
          token,
          _id: user._id,
          name: user.name,
          email: user.email,
        };
        res.json(response);
      }
    );
  } catch (err) {
    // console.error(err.message);
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

// Login endpoint

const userLoggedIn = async (req, res) => {
  // Validation errors

  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    console.log(user.id);

    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Email or Password Incorrect" });
    }

    // Create and send JWT token
    const payload = {
      _id: user._id,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRETE, // Use your secret key for signing the token
      { expiresIn: "15d" }, // Token expiration time (adjust as needed)
      (err, token) => {
        if (err) throw err;
        const response = {
          token,
          _id: user._id,
          name: user.name,
          email: user.email,
        };
        res.json(response);
      }
    );
  } catch (err) {
    // console.error(err.message);
    res.status(401).json({
      msg: "Email Not Found",
    });
  }
};

module.exports = { registeredUser, userLoggedIn };
