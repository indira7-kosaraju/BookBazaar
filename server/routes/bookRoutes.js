const express = require("express");

const {
  addBook,
  getBooks,
  getBookById,
  getMyBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add book
router.post("/add", protect, addBook);

// Get all books
router.get("/", getBooks);

// Get my books
router.get("/my-books", protect, getMyBooks);

// Get single book
router.get("/:id", getBookById);

// Update book
router.put("/:id", protect, updateBook);

// Delete book
router.delete("/:id", protect, deleteBook);

module.exports = router;