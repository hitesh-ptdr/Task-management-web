// const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema({
//   taskId: { type: String, unique: true, default: () => new Date().getTime().toString() },
//   title: { type: String, required: true },
//   description: { type: String },
//   developer: { type: mongoose.Schema.Types.ObjectId, ref: "Developer", required: true },
//   status: { type: String, default: "Pending" },
//   deadline: { type: Date, required: true },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true }, // 👈 new field
// }, { timestamps: true });

// module.exports = mongoose.model("Task", taskSchema);


const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
    unique: true,
    default: () => new Date().getTime().toString(),
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Developer",
    required: true,
  },

  status: {
    type: String,
    default: "Pending",
  },

  deadline: {
    type: Date,
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },

}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);