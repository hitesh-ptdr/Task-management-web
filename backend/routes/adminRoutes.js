// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const Admin = require("../models/Admin");
// const Developer = require("../models/Developer");
// const { verifyAdmin } = require("../middleware/authMiddleware");

// const router = express.Router();

// // ✅ Admin Register
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const exists = await Admin.findOne({ email });
//     if (exists) return res.status(400).json({ message: "Admin already exists" });

//     const hashed = await bcrypt.hash(password, 10);
//     const admin = await Admin.create({ name, email, password: hashed });

//     res.status(201).json({ message: "Admin registered successfully", admin });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // ✅ Admin Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const admin = await Admin.findOne({ email });
//     if (!admin) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
//     res.json({ token, admin });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // ✅ Verify Admin
// router.get("/verify-admin", verifyAdmin, (req, res) => {
//   res.json({ message: "Admin verified", admin: req.admin });
// });

// // ✅ Add Developer
// router.post("/add-developer", verifyAdmin, async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const exists = await Developer.findOne({ email });
//     if (exists) return res.status(400).json({ message: "Developer already exists" });

//     const hashed = await bcrypt.hash(password, 10);
//     const developer = await Developer.create({ name, email, password: hashed });

//     res.status(201).json({ message: "Developer added successfully", developer });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // ✅ Get All Developers
// router.get("/developers", verifyAdmin, async (req, res) => {
//   try {
//     const developers = await Developer.find({}, "name email");
//     res.json(developers);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// module.exports = router;
 

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Developer = require("../models/Developer");
const { verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================
// ✅ Admin Register
// ==========================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashed });

    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ==========================
// ✅ Admin Login
// ==========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Add role in token
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token, admin });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ==========================
// ✅ Verify Admin
// ==========================
router.get("/verify-admin", verifyAdmin, (req, res) => {
  res.json({ message: "Admin verified", admin: req.admin });
});

// ==========================
// ✅ Add Developer (Admin only)
// ==========================
router.post("/add-developer", verifyAdmin, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await Developer.findOne({ email });
    if (exists) return res.status(400).json({ message: "Developer already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const developer = await Developer.create({ name, email, password: hashed });

    res.status(201).json({ message: "Developer added successfully", developer });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ==========================
// ✅ Get All Developers (Admin only)
// ==========================
router.get("/developers", verifyAdmin, async (req, res) => {
  try {
    const developers = await Developer.find({}, "name email");
    res.json(developers);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
