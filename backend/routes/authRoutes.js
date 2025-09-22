// const express = require("express");
// const { signup, login } = require("../controllers/authController");

// const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// // const { protect, managerOnly } = require("../middleware/auth");
// const { protect, managerOnly } = require("../middleware/auth");

// // Helper to generate token
// const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// // Register
// router.post("/register", async (req, res) => {
//   const { email, password, role } = req.body;
//   try {
//     const user = await User.create({ email, password, role });
//     res.status(201).json({ token: generateToken(user._id), user });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     res.json({ token: generateToken(user._id), user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get current user
// router.get("/me", protect, async (req, res) => {
//   res.json(req.user);
// });
// // authRoute.js
// router.get("/users", protect, managerOnly, async (req, res) => {
//   try {
//     const users = await User.find({ role: "user" }).select("_id email role");
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect, managerOnly } = require("../middleware/auth");

// Helper to generate token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ✅ Register
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    // check duplicate username or email
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    const user = await User.create({ username, email, password, role });
    res.status(201).json({
      token: generateToken(user._id),
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      token: generateToken(user._id),
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get current user
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

// ✅ Get all users (manager only)
router.get("/users", protect, managerOnly, async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("_id username email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
