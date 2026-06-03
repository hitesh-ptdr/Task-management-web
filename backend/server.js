const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const fs = require("fs");
const statsRoutes =
  require("./routes/statsRoutes");

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
/* =====================================
   Middleware
===================================== */

app.use(
  cors({
    origin: "*",
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.options("*", cors()); // <-- ye add karo

app.use(express.json());

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

app.use("/api/stats", statsRoutes);

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
   CRON JOB (Safe & Fixed)
===================================== */
cron.schedule("*/5 * * * *", async () => {
  try {
    console.log("⏰ Deadline checker running...");
    const now = new Date();

    // Hum sirf wahi tasks uthayenge jisme developer assigned ho aur task pending/in-progress ho
    const tasks = await Task.find({
      developer: { $exists: true, $ne: null },
      status: { $nin: ["Completed", "Late Completed"] } 
    }).populate("developer", "name email");

    for (let task of tasks) {
      // Emergency Check: Agar kisi wajah se population fail hui aur developer null mila
      if (!task.developer || !task.developer.email) {
        continue; // Skip this task, server crash nahi hoga!
      }

      const deadline = new Date(task.deadline);
      const diff = deadline - now;
      const minutesLeft = Math.floor(diff / 60000);

      /* ====================
         1 HOUR REMINDER (With exact tracking flag optional, but keeping your logic safe)
      ==================== */
      if (minutesLeft <= 60 && minutesLeft > 55) {
        try {
          await sendMail(
            task.developer.email,
            "Task Deadline Reminder",
            `Hello ${task.developer.name},\n\nYour task deadline is near.\n\nTask: ${task.title}\nDeadline: ${deadline.toLocaleString()}\n\nPlease complete it soon.\n\nTask Manager`
          );
          console.log("📩 Reminder sent successfully for:", task.title);
        } catch (mailError) {
          console.log("❌ MAIL ERROR IN CRON:", mailError.message);
        }
      }

      /* ====================
         AUTO OVERDUE
      ==================== */
      if (now > deadline && task.status !== "Overdue") {
        task.status = "Overdue";
        await task.save({ validateBeforeSave: false });
        console.log("🚨 Task marked as Overdue:", task.title);
      }
    }
  } catch (error) {
    console.log("❌ Global Cron Error:", error.message);
  }
});

/* =====================================
   SERVER START
===================================== */

const PORT =
  process.env.PORT || 5000;

  console.log(
  "CLOUDINARY_CLOUD_NAME:",
  process.env.CLOUDINARY_CLOUD_NAME
);

console.log(
  "CLOUDINARY_API_KEY:",
  process.env.CLOUDINARY_API_KEY
);

console.log(
  "CLOUDINARY_API_SECRET EXISTS:",
  !!process.env.CLOUDINARY_API_SECRET
);

app.listen(
  PORT,
  () => {
    console.log(
      `🚀 Server running on port ${PORT}`
    );
  }
);