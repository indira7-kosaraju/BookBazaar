const express = require("express");

const {
  createOrder,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Buyer creates an order
router.post("/create", protect, createOrder);

// Buyer sees their orders
router.get("/my-orders", protect, getMyOrders);

// Seller sees orders received for their books
router.get("/seller-orders", protect, getSellerOrders);

// Seller updates order status
router.put("/:id/status", protect, updateOrderStatus);

module.exports = router;