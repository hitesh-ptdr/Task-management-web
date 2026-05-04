const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const Developer = require("../models/Developer");
const Admin = require("../models/Admin");

const sendMail = require("../utils/sendMail");

const {
  verifyAdmin,
  verifyDeveloper,
} = require("../middleware/authMiddleware");

/* ======================
   CREATE TASK
====================== */
router.post("/", verifyAdmin, async (req, res) => {
  try {
    const { title, description, developerId, status, deadline } = req.body;

    if (!title || !developerId || !deadline) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const developer = await Developer.findOne({
      _id: developerId,
      companyId: req.admin.companyId, // 🔥 security
    });

    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }

    const newTask = new Task({
      title,
      description: description || "",
      developer: developerId,
      status: status || "Pending",
      deadline,
      createdBy: req.admin._id,
      companyId: req.admin.companyId, // 🔥 IMPORTANT
    });

    const savedTask = await newTask.save();

    await sendMail(
      developer.email,
      "New Task Assigned",
      `Task: ${title}\nDeadline: ${new Date(deadline).toLocaleString()}`
    );

    res.json({ message: "Task created", task: savedTask });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ======================
   GET TASKS (ADMIN)
====================== */
router.get("/", verifyAdmin, async (req, res) => {
  const tasks = await Task.find({
    companyId: req.admin.companyId, // 🔥 FIX
  }).populate("developer", "name email");

  res.json(tasks);
});

/* ======================
   DELETE TASK
====================== */
router.delete("/:id", verifyAdmin, async (req, res) => {
  const deleted = await Task.findOneAndDelete({
    _id: req.params.id,
    companyId: req.admin.companyId, // 🔥 FIX
  });

  if (!deleted) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({ message: "Deleted" });
});

/* ======================
   UPDATE TASK (DEV)
====================== */
router.patch("/:id", verifyDeveloper, async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    developer: req.developer._id,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const now = new Date();
  const deadline = new Date(task.deadline);

  let finalStatus = req.body.status;

  if (finalStatus === "Completed") {
    finalStatus = now > deadline ? "Late Completed" : "Completed";
  }

  task.status = finalStatus;
  await task.save();

  res.json({ message: "Updated", task });
});

module.exports = router;