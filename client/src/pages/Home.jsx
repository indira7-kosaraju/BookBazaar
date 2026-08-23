import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await API.get("/books");
        setBooks(response.data.books);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  const categories = [
    "All",
    ...new Set(books.map((book) => book.category)),
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || book.category === category;

    const matchesPrice =
      maxPrice === "" ||
      Number(book.price) <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice
    );
  });

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setMaxPrice("");
  };

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div>
          <p className="hero-small">
            📚 Welcome to BookBazaar
          </p>

          <h1>
            Pass Books On, Not Away
          </h1>

          <p className="hero-description">
            Sell your old books instead of letting them go to waste, and buy pre-loved books at budget-friendly prices.
          </p>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="filter-section">
        <div className="search-box">
          🔍
          <input
            type="text"
            placeholder="Search by title, author or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "All"
                ? "All Categories"
                : cat}
            </option>
          ))}
        </select>

        <div className="price-box">
          ₹
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value)
            }
          />
        </div>

        <button
          className="clear-button"
          onClick={clearFilters}
        >
          Clear
        </button>
      </section>

      {/* RESULTS HEADER */}
      <div className="books-header">
        <div>
          <h2>📖 Available Books</h2>

          <p>
            {filteredBooks.length} book
            {filteredBooks.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* BOOKS */}
      <section className="books-container">

        {filteredBooks.length === 0 ? (
          <div className="empty-books">
            <div>📚</div>
            <h2>No books found</h2>
            <p>
              Try changing your search or filters.
            </p>

            <button
              className="clear-button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredBooks.map((book) => (
            <div
              className="book-card"
              key={book._id}
            >
              <div className="book-icon">
                📖
              </div>

              <div className="book-card-content">
                <h2>{book.title}</h2>

                <p className="author">
                  by {book.author}
                </p>

                <div className="book-tags">
                  <span>
                    {book.category}
                  </span>

                  <span>
                    {book.condition}
                  </span>
                </div>

                <p className="description">
                  {book.description}
                </p>

                <div className="book-bottom">
                  <strong className="book-price">
                    ₹{book.price}
                  </strong>

                  <Link
                    to={`/books/${book._id}`}
                  >
                    <button className="details-button">
                      View Details →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}

      </section>
    </div>
  );
}

export default Home;