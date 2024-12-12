const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please provide a title"],
  },
  description: {
    type: String,
    required: [true, "please provide a description"],
  },
  tags: {
    type: String,
    required: [true, "please provide a tag"],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
