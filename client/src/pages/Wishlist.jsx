import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        setLoading(false);
        return;
      }

      const response = await API.get(
        "/wishlist/my-wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWishlist(response.data.wishlist);
    } catch (error) {
      console.error(
        "Failed to fetch wishlist:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to load wishlist"
      );
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (bookId) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/wishlist/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist((currentWishlist) =>
        currentWishlist.filter(
          (item) => item.book?._id !== bookId
        )
      );

      alert("Book removed from wishlist");
    } catch (error) {
      console.error(
        "Failed to remove wishlist item:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to remove book"
      );
    }
  };

  if (loading) {
    return (
      <div className="page-message">
        <h2>Loading wishlist...</h2>
      </div>
    );
  }

  return (
    <div className="wishlist-page">

      {/* HEADER */}

      <div className="wishlist-header">
        <div>
          <p className="wishlist-small">
            ❤️ Saved Books
          </p>

          <h1>My Wishlist</h1>

          <p>
            Books you've saved for later.
          </p>
        </div>

        {wishlist.length > 0 && (
          <div className="wishlist-count">
            <strong>{wishlist.length}</strong>
            <span>
              {wishlist.length === 1
                ? "Book"
                : "Books"}
            </span>
          </div>
        )}
      </div>

      {/* EMPTY WISHLIST */}

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">

          <div className="empty-wishlist-icon">
            ❤️
          </div>

          <h2>Your wishlist is empty</h2>

          <p>
            Save books you like and come back to
            them later.
          </p>

          <Link to="/">
            <button className="browse-wishlist-button">
              📚 Browse Books
            </button>
          </Link>

        </div>
      ) : (

        <div className="wishlist-grid">

          {wishlist.map((item) => {
            const book = item.book;

            if (!book) {
              return null;
            }

            return (
              <div
                className="wishlist-card"
                key={item._id}
              >

                {/* BOOK COVER */}

                <div className="wishlist-cover">
                  📖
                </div>

                {/* BOOK CONTENT */}

                <div className="wishlist-content">

                  <div className="wishlist-tags">
                    <span>
                      {book.category}
                    </span>

                    <span>
                      {book.condition}
                    </span>
                  </div>

                  <h2>{book.title}</h2>

                  <p className="wishlist-author">
                    by {book.author}
                  </p>

                  <p className="wishlist-description">
                    {book.description}
                  </p>

                  <div className="wishlist-bottom">

                    <strong>
                      ₹{book.price}
                    </strong>

                    <div className="wishlist-actions">

                      <Link
                        to={`/books/${book._id}`}
                      >
                        <button className="view-wishlist-button">
                          View Details
                        </button>
                      </Link>

                      <button
                        className="remove-wishlist-button"
                        onClick={() =>
                          removeFromWishlist(
                            book._id
                          )
                        }
                      >
                        🗑️
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      )}
    </div>
  );
}

export default Wishlist;