const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },

},
{ timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);