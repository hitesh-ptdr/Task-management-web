


const jwt = require("jsonwebtoken");

const Developer =
  require("../models/Developer");

const authDeveloper =
  async (req, res, next) => {

    try {

      const authHeader =
        req.headers.authorization;

      // NO TOKEN
      if (!authHeader) {

        return res
          .status(401)
          .json({
            message:
              "No token provided",
          });
      }

      // EXTRACT TOKEN
      const token =
        authHeader.replace(
          "Bearer ",
          ""
        );

      // VERIFY
      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      // ROLE CHECK
      if (
        decoded.role !==
        "developer"
      ) {

        return res
          .status(403)
          .json({
            message:
              "Access denied",
          });
      }

      // FIND DEV
      const developer =
        await Developer.findById(
          decoded.id
        );

      if (!developer) {

        return res
          .status(404)
          .json({
            message:
              "Developer not found",
          });
      }

      // SAVE USER
      req.developer =
        developer;

      next();

    } catch (err) {

      console.error(
        "Developer Auth Error:",
        err.message
      );

      return res
        .status(401)
        .json({
          message:
            "Invalid token",
        });
    }
  };

module.exports =
  authDeveloper;