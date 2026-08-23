import { useEffect, useState } from "react";
import API from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await API.get(
        "/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data.orders);
    } catch (error) {
      console.error(
        "Failed to fetch orders:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
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
        <h2>Loading orders...</h2>
      </div>
    );
  }

  return (
    <div className="orders-page">

      <div className="orders-header">
        <div>
          <p className="orders-small">
            🛍️ Purchase History
          </p>

          <h1>My Orders</h1>

          <p>
            Track the books you've purchased.
          </p>
        </div>

        <div className="orders-count">
          <strong>{orders.length}</strong>
          <span>Orders</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <div className="empty-icon">
            🛒
          </div>

          <h2>No orders yet</h2>

          <p>
            You haven't purchased any books yet.
          </p>

          <a href="/">
            <button className="browse-button">
              📚 Browse Books
            </button>
          </a>
        </div>
      ) : (
        <div className="orders-list">

          {orders.map((order) => (
            <div
              className="order-card"
              key={order._id}
            >

              <div className="order-book-icon">
                📖
              </div>

              <div className="order-content">

                <div className="order-top">

                  <div>
                    <h2>
                      {order.book?.title ||
                        "Book unavailable"}
                    </h2>

                    <p className="order-id">
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

                <div className="order-details">

                  <div>
                    <span>Price</span>
                    <strong>
                      ₹{order.price}
                    </strong>
                  </div>

                  <div>
                    <span>Seller</span>
                    <strong>
                      {order.seller?.name ||
                        "Unavailable"}
                    </strong>
                  </div>

                  <div>
                    <span>Email</span>
                    <strong>
                      {order.seller?.email ||
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

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default MyOrders;