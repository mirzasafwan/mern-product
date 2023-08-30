require("dotenv").config(); // Load environment variables from .env file

// Now you can access environment variables using process.env

const { connectDB } = require("./models/User");
const express = require("express");
const cors = require("cors");
// const userRoute = require("./route/userRoute");
const app = express();
app.use(express.json({ extended: false }));
app.use(cors());
const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.json("hello");
});

// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://mern-product-frontend.vercel.app"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.get("/", (req, res) => {
  res.json("hello");
});
// app.use("/", userRoute);

// Routes

app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
  connectDB();
});

// Start the server
