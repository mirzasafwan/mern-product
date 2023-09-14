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
const getListId = asyncHandler(async (req, res) => {
  const getId = await Todo.findById(req.params.id);

  res.json(getId);
  if (getId) {
    res.status(201).json(getId);
  } else {
    res.status(401).json({ message: "Id not Found" });
  }
});
const updateListData = asyncHandler(async (req, res) => {
  const { title, category, content } = req.body;
  const getId = await Todo.findById(req.params.id);
  if (getId.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new "You cant perform this action"();
  }
  if (getId) {
    getId.title = title;
    getId.content = content;
    getId.category = category;
    // console.log(title);
    // console.log(content);
    // console.log(category);
    const updateList = await getId.save();
    res.json(updateList);
  } else {
    res.status(404).json({ message: "Data not found in the list" });
  }
});

const deleteList = asyncHandler(async (req, res) => {
  const getId = await Todo.findById(req.params.id);
  if (getId.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new "You cant perform this action"();
  }
  if (getId) {
    await getId.deleteOne();
    res.json({ message: "Data removed" });
  } else {
    res.status(404);
    throw new "Not Found"();
  }
});

module.exports = { getList, createTodo, getListId, updateListData, deleteList };
