


// const mongoose = require("mongoose");

// const developerSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },

//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//   },

//   password: {
//     type: String,
//     required: true,
//   },

//   role: {
//     type: String,
//     default: "developer",
//   },

//   status: {
//     type: String,
//     default: "active",
//   },

//   profilePic: {
//     type: String,
//     default: "",
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Developer", developerSchema);

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
    required: true,
  },

  role: {
    type: String,
    default: "developer",
  },

  status: {
    type: String,
    default: "active",
  },

  profilePic: {
    type: String,
    default: "",
  },

  // 🔥 MOST IMPORTANT
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Developer", developerSchema);