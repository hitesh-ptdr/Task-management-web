const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// ✅ Verify Admin (FIXED 🔥)
exports.verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ role check
    if (!decoded.role || decoded.role !== "admin") {
      return res.status(403).json({
        message: "Admin access only",
      });
    }

    // 🔥 IMPORTANT FIX
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    req.admin = admin; // 🔥 FULL ADMIN (with companyId)

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Token is not valid",
    });
  }
};