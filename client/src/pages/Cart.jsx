import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <div className="cart-page">

      {/* HEADER */}

      <div className="cart-header">
        <div>
          <p className="cart-small">
            🛒 Shopping Cart
          </p>

          <h1>My Cart</h1>

          <p>
            Review your selected books before checkout.
          </p>
        </div>

        {cart.length > 0 && (
          <div className="cart-count">
            <strong>{cart.length}</strong>
            <span>
              {cart.length === 1 ? "Book" : "Books"}
            </span>
          </div>
        )}
      </div>

      {/* EMPTY CART */}

      {cart.length === 0 ? (
        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h2>Your cart is empty</h2>

          <p>
            Find a book you love and add it to your cart.
          </p>

          <Link to="/">
            <button className="continue-button">
              📚 Browse Books
            </button>
          </Link>

        </div>
      ) : (

        <div className="cart-layout">

          {/* CART ITEMS */}

          <div className="cart-container">

            {cart.map((item) => (
              <div
                className="cart-item"
                key={item._id}
              >

                <div className="cart-book-icon">
                  📖
                </div>

                <div className="cart-item-content">

                  <div>
                    <h2>{item.title}</h2>

                    <p className="cart-author">
                      by {item.author}
                    </p>
                  </div>

                  <div className="cart-item-bottom">

                    <strong className="cart-price">
                      ₹{item.price}
                    </strong>

                    <button
                      className="remove-cart-button"
                      onClick={() =>
                        removeFromCart(item._id)
                      }
                    >
                      🗑️ Remove
                    </button>

                  </div>

                </div>

              </div>
            ))}

            <Link
              to="/"
              className="continue-shopping"
            >
              ← Continue Shopping
            </Link>

          </div>

          {/* ORDER SUMMARY */}

          <div className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <strong>{cart.length}</strong>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>₹{total}</strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <strong>Free</strong>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

            <Link to="/checkout">
              <button className="checkout-button">
                Proceed to Checkout →
              </button>
            </Link>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;