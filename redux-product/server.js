const { User, connectDB } = require("./mongodb");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = express();
const PORT = 8000;

server.use(cors());
server.use(bodyParser.json());

server.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({
      name: req.body.name,
      email: req.body.email,
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

server.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res
      .status(200)
      .json({ user: user.email, message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server Started ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
