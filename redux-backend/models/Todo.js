const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now, // Use the current date and time
      get: function (createdAt) {
        return formatDate(createdAt);
      },
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Use the current date and time
      get: function (updatedAt) {
        return formatDate(updatedAt);
      },
    },
  },
  {
    toJSON: { getters: true }, // Ensure getters are used when converting to JSON
  }
);

// Helper function to format the date
function formatDate(date) {
  const isoDate = date.toISOString();
  const dateParts = isoDate.split("T")[0].split("-");
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  // Add a leading zero to the day if it's a single digit
  const formattedDay = day.length === 1 ? `0${day}` : day;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${formattedDay}-${monthNames[month - 1]}-${year}`;
}
const Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo };
