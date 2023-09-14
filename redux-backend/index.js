require("dotenv").config(); // Load environment variables from .env file

// Now you can access environment variables using process.env
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;
const { connectDB } = require("./config/dbcon");
const userRoute = require("./route/userRoute");
const todoRoute = require("./route/todoRoute");
const adminRoute = require("./route/adminRoute");
connectDB();
const app = express();
app.use(
  cors({
    origin: ["https://mern-product-frontend.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
// app.use(cors());
app.use(express.json());
app.use("/", adminRoute);
app.use("/", userRoute);
app.use("/", todoRoute);

app.get("/", (req, res) => {
  res.json("hello");
});

// Routes

app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
});

// Start the server
