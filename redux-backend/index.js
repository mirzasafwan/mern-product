require("dotenv").config(); // Load environment variables from .env file

// Now you can access environment variables using process.env

const { connectDB } = require("./models/User");
const express = require("express");

const cors = require("cors");
const userRoute = require("./route/userRoute");
const app = express();
const PORT = process.env.PORT;

// app.use(
//   cors({
//     origin: ["https://mern-product-frontend.vercel.app/"],
//     methods: ["POST", "GET"],
//     credentials: true,
//   })
// );

app.use(express.json({ extended: false }));
app.use(cors());
app.use("/", userRoute);

// Routes

app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
  connectDB();
});

// Start the server
