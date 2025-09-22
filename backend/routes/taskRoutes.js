// const express = require("express");
// const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
// const auth = require("../middleware/auth");
// const roleCheck = require("../middleware/roleCheck");

// const router = express.Router();

// router.post("/", auth, roleCheck(["manager"]), createTask); // only manager
// router.get("/", auth, getTasks); // user + manager
// router.put("/:id", auth, updateTask); 
// router.delete("/:id", auth, roleCheck(["manager"]), deleteTask);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const { protect } = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

router.post("/", protect, roleCheck(["manager"]), createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, roleCheck(["manager"]), deleteTask);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Task = require("../models/Task");
// const { protect, managerOnly } = require("../middleware/auth");

// // Get tasks for logged-in user
// router.get("/", protect, async (req, res) => {
//   try {
//     let tasks;
//     if (req.user.role === "manager") {
//       // Show tasks created by manager
//       tasks = await Task.find({ createdBy: req.user._id }).populate("assignedTo", "email");
//     } else {
//       // Show tasks assigned to user
//       tasks = await Task.find({ assignedTo: req.user._id }).populate("createdBy", "email");
//     }
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Create task (manager only)
// router.post("/", protect, managerOnly, async (req, res) => {
//   const { title, description, assignedTo } = req.body;
//   try {
//     const task = await Task.create({
//       title,
//       description,
//       assignedTo,
//       createdBy: req.user._id,
//     });
//     res.status(201).json(task);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Update task (manager only for any task, user only for completion)
// router.put("/:id", protect, async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ message: "Task not found" });

//     // Only manager can edit details
//     if (req.user.role === "manager") {
//       task.title = req.body.title || task.title;
//       task.description = req.body.description || task.description;
//       task.assignedTo = req.body.assignedTo || task.assignedTo;
//     }

//     // Any user can mark as complete
//     if (req.body.completed !== undefined) task.completed = req.body.completed;

//     await task.save();
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Delete task (manager only)
// router.delete("/:id", protect, managerOnly, async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ message: "Task not found" });
//     await task.remove();
//     res.json({ message: "Task deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;
