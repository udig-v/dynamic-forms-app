const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../models/user");

dotenv.config();

const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = { protectRoute };
