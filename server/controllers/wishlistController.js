const Wishlist = require("../models/Wishlist");
const Book = require("../models/Book");

// ===============================
// ADD BOOK TO WISHLIST
// ===============================
const addToWishlist = async (req, res) => {
  try {
    const { bookId } = req.body;

    if (!bookId) {
      return res.status(400).json({
        message: "Book ID is required",
      });
    }

    // Check whether book exists
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    // Check if already in wishlist
    const existingWishlist = await Wishlist.findOne({
      user: req.user.id,
      book: bookId,
    });

    if (existingWishlist) {
      return res.status(400).json({
        message: "Book is already in your wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user.id,
      book: bookId,
    });

    res.status(201).json({
      message: "Book added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("ADD WISHLIST ERROR:", error);

    res.status(500).json({
      message: "Failed to add book to wishlist",
      error: error.message,
    });
  }
};

// ===============================
// GET MY WISHLIST
// ===============================
const getMyWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id,
    })
      .populate({
        path: "book",
        populate: {
          path: "seller",
          select: "name email phone location",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Wishlist fetched successfully",
      wishlist,
    });
  } catch (error) {
    console.error("GET WISHLIST ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch wishlist",
      error: error.message,
    });
  }
};

// ===============================
// REMOVE BOOK FROM WISHLIST
// ===============================
const removeFromWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;

    const wishlist = await Wishlist.findOneAndDelete({
      user: req.user.id,
      book: bookId,
    });

    if (!wishlist) {
      return res.status(404).json({
        message: "Book not found in wishlist",
      });
    }

    res.status(200).json({
      message: "Book removed from wishlist",
    });
  } catch (error) {
    console.error("REMOVE WISHLIST ERROR:", error);

    res.status(500).json({
      message: "Failed to remove book from wishlist",
      error: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist,
};