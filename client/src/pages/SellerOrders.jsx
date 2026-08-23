import { useEffect, useState } from "react";
import API from "../services/api";

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState(null);

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  const fetchSellerOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await API.get(
        "/orders/seller-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data.orders);
    } catch (error) {
      console.error(
        "Failed to fetch seller orders:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to fetch sales"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      setUpdatingOrder(orderId);

      await API.put(
        `/orders/${orderId}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Order ${status} successfully`);

      await fetchSellerOrders();
    } catch (error) {
      console.error(
        "Failed to update order:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update order status"
      );
    } finally {
      setUpdatingOrder(null);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";

      case "Accepted":
        return "status-accepted";

      case "Rejected":
        return "status-rejected";

      case "Shipped":
        return "status-shipped";

      case "Delivered":
        return "status-delivered";

      default:
        return "status-default";
    }
  };

  if (loading) {
    return (
      <div className="page-message">
        <h2>Loading sales...</h2>
      </div>
    );
  }

  return (
    <div className="sales-page">

      {/* HEADER */}

      <div className="sales-header">
        <div>
          <p className="sales-small">
            📦 Seller Dashboard
          </p>

          <h1>My Sales</h1>

          <p>
            Manage orders received for your books.
          </p>
        </div>

        <div className="sales-count">
          <strong>{orders.length}</strong>
          <span>Sales</span>
        </div>
      </div>

      {/* EMPTY */}

      {orders.length === 0 ? (
        <div className="empty-sales">

          <div className="empty-icon">
            📦
          </div>

          <h2>No sales yet</h2>

          <p>
            Orders for your books will appear here.
          </p>

        </div>
      ) : (
        <div className="sales-list">

          {orders.map((order) => (
            <div
              className="sale-card"
              key={order._id}
            >

              {/* BOOK ICON */}

              <div className="sale-book-icon">
                📖
              </div>

              {/* CONTENT */}

              <div className="sale-content">

                <div className="sale-top">

                  <div>
                    <h2>
                      {order.book?.title ||
                        "Book unavailable"}
                    </h2>

                    <p className="sale-id">
                      Order ID: {order._id}
                    </p>
                  </div>

                  <span
                    className={`order-status ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                </div>

                {/* DETAILS */}

                <div className="sale-details">

                  <div>
                    <span>Price</span>

                    <strong>
                      ₹{order.price}
                    </strong>
                  </div>

                  <div>
                    <span>Buyer</span>

                    <strong>
                      {order.buyer?.name ||
                        "Unavailable"}
                    </strong>
                  </div>

                  <div>
                    <span>Email</span>

                    <strong>
                      {order.buyer?.email ||
                        "Unavailable"}
                    </strong>
                  </div>

                  <div>
                    <span>Order Date</span>

                    <strong>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </strong>
                  </div>

                </div>

                {/* ACTIONS */}

                {order.status === "Pending" && (
                  <div className="sale-actions">

                    <button
                      className="accept-button"
                      disabled={
                        updatingOrder === order._id
                      }
                      onClick={() =>
                        updateStatus(
                          order._id,
                          "Accepted"
                        )
                      }
                    >
                      {updatingOrder === order._id
                        ? "Updating..."
                        : "✅ Accept Order"}
                    </button>

                    <button
                      className="reject-button"
                      disabled={
                        updatingOrder === order._id
                      }
                      onClick={() =>
                        updateStatus(
                          order._id,
                          "Rejected"
                        )
                      }
                    >
                      {updatingOrder === order._id
                        ? "Updating..."
                        : "❌ Reject Order"}
                    </button>

                  </div>
                )}

                {order.status === "Accepted" && (
                  <div className="sale-info">
                    ✅ Order accepted successfully.
                  </div>
                )}

                {order.status === "Rejected" && (
                  <div className="sale-info rejected-info">
                    ❌ This order was rejected.
                  </div>
                )}

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default SellerOrders;