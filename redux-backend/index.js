// Import packages
const express = require("express");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json("hello");
});

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
