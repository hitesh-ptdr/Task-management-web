const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Developer = require("../models/Developer");

/* ===========================
   VERIFY ADMIN (FINAL)
=========================== */
exports.verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    // 🔥 FULL ADMIN LOAD
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // 🔥 CRITICAL CHECK
    if (!admin.companyId) {
      return res.status(400).json({
        message: "Admin has no company assigned",
      });
    }

    req.admin = admin;

    next();

  } catch (error) {
    console.log("VERIFY ADMIN ERROR:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* ===========================
   VERIFY DEVELOPER (FINAL)
=========================== */
exports.verifyDeveloper = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "developer") {
      return res.status(403).json({ message: "Developer access only" });
    }

    const developer = await Developer.findById(decoded.id);

    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }

    req.developer = developer;

    next();

  } catch (error) {
    console.log("VERIFY DEV ERROR:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};