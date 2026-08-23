import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, book) => sum + Number(book.price),
    0
  );

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(
      (book) => book._id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login before placing an order");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // Create one order for each book
      for (const book of cart) {
        await API.post(
          "/orders/create",
          {
            bookId: book._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      alert("Order placed successfully!");

      localStorage.removeItem("cart");
      setCart([]);

      navigate("/my-orders");
    } catch (error) {
      console.error("Order error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">

      {/* HEADER */}

      <div className="checkout-header">
        <div>
          <p className="checkout-small">
            🧾 Order Confirmation
          </p>

          <h1>Checkout</h1>

          <p>
            Review your order before placing it.
          </p>
        </div>

        <div className="checkout-count">
          <strong>{cart.length}</strong>
          <span>
            {cart.length === 1 ? "Book" : "Books"}
          </span>
        </div>
      </div>

      {/* EMPTY CART */}

      {cart.length === 0 ? (
        <div className="empty-checkout">

          <div className="empty-checkout-icon">
            🛒
          </div>

          <h2>Your cart is empty</h2>

          <p>
            Add some books before proceeding to checkout.
          </p>

          <Link to="/">
            <button className="checkout-browse-button">
              📚 Browse Books
            </button>
          </Link>

        </div>
      ) : (

        <div className="checkout-layout">

          {/* ORDER ITEMS */}

          <div className="checkout-items">

            <div className="checkout-section-title">
              <h2>📚 Your Books</h2>
              <span>
                {cart.length} item
                {cart.length !== 1 ? "s" : ""}
              </span>
            </div>

            {cart.map((book) => (
              <div
                className="checkout-item"
                key={book._id}
              >

                <div className="checkout-book-icon">
                  📖
                </div>

                <div className="checkout-item-content">

                  <div>
                    <h3>{book.title}</h3>

                    <p className="checkout-author">
                      by {book.author}
                    </p>

                    <div className="checkout-tags">
                      <span>
                        {book.category}
                      </span>

                      <span>
                        {book.condition}
                      </span>
                    </div>
                  </div>

                  <div className="checkout-item-bottom">

                    <strong>
                      ₹{book.price}
                    </strong>

                    <button
                      className="checkout-remove"
                      onClick={() =>
                        removeFromCart(book._id)
                      }
                      disabled={loading}
                    >
                      🗑️ Remove
                    </button>

                  </div>

                </div>

              </div>
            ))}

            <Link
              to="/cart"
              className="back-cart-link"
            >
              ← Back to Cart
            </Link>

          </div>

          {/* PAYMENT SUMMARY */}

          <div className="payment-summary">

            <h2>Order Summary</h2>

            <div className="payment-row">
              <span>Items</span>
              <strong>{cart.length}</strong>
            </div>

            <div className="payment-row">
              <span>Subtotal</span>
              <strong>₹{total}</strong>
            </div>

            <div className="payment-row">
              <span>Delivery</span>
              <strong>Free</strong>
            </div>

            <hr />

            <div className="payment-total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

            <div className="secure-message">
              🔒 Secure order placement
            </div>

            <button
              className="place-order-button"
              onClick={placeOrder}
              disabled={loading}
            >
              {loading
                ? "Placing Order..."
                : "✅ Place Order"}
            </button>

            <p className="checkout-note">
              You will be redirected to My Orders
              after placing your order.
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default Checkout;