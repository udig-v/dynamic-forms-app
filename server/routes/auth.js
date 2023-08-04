const express = require("express");

const {
  authUser,
  registerUser,
  logoutUser,
  getUser,
} = require("../controllers/auth");
const { protectRoute } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.get("/:userId", getUser);

module.exports = router;
