import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    category: "",
    condition: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await API.get(`/books/${id}`);

      const book = response.data.book;

      setFormData({
        title: book.title || "",
        author: book.author || "",
        price: book.price || "",
        description: book.description || "",
        category: book.category || "",
        condition: book.condition || "",
      });
    } catch (error) {
      console.error("Failed to fetch book:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load book"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.price) <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    try {
      setUpdating(true);

      const token = localStorage.getItem("token");

      await API.put(
        `/books/${id}`,
        {
          title: formData.title.trim(),
          author: formData.author.trim(),
          price: Number(formData.price),
          description: formData.description.trim(),
          category: formData.category.trim(),
          condition: formData.condition,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Book updated successfully!");

      navigate("/my-books");
    } catch (error) {
      console.error("Failed to update book:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update book"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="page-message">
        <h2>Loading book...</h2>
      </div>
    );
  }

  return (
    <div className="edit-page">

      <Link to="/my-books" className="back-link">
        ← Back to My Books
      </Link>

      <div className="edit-card">

        <div className="edit-header">
          <div className="edit-icon">
            ✏️
          </div>

          <div>
            <h1>Edit Book</h1>
            <p>
              Update the details of your listed book.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Book Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
              />
            </div>

            <div className="form-group">
              <label>Author</label>

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
              />
            </div>

            <div className="form-group">
              <label>Price (₹)</label>

              <input
                type="number"
                name="price"
                min="1"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Fiction"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Condition</label>

              <select
                name="condition"
                value={formData.condition}
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

            <div className="form-group full-width">
              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the book..."
                rows="6"
                required
              />
            </div>

          </div>

          <div className="edit-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/my-books")}
              disabled={updating}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="update-button"
              disabled={updating}
            >
              {updating
                ? "Updating..."
                : "💾 Update Book"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default EditBook;