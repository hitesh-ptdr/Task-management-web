const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
{
  name: String,
  email: { type: String, unique: true },
  password: String,

  profilePic: {
    type: String,
    default: "",
  },

  role: {
    type: String,
    default: "admin",
  },

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },

},
{ timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);


// const mongoose = require("mongoose");

// const adminSchema = new mongoose.Schema(
// {
//   name: String,
//   email: String,
//   password: String,

//   profilePic: {
//     type: String,
//     default: "",
//   },

//   role: {
//     type: String,
//     default: "admin",
//   },
// },
// { timestamps: true }
// );

// module.exports = mongoose.model("Admin", adminSchema);