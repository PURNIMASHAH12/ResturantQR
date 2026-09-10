import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/Api";
import "../../styles/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);
  useEffect(() => {
    API.get("/orders")
      .then(res => {
        const data = res.data.orders || [];
        setOrders(data.length);
        setRevenue(
          data
            .filter(o => o.status === "completed")
            .reduce((sum, o) => sum + Number(o.totalAmount || 0), 0)
        );
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h1>🍽️ Admin Dashboard</h1>
          <p>Manage your restaurant</p>
        </div>
        <button onClick={() => navigate("/")}>
          View Website
        </button>
      </header>
      <div className="admin-stats">
        <div className="admin-stat">
          <span>💰</span>
          <h2>Revenue</h2>
          <h3>Rs. {revenue}</h3>
        </div>
        <div className="admin-stat">
          <span>📦</span>
          <h2>Orders</h2>
          <h3>{orders}</h3>
          <button onClick={() => navigate("/admin/orders")}>
            Manage →
          </button>
        </div>
        <div className="admin-stat">
          <span>🍔</span>
          <h2>Foods</h2>
          <button onClick={() => navigate("/admin/foods")}>
            Manage →
          </button>
        </div>
        <div className="admin-stat">
          <span>🏷️</span>
          <h2>Categories</h2>
          <button onClick={() => navigate("/admin/categories")}>
            Manage →
          </button>
        </div>
        <div className="admin-stat">
          <span>👨‍🍳</span>
          <h2>Waiter</h2>
          <button onClick={() => navigate("/waiter")}>
            Open →
          </button>
        </div>
      </div>
      <div className="admin-welcome">
        <h2>Welcome, Admin 👋</h2>
        <p>
          Manage orders, foods, categories and restaurant operations.
        </p>
      </div>
    </div>
  );
}
export default AdminDashboard;