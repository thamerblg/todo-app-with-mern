const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  description: { type: String, trim: true, required: true },
  isDone: { type: Boolean, default: false },
});

module.exports = mongoose.model("task", taskSchema);
