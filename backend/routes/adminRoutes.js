const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const Company = require("../models/Company");
const Admin = require("../models/Admin");

/* ===========================
   TOKEN
=========================== */
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

/* ===========================
   VERIFY ADMIN (FIXED)
=========================== */
const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* ===========================
   MULTER
=========================== */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "task-manager",
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],
  },
});

const upload = multer({
  storage,
});

/* ===========================
   REGISTER
=========================== */
router.post("/register", async (req, res) => {
  const { name, email, password, companyName } = req.body;

  try {
    let admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = await Company.create({
      name: companyName || `${name}'s Company`,
    });

    admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      companyId: company._id,
    });

    company.owner = admin._id;
    await company.save();

    res.json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin.id, "admin"),
      role: "admin",
      companyId: company._id,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

/* ===========================
   LOGIN
=========================== */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.json({
        _id: admin.id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin.id, "admin"),
        role: "admin",
        companyId: admin.companyId,
      });
    } else {
      res.status(400).json({
        message: "Invalid credentials",
      });
    }
  } catch {
    res.status(500).json({
      message: "Server error",
    });
  }
});

/* ===========================
   🔥 VERIFY ADMIN (NEW FIX)
=========================== */
router.get("/verify-admin", verifyAdmin, async (req, res) => {
  res.json({
    admin: req.admin,
  });
});

/* ===========================
   PROFILE
=========================== */
router.get("/profile", verifyAdmin, async (req, res) => {
  res.json({
    admin: req.admin,
  });
});

/* ===========================
   UPDATE PROFILE
=========================== */
router.put("/update-profile", verifyAdmin, async (req, res) => {
  const admin = req.admin;

  if (req.body.name) admin.name = req.body.name;
  if (req.body.email) admin.email = req.body.email;

  if (req.body.password) {
    admin.password = await bcrypt.hash(req.body.password, 10);
  }

  await admin.save();

  res.json({ message: "Profile Updated" });
});

/* ===========================
   UPLOAD PHOTO
=========================== */
router.post(
  "/upload-photo",

  verifyAdmin,

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

      const admin =
        req.admin;

      admin.profilePic = req.file.path;

      await admin.save();

      res.json({
        message:
          "Photo Uploaded Successfully",
      });

    }catch (error) {
  console.log("PHOTO ERROR:", error);

  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}
  }
);

module.exports = router;