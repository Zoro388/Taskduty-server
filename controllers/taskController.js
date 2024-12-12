const Task = require("../models/task");

// CRUD OPERATIONS
// C- CREATE
// R- READ
// U- UPDATED
// D-DELETE

const allTasks = async (req, res) => {
  const { userId } = req.user;
  const tasks = await Task.find({ createdBy: userId });
  res.json({
    data: tasks,
  });
};
const singleTask = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const task = await Task.findOne({ _id: id, createdBy: userId });

  if (!task) {
    return res.status(404).json({ message: `No Task with ID: ${id}` });
  }

  res.json({
    data: task,
  });
};

const createTask = async (req, res, next) => {
  const { userId } = req.user;
  try {
    const task = await Task.create({ ...req.body, createdBy: userId });
    res.status(200).json({ message: "Task Created" });
  } catch (error) {
    next(error);
  }
};
const updateTask = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const task = await Task.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { ...req.body }
  );

  if (!task) {
    return res.status(404).json({ message: `No Task with ID: ${id}` });
  }

  res.json({
    message: "Task Updated",
  });
};
const deleteTask = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, createdBy: userId });

  if (!task) {
    return res.status(404).json({ message: `No Task with ID: ${id}` });
  }

  res.json({
    message: "Task Deleted",
  });
};

module.exports = { allTasks, singleTask, createTask, updateTask, deleteTask };
