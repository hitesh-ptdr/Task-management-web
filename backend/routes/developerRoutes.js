

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");



const Developer = require("../models/Developer");
const Task = require("../models/Task");
const Admin = require("../models/Admin");

const { verifyAdmin, verifyDeveloper } = require("../middleware/authMiddleware");

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "task-manager/developer",
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],
  },
});

const upload = multer({ storage });
/* ===========================
   LOGIN
=========================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const dev = await Developer.findOne({ email });
    if (!dev) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, dev.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: dev._id, role: "developer" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      developer: {
        id: dev._id,
        name: dev.name,
        email: dev.email,
      },
    });
  } catch (e) {
    console.log("DEV LOGIN ERROR:", e.message);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===========================
   ADD DEVELOPER (ADMIN)
=========================== */
router.post("/add", verifyAdmin, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await Developer.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Developer exists" });
    }

    if (!req.admin || !req.admin.companyId) {
      return res.status(400).json({ message: "Admin has no company assigned" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newDev = new Developer({
      name,
      email,
      password: hashed,
      companyId: req.admin.companyId,
    });

    await newDev.save();

    res.json({ message: "Developer added" });
  } catch (e) {
    console.log("ADD DEV ERROR:", e.message);
    res.status(500).json({ message: "Error" });
  }
});

/* ===========================
   GET DEVELOPERS (ADMIN)
=========================== */
router.get("/", verifyAdmin, async (req, res) => {
  const devs = await Developer.find({
    companyId: req.admin.companyId,
  }).select("name email profilePic");

  res.json(devs);
});

/* ===========================
   DELETE
=========================== */
router.delete("/:id", verifyAdmin, async (req, res) => {
  const dev = await Developer.findOneAndDelete({
    _id: req.params.id,
    companyId: req.admin.companyId,
  });

  if (!dev) return res.status(404).json({ message: "Not found" });

  res.json({ message: "Deleted" });
});

/* ===========================
   VERIFY (DEV) 🔥 IMPORTANT
=========================== */
router.get("/verify", verifyDeveloper, async (req, res) => {
  res.json({ developer: req.developer });
});

/* ===========================
   TASKS (DEV)
=========================== */
router.get("/tasks", verifyDeveloper, async (req, res) => {
  const tasks = await Task.find({
    developer: req.developer._id,
  });
  res.json(tasks);
});

/* ===========================
   PROFILE UPDATE
=========================== */
router.put("/update-profile", verifyDeveloper, async (req, res) => {
  const dev = req.developer;

  if (req.body.name) dev.name = req.body.name;
  if (req.body.email) dev.email = req.body.email;

  if (req.body.password) {
    dev.password = await bcrypt.hash(req.body.password, 10);
  }

  await dev.save();

  res.json({ message: "Updated" });
});

/* ===========================
   PHOTO UPLOAD
=========================== */
router.post(
  "/upload-photo",

  verifyDeveloper,

  upload.single("image"),

  async (req, res) => {
console.log("FILE =>", req.file);
console.log("BODY =>", req.body);
    try {

      // FILE CHECK
      if (!req.file) {

        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      const dev =
        req.developer;

    dev.profilePic = req.file.path;

      await dev.save();

      res.json({
        message:
          "Photo Uploaded Successfully",
      });

    } catch (error) {
  console.log("DEV PHOTO ERROR:", error);

  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}
  }
);
module.exports = router;