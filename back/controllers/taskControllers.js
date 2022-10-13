const { resolveSoa } = require("dns");
const Task = require("../models/Task");

// VIEW ALL TASKS
const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({});
    res.status(200).send(allTasks);
  } catch (error) {
    res.status(400).send(error);
  }
};

// CREATE A NEW TASK
const createTask = async (req, res) => {
  const { description } = req.body;
  try {
    const existTask = await Task.findOne({ description });
    if (existTask) {
      return res
        .status(400)
        .send({ msg: "Task is already exist with this description!" });
    }
    const newTask = new Task({ ...req.body });
    await newTask.save();
    res.status(200).send({ task: newTask });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

// DELETE ONE TASK
const deleteTask = async (req, res) => {
  try {
    const resultOfDelete = await Task.deleteOne({ _id: req.params.id });
    if (!resultOfDelete.deletedCount) {
      return res.status(500).send({ msg: "Task not found" });
    }
    res.status(200).send({ msg: "Task deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};

// DELETE ALL TASKS
const deleteAllTask = async (req, res) => {
  try {
    const deleteAll = await Task.deleteMany({});
    res.status(200).send({ msg: "All Tasks deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const resultOfUpdate = await Task.findByIdAndUpdate(req.params.id, {
      description: req.body.description,
    });
    res.status(200).send({ msg: "Task has been updated successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};

// UPDATE THE TASK_STATUS (DONE OR NOT_DONE)
const updateTaskStatus = async (req, res) => {
  try {
    const UpdateStatus = await Task.updateOne({ _id: req.params.id }, [
      { $set: { isDone: { $not: "$isDone" } } },
    ]);
    if (!UpdateStatus.modifiedCount) {
      return res.status(500).send({ msg: "Task not found" });
    }
    res
      .status(200)
      .send({ msg: "Status of this task has been updated successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};

// FILTER TASKS
const filterTasks = async (req, res) => {
  try {
    const filter = await Task.find({ isDone: req.query.isDone });
    res.status(200).send(filter);
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  deleteAllTask,
  updateTask,
  updateTaskStatus,
  filterTasks,
};
