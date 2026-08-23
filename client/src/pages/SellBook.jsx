import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function SellBook() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    category: "",
    condition: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(form.price) <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login before selling a book.");
        navigate("/login");
        return;
      }

      await API.post(
        "/books/add",
        {
          title: form.title.trim(),
          author: form.author.trim(),
          price: Number(form.price),
          description: form.description.trim(),
          category: form.category.trim(),
          condition: form.condition,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Book added successfully!");

      setForm({
        title: "",
        author: "",
        price: "",
        description: "",
        category: "",
        condition: "",
      });

      navigate("/my-books");
    } catch (error) {
      console.error("Failed to add book:", error);

      alert(
        error.response?.data?.message ||
          "Failed to add book"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sell-page">
      <div className="sell-card">

        <div className="sell-header">
          <div className="sell-icon">📚</div>

          <div>
            <h1>Sell Your Book</h1>
            <p>
              List your book and find a new reader.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="sell-form"
        >

          <div className="sell-form-grid">

            <div className="sell-form-group">
              <label>Book Title</label>

              <input
                name="title"
                type="text"
                placeholder="Enter book title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="sell-form-group">
              <label>Author</label>

              <input
                name="author"
                type="text"
                placeholder="Enter author name"
                value={form.author}
                onChange={handleChange}
                required
              />
            </div>

            <div className="sell-form-group">
              <label>Price (₹)</label>

              <input
                name="price"
                type="number"
                min="1"
                placeholder="Enter selling price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="sell-form-group">
              <label>Category</label>

              <input
                name="category"
                type="text"
                placeholder="e.g. Fiction, Science"
                value={form.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="sell-form-group sell-full-width">
              <label>Condition</label>

              <select
                name="condition"
                value={form.condition}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Condition
                </option>

                <option value="New">
                  New
                </option>

                <option value="Like New">
                  Like New
                </option>

                <option value="Good">
                  Good
                </option>

                <option value="Used">
                  Used
                </option>
              </select>
            </div>

            <div className="sell-form-group sell-full-width">
              <label>Description</label>

              <textarea
                name="description"
                rows="6"
                placeholder="Tell buyers about the book..."
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="sell-actions">

            <button
              type="button"
              className="sell-cancel"
              onClick={() => navigate("/")}
              disabled={submitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="sell-submit"
              disabled={submitting}
            >
              {submitting
                ? "Adding Book..."
                : "📚 List Book"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default SellBook;