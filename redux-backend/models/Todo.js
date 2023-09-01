const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Todo = mongoose.model("Todo", todoSchema);
module.exports = { Todo };
