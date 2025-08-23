
   

// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const Developer = require("../models/Developer");
// const { verifyAdmin } = require("../middleware/authMiddleware");

// const router = express.Router();

// // ✅ Developer Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const dev = await Developer.findOne({ email });
//     if (!dev) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, dev.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: dev._id, email: dev.email }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({ message: "Login successful", token, developer: { id: dev._id, name: dev.name, email: dev.email } });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // ✅ Add new developer (only Admin can add)
// router.post("/add", verifyAdmin, async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     let existing = await Developer.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Developer already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newDev = new Developer({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await newDev.save();

//     res.status(201).json({ message: "Developer added successfully", developer: newDev });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // ✅ Get all developers (for dropdown / table)
// router.get("/", verifyAdmin, async (req, res) => {
//   try {
//     const devs = await Developer.find({}, "name email");
//     res.json(devs);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// module.exports = router;
  


const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Developer = require("../models/Developer");
const Task = require("../models/Task");
const { verifyAdmin, verifyDeveloper } = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================
// ✅ Developer Login
// ==========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const dev = await Developer.findOne({ email });
    if (!dev) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, dev.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: dev._id, email: dev.email, role: "developer" }, 
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      developer: { id: dev._id, name: dev.name, email: dev.email }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ==========================
// ✅ Add new developer (Admin only)
// ==========================
router.post("/add", verifyAdmin, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Developer.findOne({ email });
    if (existing) return res.status(400).json({ message: "Developer already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDev = new Developer({ name, email, password: hashedPassword });
    await newDev.save();

    res.status(201).json({ message: "Developer added successfully", developer: newDev });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ==========================
// ✅ Get all developers (Admin only)
// ==========================
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const devs = await Developer.find({}, "name email");
    res.json(devs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ==========================
// ✅ Get tasks assigned to logged-in developer
// ==========================
router.get("/tasks", verifyDeveloper, async (req, res) => {
  try {
    const developerId = req.developer.id; 
    // Schema ke hisaab se "developer" field se filter kar rahe hain
    const tasks = await Task.find({ developer: developerId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ==========================
// ✅ Verify developer token and fetch developer info
// ==========================
router.get("/verify", verifyDeveloper, async (req, res) => {
  try {
    const developer = await Developer.findById(req.developer.id, "name email");
    if (!developer) return res.status(404).json({ message: "Developer not found" });

    res.json({ developer });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
