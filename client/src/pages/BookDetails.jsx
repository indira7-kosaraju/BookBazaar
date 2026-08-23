import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await API.get(`/books/${id}`);
        setBook(response.data.book);
      } catch (error) {
        console.error("Failed to fetch book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToCart = () => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyInCart = existingCart.some(
      (item) => item._id === book._id
    );

    if (alreadyInCart) {
      alert("Book is already in your cart");
      return;
    }

    const updatedCart = [...existingCart, book];

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Book added to cart!");
  };

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login to add books to your wishlist");
        return;
      }

      setWishlistLoading(true);

      await API.post(
        "/wishlist/add",
        {
          bookId: book._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("❤️ Book added to wishlist!");
    } catch (error) {
      console.error(
        "Failed to add book to wishlist:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to add book to wishlist"
      );
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-message">
        <h2>Loading book...</h2>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="page-message">
        <h2>Book not found</h2>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="book-details-page">

      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      <div className="book-details-card">

        {/* BOOK COVER */}
        <div className="book-cover">
          <span>📖</span>
        </div>

        {/* BOOK INFORMATION */}
        <div className="book-info">

          <div className="book-badges">
            <span className="badge">
              {book.category}
            </span>

            <span className="badge">
              {book.condition}
            </span>
          </div>

          <h1>{book.title}</h1>

          <p className="book-author">
            by <strong>{book.author}</strong>
          </p>

          <div className="details-price">
            ₹{book.price}
          </div>

          <div className="details-section">
            <h3>About this book</h3>

            <p>
              {book.description}
            </p>
          </div>

          <div className="details-actions">

            <button
              className="cart-button"
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>

            <button
              className="wishlist-button"
              onClick={handleAddToWishlist}
              disabled={wishlistLoading}
            >
              {wishlistLoading
                ? "Adding..."
                : "❤️ Add to Wishlist"}
            </button>

          </div>

        </div>
      </div>

      {/* SELLER INFORMATION */}
      {book.seller && (
        <div className="seller-card">

          <h2>👤 Seller Information</h2>

          <div className="seller-grid">

            <div>
              <span>Name</span>
              <strong>{book.seller.name}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{book.seller.email}</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>
                {book.seller.phone || "Not provided"}
              </strong>
            </div>

            <div>
              <span>Location</span>
              <strong>
                {book.seller.location || "Not provided"}
              </strong>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default BookDetails;