import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SellBook from "./pages/SellBook";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import SellerOrders from "./pages/SellerOrders";
import EditBook from "./pages/EditBook";
import MyBooks from "./pages/MyBooks";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/sell" element={<SellBook />} />

          <Route
            path="/books/:id"
            element={<BookDetails />}
          />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/my-orders"
            element={<MyOrders />}
          />

          <Route
            path="/seller-orders"
            element={<SellerOrders />}
          />

          <Route
            path="/edit-book/:id"
            element={<EditBook />}
          />

          <Route
            path="/my-books"
            element={<MyBooks />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;