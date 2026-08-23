const express = require("express");

const {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addToWishlist);

router.get("/my-wishlist", protect, getMyWishlist);

router.delete("/:bookId", protect, removeFromWishlist);

module.exports = router;