import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);

    alert("Logged out successfully");

    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* LOGO */}

      <Link to="/" className="navbar-logo">
        📚 BookBazaar
      </Link>

      {/* MAIN LINKS */}

      <div className="navbar-links">

        <Link to="/">
          🏠 Home
        </Link>

        {isLoggedIn && (
          <>
            <Link to="/sell">
              ➕ Sell
            </Link>

            <Link to="/my-books">
              📚 My Books
            </Link>

            <Link to="/my-orders">
              🛍️ My Orders
            </Link>

            <Link to="/seller-orders">
              📦 My Sales
            </Link>

            <Link to="/cart">
              🛒 Cart
            </Link>

            <Link to="/wishlist">
              ❤️ Wishlist
            </Link>

            <Link to="/profile">
              👤 Profile
            </Link>
          </>
        )}

      </div>

      {/* AUTH */}

      <div className="navbar-auth">

        {!isLoggedIn ? (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;