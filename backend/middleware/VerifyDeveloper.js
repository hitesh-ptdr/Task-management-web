// const jwt = require("jsonwebtoken");
// const Developer = require("../models/Developer");

// const verifyDeveloper = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer "))
//       return res.status(403).json({ message: "Access denied" });

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const developer = await Developer.findById(decoded.id);
//     if (!developer) return res.status(403).json({ message: "Access denied" });

//     req.developer = { id: developer._id, email: developer.email, name: developer.name };
//     next();
//   } catch (err) {
//     res.status(403).json({ message: "Access denied" });
//   }
// };

// module.exports = verifyDeveloper;

// verifyDeveloper.js

const jwt = require("jsonwebtoken");
const Developer = require("../models/Developer");

const verifyDeveloper = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const developer = await Developer.findById(
      decoded.id
    ).select("-password");

    if (!developer) {
      return res.status(401).json({
        message: "Developer not found",
      });
    }

    req.developer = developer;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = verifyDeveloper;