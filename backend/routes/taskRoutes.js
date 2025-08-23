const express = require("express");
const Task = require("../models/Task");
const { verifyAdmin } = require("../middleware/authMiddleware"); // agar admin-only hai

const router = express.Router();

// Add task
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const { title, description, developerId, status, deadline } = req.body;
    if (!title || !developerId || !deadline)
      return res.status(400).json({ message: "Title, Developer, and Deadline are required" });

    const newTask = new Task({
      title,
      description: description || "",
      developer: developerId,
      status: status || "Pending",
      deadline,
    });

    await newTask.save();
    res.status(201).json({ message: "Task added successfully", task: newTask });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all tasks
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const tasks = await Task.find().populate("developer", "name email");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete task
router.delete("/delete/:id", verifyAdmin, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
