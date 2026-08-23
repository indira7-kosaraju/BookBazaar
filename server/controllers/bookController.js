const Book = require("../models/Book");

// ===============================
// ADD BOOK
// ===============================
const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      price,
      description,
      category,
      condition,
    } = req.body;

    console.log("ADD BOOK - User ID:", req.user.id);

    const book = await Book.create({
      title,
      author,
      price,
      description,
      category,
      condition,
      seller: req.user.id,
    });

    res.status(201).json({
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    console.error("ADD BOOK ERROR:", error);

    res.status(500).json({
      message: "Failed to add book",
      error: error.message,
    });
  }
};

// ===============================
// GET ALL BOOKS
// ===============================
const getBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("seller", "name email");

    res.status(200).json({
      message: "Books fetched successfully",
      books,
    });
  } catch (error) {
    console.error("GET BOOKS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch books",
    });
  }
};

// ===============================
// GET SINGLE BOOK
// ===============================
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate(
        "seller",
        "name email phone location"
      );

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book fetched successfully",
      book,
    });
  } catch (error) {
    console.error("GET BOOK ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch book",
    });
  }
};

// ===============================
// GET MY BOOKS
// ===============================
const getMyBooks = async (req, res) => {
  try {
    console.log("========== MY BOOKS ==========");
    console.log("Logged-in user:", req.user);
    console.log("Logged-in user ID:", req.user.id);

    const books = await Book.find({
      seller: req.user.id,
    }).sort({ createdAt: -1 });

    console.log("Books found:", books);

    res.status(200).json({
      message: "Your books fetched successfully",
      books,
    });
  } catch (error) {
    console.error("GET MY BOOKS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch your books",
      error: error.message,
    });
  }
};

// ===============================
// UPDATE BOOK
// ===============================
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    if (book.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only edit your own books",
      });
    }

    const {
      title,
      author,
      price,
      description,
      category,
      condition,
    } = req.body;

    book.title = title;
    book.author = author;
    book.price = price;
    book.description = description;
    book.category = category;
    book.condition = condition;

    const updatedBook = await book.save();

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("UPDATE BOOK ERROR:", error);

    res.status(500).json({
      message: "Failed to update book",
      error: error.message,
    });
  }
};

// ===============================
// DELETE BOOK
// ===============================
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    if (book.seller.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only delete your own books",
      });
    }

    await Book.findByIdAndDelete(id);

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("DELETE BOOK ERROR:", error);

    res.status(500).json({
      message: "Failed to delete book",
      error: error.message,
    });
  }
};

// ===============================
// EXPORT
// ===============================
module.exports = {
  addBook,
  getBooks,
  getBookById,
  getMyBooks,
  updateBook,
  deleteBook,
};