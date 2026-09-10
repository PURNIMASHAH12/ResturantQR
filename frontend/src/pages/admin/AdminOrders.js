import { useEffect, useState } from "react";
import API from "../../services/Api";
import CompletedOrders from "../../components/admin/CompletedOrders";
import "../../styles/AdminOrders.css";
function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("today");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const res = await API.get("/orders");

      setOrders(res.data.orders || []);
    } catch (err) {
      console.log("Orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // =========================
  // COMPLETED ORDERS
  // =========================

  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  );

  // =========================
  // DATE FILTER
  // =========================

  const now = new Date();

  const filteredOrders = completedOrders.filter((order) => {
    const orderDate = new Date(order.createdAt);

    // Search
    const searchText = search.toLowerCase();

    const matchesSearch =
      order.orderId?.toLowerCase().includes(searchText) ||
      order.customerName?.toLowerCase().includes(searchText) ||
      String(order.tableNumber).includes(searchText);

    if (!matchesSearch) {
      return false;
    }

    // Today
    if (filter === "today") {
      return (
        orderDate.getDate() === now.getDate() &&
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear()
      );
    }

    // This week
    if (filter === "week") {
      const startOfWeek = new Date(now);

      const day = startOfWeek.getDay();
      const difference = day === 0 ? 6 : day - 1;

      startOfWeek.setDate(
        startOfWeek.getDate() - difference
      );

      startOfWeek.setHours(0, 0, 0, 0);

      return orderDate >= startOfWeek;
    }

    // This month
    if (filter === "month") {
      return (
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear()
      );
    }

    return true;
  });

  // =========================
  // REVENUE
  // =========================

  const totalRevenue = filteredOrders.reduce(
    (total, order) =>
      total + Number(order.totalAmount || 0),
    0
  );

  return (
    <div className="admin-orders-page">
      <main className="admin-page">

        {/* =========================
            HEADER
        ========================= */}

        <section className="orders-header">

          <div>
            <span className="admin-label">
              ORDER MANAGEMENT
            </span>

            <h1>
              Completed Orders
            </h1>

            <p>
              View and track successfully completed customer orders.
            </p>
          </div>

          <button
            className="orders-refresh"
            onClick={loadOrders}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "↻ Refresh"}
          </button>

        </section>


        {/* =========================
            STATISTICS
        ========================= */}

        <section className="orders-stat-grid">

          <div className="orders-stat-card">

            <span className="orders-stat-label">
              COMPLETED ORDERS
            </span>

            <strong>
              {filteredOrders.length}
            </strong>

            <small>
              {filter === "today"
                ? "Today"
                : filter === "week"
                ? "This Week"
                : "This Month"}
            </small>

          </div>


          <div className="orders-stat-card">

            <span className="orders-stat-label">
              COMPLETED REVENUE
            </span>

            <strong>
              Rs. {totalRevenue.toLocaleString()}
            </strong>

            <small>
              Confirmed revenue
            </small>

          </div>


          <div className="orders-stat-card">

            <span className="orders-stat-label">
              ALL COMPLETED
            </span>

            <strong>
              {completedOrders.length}
            </strong>

            <small>
              Total completed orders
            </small>

          </div>

        </section>


        {/* =========================
            FILTER BAR
        ========================= */}

        <section className="orders-toolbar">

          <div className="orders-search">
            <input
              type="text"
              placeholder="Search order, customer or table..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <div className="orders-filter">

            <span>
              Period
            </span>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >
              <option value="today">
                Today
              </option>

              <option value="week">
                This Week
              </option>

              <option value="month">
                This Month
              </option>

              <option value="all">
                All Time
              </option>
            </select>

            <span className="filter-arrow">
              ▼
            </span>

          </div>

        </section>


        {/* =========================
            ORDERS
        ========================= */}

        <section className="completed-orders-section">

          <div className="section-title">

            <div>
              <span>
                ORDER HISTORY
              </span>

              <h2>
                Completed Orders
              </h2>
            </div>

            <small>
              {filteredOrders.length} orders
            </small>

          </div>


          {loading ? (

            <div className="orders-empty">
              <div className="orders-empty-icon">
                ...
              </div>

              <h3>
                Loading orders...
              </h3>
            </div>

          ) : (

            <CompletedOrders
              orders={filteredOrders}
            />

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminOrders;