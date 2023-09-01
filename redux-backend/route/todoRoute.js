const express = require("express");
const { getList, createTodo } = require("../controller/todoController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.route("/").get(protect, getList);
router.route("/create").post(protect, createTodo);
// router.route("/:id").get().put().delete();

module.exports = router;
// {
//     "name": "Safwan121",
//     "email": "mohammedsafwan1121@gmail.com",
//     "password": "mirza@123"
//   }
