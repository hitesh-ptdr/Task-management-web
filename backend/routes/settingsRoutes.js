// const express = require("express");
// const router = express.Router();
// const Settings = require("../models/Settings");
// const { verifyDeveloper } = require("../middleware/authMiddleware");

// /* ===========================
//    GET SETTINGS
// =========================== */
// router.get("/", verifyDeveloper, async (req, res) => {
//   let settings = await Settings.findOne({
//     developer: req.developer._id,
//   });

//   // अगर नहीं है तो create करो
//   if (!settings) {
//     settings = await Settings.create({
//       developer: req.developer._id,
//     });
//   }

//   res.json(settings);
// });

// /* ===========================
//    UPDATE SETTINGS
// =========================== */
// router.put("/", verifyDeveloper, async (req, res) => {
//   const updated = await Settings.findOneAndUpdate(
//     { developer: req.developer._id },
//     req.body,
//     { new: true, upsert: true }
//   );

//   res.json(updated);
// });

// module.exports = router;