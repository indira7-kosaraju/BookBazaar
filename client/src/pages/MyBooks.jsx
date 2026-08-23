import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBooks();
  }, []);

  const fetchMyBooks = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        setLoading(false);
        return;
      }

      const response = await API.get("/books/my-books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("My Books Response:", response.data);

      // Handle normal backend response
      if (Array.isArray(response.data.books)) {
        setBooks(response.data.books);
      } else if (Array.isArray(response.data)) {
        setBooks(response.data);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("MY BOOKS ERROR:", error);
      console.error("Server response:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Failed to fetch your books"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Book deleted successfully!");

      setBooks((currentBooks) =>
        currentBooks.filter((book) => book._id !== bookId)
      );
    } catch (error) {
      console.error("DELETE ERROR:", error);
      console.error("Server response:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Failed to delete book"
      );
    }
  };

  if (loading) {
    return (
      <div>
        <h1>📚 My Books</h1>
        <h2>Loading your books...</h2>
      </div>
    );
  }

  return (
    <div className="home">
      <h1>📚 My Books</h1>

      {books.length === 0 ? (
        <div>
          <p>You haven't listed any books yet.</p>

          <Link to="/sell">
            <button>➕ Sell a Book</button>
          </Link>
        </div>
      ) : (
        <div className="books-container">
          {books.map((book) => (
            <div
              className="book-card"
              key={book._id}
            >
              <h2>📖 {book.title}</h2>

              <p>
                <strong>Author:</strong>{" "}
                {book.author}
              </p>

              <p>
                <strong>Price:</strong> ₹
                {book.price}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {book.category}
              </p>

              <p>
                <strong>Condition:</strong>{" "}
                {book.condition}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {book.description}
              </p>

              <br />

              <div className="book-actions">

                {/* VIEW */}
                <Link to={`/books/${book._id}`}>
                  <button>
                    👁️ View Details
                  </button>
                </Link>

                {/* EDIT */}
                <Link to={`/edit-book/${book._id}`}>
                  <button>
                    ✏️ Edit
                  </button>
                </Link>

                {/* DELETE */}
                <button
                  onClick={() =>
                    deleteBook(book._id)
                  }
                >
                  🗑️ Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBooks;