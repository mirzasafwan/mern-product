const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/register");
    console.log("Db connected");
  } catch (error) {
    console.error(error);
  }
};

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = { connectDB, User };
