require("dotenv").config(); // Load environment variables from .env file

// Now you can access environment variables using process.env

const { User, connectDB } = require("./models/User");
const express = require("express");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

const authRoutes = require("./routes/Auth");
app.use(
  cors({
    origin: ["https://redux-three-zeta.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json({ extended: false }));
// app.use(cors());
app.use("/", authRoutes);

// Routes

app.listen(PORT, () => {
  console.log(`Server Started ${PORT}`);
});

// Start the server
