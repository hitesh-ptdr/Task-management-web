const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Developer",
    required: true,
  },

  darkMode: {
    type: Boolean,
    default: false,
  },

  emailNotify: {
    type: Boolean,
    default: true,
  },

  taskReminder: {
    type: Boolean,
    default: true,
  },

  language: {
    type: String,
    default: "English",
  },

  autoLogout: {
    type: Number,
    default: 30,
  },

}, { timestamps: true });

module.exports = mongoose.model("Settings", settingsSchema);