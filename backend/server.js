const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const developerRoutes = require("./routes/developerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/developers", developerRoutes); // developer login/profile/tasks
app.use("/api/admin", adminRoutes);          // admin login/register/dashboard
app.use("/api/tasks", taskRoutes);           // task related APIs

// Server Start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
 

