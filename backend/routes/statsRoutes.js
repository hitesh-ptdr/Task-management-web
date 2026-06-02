const express = require("express");
const router = express.Router();

const Developer = require("../models/Developer");
const Task = require("../models/Task");

router.get("/", async (req, res) => {
  try {

    const totalUsers =
      await Developer.countDocuments();

    const totalTasks =
      await Task.countDocuments();

    const completedTasks =
      await Task.countDocuments({
        status: "Completed",
      });

    res.json({
      totalUsers,
      totalTasks,
      completedTasks,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;