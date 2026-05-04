const Developer = require("../models/Developer");
const Task = require("../models/Task");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ===========================
   LOGIN DEVELOPER
=========================== */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const developer = await Developer.findOne({ email });
    if (!developer) {
      return res.status(400).json({ message: "Developer not found" });
    }

    const isMatch = await bcrypt.compare(password, developer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: developer._id, role: "developer" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token, developer });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/* ===========================
   GET PROFILE
=========================== */
exports.getProfile = async (req, res) => {
  try {
    const developer = await Developer.findById(req.developer._id).select("-password");

    res.status(200).json(developer);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/* ===========================
   UPDATE PROFILE
=========================== */
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const developer = await Developer.findById(req.developer._id);

    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }

    if (name) developer.name = name;
    if (email) developer.email = email;

    if (password) {
      developer.password = await bcrypt.hash(password, 10);
    }

    await developer.save();

    res.status(200).json({
      message: "Profile updated",
      developer,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/* ===========================
   GET TASKS (DEV)
=========================== */
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      developer: req.developer._id,
    }).sort({ deadline: 1 });

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/* ===========================
   GET ALL DEVELOPERS (ADMIN)
   🔥 COMPANY SAFE
=========================== */
exports.getAllDevelopers = async (req, res) => {
  try {
    const developers = await Developer.find({
      companyId: req.admin.companyId, // 🔥 FIX
    }).select("-password");

    res.status(200).json(developers);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/* ===========================
   ADD DEVELOPER (ADMIN)
   🔥 FIXED
=========================== */
exports.addDeveloper = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingDev = await Developer.findOne({ email });
    if (existingDev) {
      return res.status(400).json({ message: "Developer already exists" });
    }

    if (!req.admin || !req.admin.companyId) {
      return res.status(400).json({
        message: "Admin company not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDeveloper = new Developer({
      name,
      email,
      password: hashedPassword,
      role: "developer",
      companyId: req.admin.companyId, // 🔥 MAIN FIX
    });

    await newDeveloper.save();

    res.status(201).json({
      message: "Developer added successfully",
    });

  } catch (error) {
    console.log("ADD DEV ERROR:", error.message);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};