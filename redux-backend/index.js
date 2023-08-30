require("dotenv").config(); // Load environment variables from .env file

// Now you can access environment variables using process.env
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const { connectDB } = require("./models/User");
const userRoute = require("./route/userRoute");

const app = express();

app.use(cors());
app.use("/", userRoute);

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.json("hello");
});

// Routes

app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
  connectDB();
});

// Start the server
