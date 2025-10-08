const jwt = require("jsonwebtoken");

// ✅ Admin verify
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Developer verify
const verifyDeveloper = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "developer") {
      return res.status(403).json({ message: "Access denied" });
    }
    req.developer = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { verifyAdmin, verifyDeveloper };
   

  // const jwt = require("jsonwebtoken");

  // // ✅ Admin verify
  // const verifyAdmin = (req, res, next) => {
  //   const token = req.headers.authorization?.split(" ")[1];
  //   if (!token) return res.status(401).json({ message: "No token" });

  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     if (decoded.role !== "admin") return res.status(403).json({ message: "Access denied" });
  //     req.admin = decoded;
  //     next();
  //   } catch (err) {
  //     res.status(401).json({ message: "Invalid token" });
  //   }
  // };

  // // ✅ Developer verify
  // const verifyDeveloper = (req, res, next) => {
  //   const token = req.headers.authorization?.split(" ")[1];
  //   if (!token) return res.status(401).json({ message: "No token" });

  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     if (decoded.role !== "developer") return res.status(403).json({ message: "Access denied" });
  //     req.developer = decoded;
  //     next();
  //   } catch (err) {
  //     res.status(401).json({ message: "Invalid token" });
  //   }
  // };

  // module.exports = { verifyAdmin, verifyDeveloper };
