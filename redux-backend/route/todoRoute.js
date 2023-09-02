const express = require("express");
const {
  getList,
  createTodo,
  getListId,
  updateListData,
  deleteList,
} = require("../controller/todoController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.route("/").get(protect, getList);
router.route("/create").post(protect, createTodo);
router.route("/:id").get(getListId).put(protect, updateListData);
router.route("/:id").get(getListId).delete(protect, deleteList);

module.exports = router;
// {
//     "name": "Safwan121",
//     "email": "mohammedsafwan1121@gmail.com",
//     "password": "mirza@123"
//   }
