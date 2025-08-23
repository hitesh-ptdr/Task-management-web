const jwt = require("jsonwebtoken");

// ✅ Verify Admin
exports.verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token, authorization denied" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Check if role is admin
    if (!decoded.role || decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    req.admin = { id: decoded.id }; // add admin info
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
