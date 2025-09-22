// const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema({
//   title:       { type: String, required: true },
//   description: { type: String },
//   status:      { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
//   assignedTo:  { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// }, { timestamps: true });

// module.exports = mongoose.model("Task", taskSchema);
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
