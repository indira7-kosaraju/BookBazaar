const express = require("express");

const {
  getMyProfile,
  updateMyProfile,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get profile
router.get("/profile", protect, getMyProfile);

// Update profile
router.put("/profile", protect, updateMyProfile);

module.exports = router;