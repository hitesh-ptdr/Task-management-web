const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const fs = require("fs");

require("dotenv").config();

const app = express();

/* Models */
const Task = require("./models/Task");
const Developer = require("./models/Developer");

/* Utils */
const sendMail = require("./utils/sendMail");

/* Routes */
const developerRoutes =
  require("./routes/developerRoutes");

const adminRoutes =
  require("./routes/adminRoutes");

const taskRoutes =
  require("./routes/taskRoutes");

/* =====================================
   CREATE UPLOADS FOLDER
===================================== */
if (
  !fs.existsSync("uploads")
) {

  fs.mkdirSync(
    "uploads"
  );

  console.log(
    "✅ uploads folder created"
  );
}

/* =====================================
   Middleware
===================================== */
app.use(cors());

app.use(
  express.json()
);

/* =====================================
   Upload Images Access
===================================== */
app.use(
  "/uploads",
  express.static(
    "uploads"
  )
);

/* =====================================
   MongoDB
===================================== */
mongoose
  .connect(
    process.env.MONGO_URI
  )

  .then(() =>
    console.log(
      "✅ MongoDB Connected"
    )
  )

  .catch((err) =>
    console.error(
      "❌ MongoDB Error:",
      err
    )
  );

/* =====================================
   API Routes
===================================== */
app.use(
  "/api/developers",
  developerRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

/* =====================================
   CRON JOB
===================================== */
cron.schedule(
  "*/5 * * * *",

  async () => {

    try {

      console.log(
        "⏰ Deadline checker running..."
      );

      const now =
        new Date();

      const tasks =
        await Task.find({
          createdBy: {
            $exists:
              true,

            $ne: null,
          },
        }).populate(
          "developer",
          "name email"
        );

      for (let task of tasks) {

        const deadline =
          new Date(
            task.deadline
          );

        const diff =
          deadline - now;

        const minutesLeft =
          Math.floor(
            diff / 60000
          );

        /* ====================
           1 HOUR REMINDER
        ==================== */

        if (

          minutesLeft <= 60 &&

          minutesLeft > 55 &&

          task.status !==
            "Completed" &&

          task.status !==
            "Late Completed"

        ) {

          try {

            await sendMail(

              task.developer
                .email,

              "Task Deadline Reminder",

              `
Hello ${task.developer.name},

Your task deadline is near.

Task:
${task.title}

Deadline:
${deadline.toLocaleString()}

Please complete it soon.

Task Manager
`
            );

            console.log(
              "📩 Reminder sent:",
              task.title
            );

          } catch (mailError) {

            console.log(
              "MAIL ERROR:",
              mailError.message
            );
          }
        }

        /* ====================
           AUTO OVERDUE
        ==================== */

        if (

          now > deadline &&

          task.status !==
            "Completed" &&

          task.status !==
            "Late Completed" &&

          task.status !==
            "Overdue"

        ) {

          task.status =
            "Overdue";

          await task.save({
            validateBeforeSave:
              false,
          });

          console.log(
            "🚨 Overdue:",
            task.title
          );
        }
      }

    } catch (error) {

      console.log(
        "Cron Error:",
        error.message
      );
    }
  }
);

/* =====================================
   SERVER START
===================================== */

const PORT =
  process.env.PORT ||
  4000;

app.listen(
  PORT,

  () =>
    console.log(
      `🚀 Server running on port ${PORT}`
    )
);