const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { verifyAdmin, verifyDeveloper } = require("../middleware/authMiddleware");

// 🛠️ Add Task (admin only)
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const { title, description, developerId, status, deadline } = req.body;

    if (!title || !developerId || !deadline) {
      return res.status(400).json({ message: "Title, Developer, and Deadline are required" });
    }

    const newTask = new Task({
      title,
      description: description || "",
      developer: developerId,
      status: status || "Pending",
      deadline,
      createdBy: req.admin.id,
    });

    const saved = await newTask.save();
    res.status(201).json({ message: "Task added successfully", task: saved });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 🛠️ Get Tasks (admin only — filter by admin)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.admin.id })
      .populate("developer", "name email");
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 🛠️ Delete Task (admin only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.admin.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 🛠️ Update Task Status (developer updates their task)
router.patch("/:id", verifyDeveloper, async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, developer: req.developer.id }, // ensure only assigned dev can update
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    res.json({ message: "Task updated successfully", task });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
