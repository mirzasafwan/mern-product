require("dotenv").config(); // Load environment variables from .env file

// Now you can access environment variables using process.env
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./models/User");
const userRoute = require("./route/userRoute");
const app = express();

app.use(express.json({ extended: false }));
app.use(cors());
const PORT = process.env.PORT;

app.use(
  cors({
    origin: ["https://mern-product-frontend.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use("/", userRoute);
// app.get("/", (req, res) => {
//   res.json("hello");
// });

// Routes

app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
  connectDB();
});

// Start the server
