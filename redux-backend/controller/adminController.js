const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { Todo } = require("../models/Todo");
const { User } = require("../models/User");

const adminData = asyncHandler(async (req, res) => {
  const users = await User.find();
  const todos = await Todo.find();

  // Create a dictionary to map user IDs to their respective todos
  const userTodos = {};

  todos.forEach((todo) => {
    if (!userTodos[todo.user]) {
      userTodos[todo.user] = [];
    }
    userTodos[todo.user].push(todo);
  });

  // Create an array of user data with their todos
  const userData = users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    todos: userTodos[user._id] || [], // Assign an empty array if user has no todos
  }));

  console.log(userData);

  res.json(userData);
});
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password match the admin's credentials
  if (email === "admin" && password === "admin") {
    // You can customize the admin credentials and validation logic

    // Generate a JWT token
    const token = jwt.sign({ email: "admin" }, process.env.JWT_SECRETE);

    res.json({ token, email });
  } else {
    res.status(401).json({ msg: "Invalid credentials" });
  }
});

module.exports = { adminData, adminLogin };
