// const Task = require("../models/Task");
// const ActivityLog = require("../models/ActivityLog");

// exports.createTask = async (req, res) => {
//   try {
//     const { title, description, assignedTo } = req.body;
//     const task = new Task({
//       title,
//       description,
//       assignedTo,
//       createdBy: req.user.id,
//     });
//     await task.save();

//     await ActivityLog.create({ taskId: task._id, action: "Created task", changedBy: req.user.id });

//     res.status(201).json(task);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// exports.getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({
//       $or: [{ assignedTo: req.user.id }, { createdBy: req.user.id }],
//     }).populate("assignedTo createdBy", "username email");
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// exports.updateTask = async (req, res) => {
// //   try {
// //     const task = await Task.findById(req.params.id);
// //     if (!task) return res.status(404).json({ msg: "Task not found" });

// //     Object.assign(task, req.body);
// //     await task.save();

// //     await ActivityLog.create({ taskId: task._id, action: "Updated task", changedBy: req.user.id });

// //     res.json(task);
// //   } catch (err) {
// //     res.status(500).json({ msg: err.message });
// //   }
// exports.updateTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ msg: "Task not found" });

//     // ✅ Permission check
//     if (req.user.role === "user" && task.assignedTo.toString() !== req.user.id) {
//       return res.status(403).json({ msg: "Not allowed" });
//     }
//     if (req.user.role === "manager" && task.createdBy.toString() !== req.user.id) {
//       return res.status(403).json({ msg: "Not allowed" });
//     }

//     Object.assign(task, req.body);
//     await task.save();

//     await ActivityLog.create({ taskId: task._id, action: "Updated task", changedBy: req.user.id });

//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// };

// exports.deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findByIdAndDelete(req.params.id);
//     if (!task) return res.status(404).json({ msg: "Task not found" });

//     await ActivityLog.create({ taskId: task._id, action: "Deleted task", changedBy: req.user.id });

//     res.json({ msg: "Task deleted" });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    const task = new Task({
      title,
      description,
      assignedTo,
      createdBy: req.user._id,
    });
    await task.save();

    await ActivityLog.create({
      taskId: task._id,
      action: "Created task",
      changedBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get tasks assigned to user or created by manager
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [{ assignedTo: req.user._id }, { createdBy: req.user._id }],
    }).populate("assignedTo createdBy", "username email role");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    // Permission check
    if (req.user.role === "user" && task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    Object.assign(task, req.body);
    await task.save();

    await ActivityLog.create({
      taskId: task._id,
      action: "Updated task",
      changedBy: req.user._id,
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    await ActivityLog.create({
      taskId: task._id,
      action: "Deleted task",
      changedBy: req.user._id,
    });

    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
