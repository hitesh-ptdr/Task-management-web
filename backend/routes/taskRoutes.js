const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const Developer = require("../models/Developer");

const sendMail = require("../utils/sendMail");

const {
  verifyAdmin,
  verifyDeveloper,
} = require("../middleware/authMiddleware");

/* ======================
   CREATE TASK
====================== */
router.post(
  "/",
  verifyAdmin,
  async (req, res) => {

    try {

      const {
        title,
        description,
        developerId,
        status,
        deadline,
      } = req.body;

      /* VALIDATION */
      if (
        !title ||
        !developerId ||
        !deadline
      ) {

        return res
          .status(400)
          .json({
            message:
              "Missing fields",
          });
      }

      /* FIND DEVELOPER */
      const developer =
        await Developer.findOne(
          {
            _id:
              developerId,

            companyId:
              req.admin
                .companyId,
          }
        );

      if (!developer) {

        return res
          .status(404)
          .json({
            message:
              "Developer not found",
          });
      }

      /* CREATE TASK */
      const newTask =
        new Task({

          title,

          description:
            description ||
            "",

          developer:
            developerId,

          status:
            status ||
            "Pending",

          deadline,

          createdBy:
            req.admin._id,

          companyId:
            req.admin
              .companyId,
        });

      /* SAVE TASK */
      const savedTask =
        await newTask.save();

      /* ======================
         SEND EMAIL
      ====================== */

      try {

        await sendMail(
          developer.email,

          "New Task Assigned",

          `
Task: ${title}

Deadline:
${new Date(
  deadline
).toLocaleString()}
`
        );

      } catch (mailError) {

        console.log(
          "MAIL ERROR:",
          mailError.message
        );
      }

      /* SUCCESS */
      res.json({
        message:
          "Task created successfully",

        task:
          savedTask,
      });

    } catch (err) {

      console.log(
        "CREATE TASK ERROR:",
        err.message
      );

      res.status(500).json({
        message:
          "Server error",
      });
    }
  }
);

/* ======================
   GET TASKS (ADMIN)
====================== */
router.get(
  "/",
  verifyAdmin,
  async (req, res) => {

    try {

      const tasks =
        await Task.find({
          companyId:
            req.admin
              .companyId,
        }).populate(
          "developer",
          "name email"
        );

      res.json(tasks);

    } catch (error) {

      res.status(500).json({
        message:
          "Failed to fetch tasks",
      });
    }
  }
);

/* ======================
   DELETE TASK
====================== */
router.delete(
  "/:id",
  verifyAdmin,
  async (req, res) => {

    try {

      const deleted =
        await Task.findOneAndDelete(
          {
            _id:
              req.params.id,

            companyId:
              req.admin
                .companyId,
          }
        );

      if (!deleted) {

        return res
          .status(404)
          .json({
            message:
              "Task not found",
          });
      }

      res.json({
        message:
          "Task deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Delete failed",
      });
    }
  }
);

/* ======================
   UPDATE TASK (DEV)
====================== */
router.patch(
  "/:id",
  verifyDeveloper,
  async (req, res) => {

    try {

      const task =
        await Task.findOne(
          {
            _id:
              req.params.id,

            developer:
              req.developer
                ._id,
          }
        );

      if (!task) {

        return res
          .status(404)
          .json({
            message:
              "Task not found",
          });
      }

      const now =
        new Date();

      const deadline =
        new Date(
          task.deadline
        );

      let finalStatus =
        req.body.status;

      if (
        finalStatus ===
        "Completed"
      ) {

        finalStatus =
          now > deadline
            ? "Late Completed"
            : "Completed";
      }

      task.status =
        finalStatus;

      await task.save();

      res.json({
        message:
          "Task updated",

        task,
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Update failed",
      });
    }
  }
);

module.exports = router;