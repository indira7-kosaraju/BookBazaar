const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

  status: {
  type: String,
  enum: [
    "Pending",
    "Accepted",
    "Rejected",
    "Shipped",
    "Delivered"
  ],
  default: "Pending"
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);