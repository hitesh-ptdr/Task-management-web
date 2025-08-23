const jwt = require("jsonwebtoken");

// ✅ Verify Admin
exports.verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token, authorization denied" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded admin token:", decoded); // Debug

    if (!decoded.role || decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    req.admin = { id: decoded.id };
    next();
  } catch (err) {
    console.log("Token error:", err);
    return res.status(401).json({ message: "Token is not valid" });
  }
};
