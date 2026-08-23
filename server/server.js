const express = require("express");
const cors = require("cors");

require("dotenv").config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/wishlist", wishlistRoutes);
connectDB();

app.get("/", (req, res) => {
  res.send("BookBazaar Backend is Running!");
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`BookBazaar server running on port ${PORT}`);
});

server.on("error", (error) => {
  console.error("Server error:", error);
});