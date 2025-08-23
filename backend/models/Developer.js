const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true, // ✅ login के लिए password जरूरी
  },
  role: {
    type: String,
    enum: ["admin", "developer"], // future में roles easily extend कर सकते हो
    default: "developer",
  },
  status: {
    type: String,
    enum: ["active", "inactive"], // developer को block/active करने का option
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Developer", developerSchema);
