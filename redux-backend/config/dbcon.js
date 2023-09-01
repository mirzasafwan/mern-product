require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Db connected");
  } catch (error) {
    console.error(error);
  }
};
module.exports = { connectDB };
