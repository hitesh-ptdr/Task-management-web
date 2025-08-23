const Developer = require("../models/Developer");
const Task = require("../models/Task");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login Developer
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
      { id: developer._id, role: developer.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ token, developer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Developer Profile
exports.getProfile = async (req, res) => {
  try {
    const developer = await Developer.findById(req.developer.id).select("-password");
    res.status(200).json(developer);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Developer Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const developer = await Developer.findById(req.developer.id);

    if (name) developer.name = name;
    if (email) developer.email = email;
    if (password) developer.password = await bcrypt.hash(password, 10);

    await developer.save();
    res.status(200).json({ message: "Profile updated", developer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Tasks Assigned to Developer
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ developer: req.developer.id }).sort({ deadline: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Admin: Get All Developers
exports.getAllDevelopers = async (req, res) => {
  try {
    const developers = await Developer.find().select("-password");
    res.status(200).json(developers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Admin: Add New Developer ✅
exports.addDeveloper = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if developer already exists
    const existingDev = await Developer.findOne({ email });
    if (existingDev) {
      return res.status(400).json({ message: "Developer already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newDeveloper = new Developer({
      name,
      email,
      password: hashedPassword,
      role: "developer", // default role
    });

    await newDeveloper.save();

    res.status(201).json({ message: "Developer added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
