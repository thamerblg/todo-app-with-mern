const express = require("express");
const {
  getAllTasks,
  createTask,
  deleteTask,
  deleteAllTask,
  updateTask,
  updateTaskStatus,
  filterTasks,
} = require("../controllers/taskControllers");
const { validator, createTaskRules } = require("../middelwears/validators");
const router = express.Router();

router.get("/all", getAllTasks);
router.post("/add", createTaskRules(), validator, createTask);
router.delete("/:id", deleteTask);
router.patch("/delete-all", deleteAllTask);
router.patch("/update-task-description/:id", updateTask);
router.patch("/update-task-status/:id", updateTaskStatus);
router.get("/filter/", filterTasks);

module.exports = router;
