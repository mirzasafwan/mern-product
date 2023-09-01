const { Todo } = require("../models/Todo");
const asyncHandler = require("express-async-handler");

const getList = asyncHandler(async (req, res) => {
  const todo = await Todo.find({ user: req.user._id });
  res.json(todo);
});

const createTodo = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("All fields Required");
  } else {
    const addtodo = new Todo({ user: req.user._id, title, content, category });
    const addedTodo = await addtodo.save();
    res.status(201).json(addedTodo);
  }
});
module.exports = { getList, createTodo };
