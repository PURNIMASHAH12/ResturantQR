import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/Api";
import "../../styles/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [revenueFilter, setRevenueFilter] = useState("today");
  const [completedFilter, setCompletedFilter] = useState("today");
  const [activeCard, setActiveCard] = useState(null);
  // =========================
  // LOAD DATA
  // =========================
  const loadDashboard = async () => {
    try {
      const [ordersRes, foodsRes] = await Promise.all([
        API.get("/orders"),
        API.get("/foods"),
      ]);

      setOrders(ordersRes.data.orders || []);
      setFoods(foodsRes.data.foods || []);

    } catch (error) {
      console.log("Dashboard error:", error);

      if (
        error.response?.status === 403 &&
        (
          error.response?.data?.message ===
          "Your account has been disabled by Super Admin." ||
          error.response?.data?.message ===
          "Admin or waiter access required."
        )
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login?disabled=true", { replace: true });
      }
    }
  };

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(() => {
      loadDashboard();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // REVENUE CALCULATION
  // =========================

  const getRevenue = () => {
    const now = new Date();

    const validStatuses = [
      "completed",
    ];

    const filteredOrders = orders.filter((order) => {
      // Only count valid revenue orders
      if (!validStatuses.includes(order.status)) {
        return false;
      }

      const orderDate = new Date(order.createdAt);

      // TODAY
      if (revenueFilter === "today") {
        return (
          orderDate.getDate() === now.getDate() &&
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      }

      // THIS WEEK
      if (revenueFilter === "week") {
        const startOfWeek = new Date(now);

        const day = startOfWeek.getDay();

        const difference = day === 0 ? 6 : day - 1;

        startOfWeek.setDate(
          startOfWeek.getDate() - difference
        );

        startOfWeek.setHours(0, 0, 0, 0);

        return orderDate >= startOfWeek;
      }

      // THIS MONTH
      if (revenueFilter === "month") {
        return (
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      }

      return false;
    });
    console.log(
      "Revenue Orders:",
      filteredOrders.map(order => ({
        orderId: order.orderId,
        customer: order.customerName,
        amount: order.totalAmount,
        status: order.status,
        date: order.createdAt,
      }))
    );

    return filteredOrders.reduce(
      (total, order) =>
        total + Number(order.totalAmount || 0),
      0
    );
  };

  const revenue = getRevenue();

  const getCompletedOrders = () => {
    const now = new Date();

    return orders.filter((order) => {
      if (order.status !== "completed") {
        return false;
      }

      const orderDate = new Date(order.createdAt);

      // TODAY
      if (completedFilter === "today") {
        return (
          orderDate.getDate() === now.getDate() &&
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      }

      // THIS WEEK
      if (completedFilter === "week") {
        const startOfWeek = new Date(now);

        const day = startOfWeek.getDay();
        const difference = day === 0 ? 6 : day - 1;

        startOfWeek.setDate(
          startOfWeek.getDate() - difference
        );

        startOfWeek.setHours(0, 0, 0, 0);

        return orderDate >= startOfWeek;
      }

      // THIS MONTH
      if (completedFilter === "month") {
        return (
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      }

      return false;
    }).length;
  };

  const completedOrders = getCompletedOrders();
  // =========================
  // OTHER STATISTICS
  // =========================

  // =========================
  // DATE HELPERS
  // =========================

  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);


  // =========================
  // TODAY'S ORDERS
  // =========================

  const todayOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);

    return (
      orderDate >= startOfToday &&
      orderDate <= endOfToday
    );
  });


  // =========================
  // STATISTICS
  // =========================

  // Only today's orders
  const totalOrders = todayOrders.length;

  // All foods in menu
  const totalFoods = foods.length;

  // =========================
  // RECENT ORDERS
  // =========================

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  // =========================
  // PAGE
  // =========================

  return (
    <div className="admin-dashboard">
      <main className="admin-page">

        {/* =========================
            TOP HEADER
        ========================= */}

        <section className="admin-top">

          <div>

            <span className="admin-label">
              RESTAURANT MANAGEMENT
            </span>

            <h1>
              Good evening, Admin
            </h1>

            <p>
              Here's what's happening in your restaurant today.
            </p>

          </div>

        </section>


        {/* =========================
            STATISTICS
        ========================= */}

        <section className="admin-stats">

          {/* TOTAL ORDERS */}

          <div
            className={`stat-card ${activeCard === "orders" ? "mobile-active" : ""}`}
            onClick={() =>
              setActiveCard(activeCard === "orders" ? null : "orders")
            }
          >

            <div className="stat-top">

              <span className="stat-icon">
                Orders
              </span>

              <span className="stat-status">
                Today
              </span>

            </div>

            <h2>
              {totalOrders}
            </h2>

            <p>
              Total Orders
            </p>

            <span
              className="stat-link"
              onClick={() =>
                navigate("/admin/orders")
              }
            >
              View orders →
            </span>

          </div>


          {/* COMPLETED ORDERS */}

          <div
            className={`stat-card ${activeCard === "completed" ? "mobile-active" : ""
              }`}
            onClick={() =>
              setActiveCard(
                activeCard === "completed" ? null : "completed"
              )
            }
          >

            <div className="stat-top">

              <span className="stat-icon">
                Completed
              </span>

              <div className="filter-wrapper">

                <select
                  value={completedFilter}
                  onChange={(e) =>
                    setCompletedFilter(e.target.value)
                  }
                  className="revenue-filter"
                  onClick={(e) => e.stopPropagation()}
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

                </select>

                <span className="dropdown-arrow">
                  ▼
                </span>

              </div>
            </div>

            <h2>
              {completedOrders}
            </h2>

            <p>
              {completedFilter === "today" &&
                "Today's Completed Orders"}

              {completedFilter === "week" &&
                "This Week's Completed Orders"}

              {completedFilter === "month" &&
                "This Month's Completed Orders"}
            </p>

            <span
              className="stat-link"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/admin/orders");
              }}
            >
              View completed orders →
            </span>

          </div>


          {/* TOTAL FOODS */}

          <div
            className={`stat-card ${activeCard === "foods" ? "mobile-active" : ""}`}
            onClick={() =>
              setActiveCard(activeCard === "foods" ? null : "foods")
            }
          >

            <div className="stat-top">

              <span className="stat-icon">
                Menu
              </span>

              <span className="stat-status">
                Menu
              </span>

            </div>

            <h2>
              {totalFoods}
            </h2>

            <p>
              Total Foods
            </p>

            <span
              className="stat-link"
              onClick={() =>
                navigate("/admin/foods")
              }
            >
              Manage menu →
            </span>

          </div>


          {/* =========================
              REVENUE
          ========================= */}

          <div
            className={`stat-card revenue-card ${activeCard === "revenue" ? "mobile-active" : ""
              }`}
            onClick={() =>
              setActiveCard(activeCard === "revenue" ? null : "revenue")
            }
          >

            <div className="stat-top">

              <span className="stat-icon">
                Revenue
              </span>

              <div className="filter-wrapper">

                <select
                  value={revenueFilter}
                  onChange={(e) =>
                    setRevenueFilter(e.target.value)
                  }
                  className="revenue-filter"
                  onClick={(e) => e.stopPropagation()}
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

                </select>

                <span className="dropdown-arrow">
                  ▼
                </span>

              </div>
            </div>

            <h2>
              Rs. {revenue.toLocaleString()}
            </h2>

            <p>
              {revenueFilter === "today" &&
                "Today's Revenue"}

              {revenueFilter === "week" &&
                "This Week's Revenue"}

              {revenueFilter === "month" &&
                "This Month's Revenue"}
            </p>

            <span className="stat-link">
              Confirmed revenue only
            </span>

          </div>

        </section>


        {/* =========================
            MAIN GRID
        ========================= */}

        <section className="dashboard-grid">


          {/* QUICK ACTIONS */}

          <div className="dashboard-panel quick-panel">

            <div className="panel-heading">

              <div>

                <span>
                  MANAGEMENT
                </span>

                <h2>
                  Quick Actions
                </h2>

              </div>

              <div className="panel-icon">
                Actions
              </div>

            </div>


            <div className="quick-actions">

              <button
                onClick={() =>
                  navigate("/admin/orders")
                }
              >

                <span>
                  Orders
                </span>

                <div>

                  <strong>
                    Manage Orders
                  </strong>

                  <small>
                    View and update customer orders
                  </small>

                </div>

                <b>
                  →
                </b>

              </button>


              <button
                onClick={() =>
                  navigate("/admin/foods")
                }
              >

                <span>
                  Foods
                </span>

                <div>

                  <strong>
                    Manage Foods
                  </strong>

                  <small>
                    Add, edit or remove menu items
                  </small>

                </div>

                <b>
                  →
                </b>

              </button>


              <button
                onClick={() =>
                  navigate("/admin/categories")
                }
              >

                <span>
                  Categories
                </span>

                <div>

                  <strong>
                    Categories
                  </strong>

                  <small>
                    Organize your restaurant menu
                  </small>

                </div>

                <b>
                  →
                </b>

              </button>


              <button
                onClick={() =>
                  navigate("/waiter")
                }
              >

                <span>
                  Waiter
                </span>

                <div>

                  <strong>
                    Waiter Dashboard
                  </strong>

                  <small>
                    Manage waiter order requests
                  </small>

                </div>

                <b>
                  →
                </b>

              </button>

            </div>

          </div>


          {/* RESTAURANT STATUS */}

          <div className="dashboard-panel status-panel">

            <div className="panel-heading">

              <div>

                <span>
                  RESTAURANT STATUS
                </span>

                <h2>
                  Everything looks good
                </h2>

              </div>

              <div className="online-dot"></div>

            </div>


            <div className="restaurant-status">

              <div className="status-row">

                <div>

                  <span className="status-symbol">
                    Open
                  </span>

                  <div>

                    <strong>
                      Restaurant
                    </strong>

                    <small>
                      Currently open
                    </small>

                  </div>

                </div>

                <b>
                  OPEN
                </b>

              </div>


              <div className="status-row">

                <div>

                  <span className="status-symbol">
                    QR
                  </span>

                  <div>

                    <strong>
                      QR Ordering
                    </strong>

                    <small>
                      Customers can order
                    </small>

                  </div>

                </div>

                <b>
                  ACTIVE
                </b>

              </div>


              <div className="status-row">

                <div>

                  <span className="status-symbol">
                    Kitchen
                  </span>

                  <div>

                    <strong>
                      Kitchen
                    </strong>

                    <small>
                      Ready for orders
                    </small>

                  </div>

                </div>

                <b>
                  READY
                </b>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            RECENT ORDERS
        ========================= */}

        <section className="dashboard-grid lower-grid">

          <div className="dashboard-panel orders-panel">

            <div className="panel-heading">

              <div>

                <span>
                  ORDERS
                </span>

                <h2>
                  Recent Activity
                </h2>

              </div>

              <button
                onClick={() =>
                  navigate("/admin/orders")
                }
              >
                View All →
              </button>

            </div>


            {!recentOrders.length ? (

              <div className="empty-orders">

                <div className="empty-orders-icon">
                  Orders
                </div>

                <h3>
                  No orders yet
                </h3>

                <p>
                  Customer orders will appear here.
                </p>

              </div>

            ) : (

              <div className="recent-orders">

                {recentOrders.map((order) => (

                  <div
                    className="recent-order"
                    key={order._id}
                  >

                    <div>

                      <strong>
                        {order.orderId ||
                          order._id}
                      </strong>

                      <small>
                        Table {order.tableNumber}
                        {" • "}
                        {order.customerName}
                      </small>

                    </div>

                    <div>

                      <strong>
                        Rs.{" "}
                        {order.totalAmount}
                      </strong>

                      <small>
                        {order.status}
                      </small>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>


          {/* MENU SHORTCUT */}

          <div className="dashboard-panel menu-panel">

            <div className="menu-panel-icon">
              Menu
            </div>

            <span>
              YOUR RESTAURANT
            </span>

            <h2>
              Keep your menu fresh.
            </h2>

            <p>
              Add new dishes, update prices and
              keep your customers excited.
            </p>

            <button
              onClick={() =>
                navigate("/admin/foods")
              }
            >
              Manage Menu →
            </button>

          </div>

        </section>


        {/* =========================
            FOOTER
        ========================= */}

        <section className="admin-footer-card">

          <div className="footer-card-icon">
            QR
          </div>

          <div>

            <span>
              RESTAURANTQR
            </span>

            <h2>
              Your restaurant, smarter.
            </h2>

            <p>
              Manage orders, menu items and
              customers from one simple dashboard.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;