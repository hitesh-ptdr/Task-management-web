const jwt = require("jsonwebtoken");
const Developer = require("../models/Developer");

const authDeveloper = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const developer = await Developer.findById(decoded.id);
    if (!developer) return res.status(401).json({ message: "Developer not found" });

    req.developer = developer;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authDeveloper;
