const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin"); // ✅ Correct import

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email }); // ✅ use Admin
    if (admin) return res.status(400).json({ message: "Admin already exists" });

    // ✅ Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = await Admin.create({ name, email, password: hashedPassword });

    res.json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin.id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email }); // ✅ use Admin
    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.json({
        _id: admin.id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin.id), // ✅ fix user → admin
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
