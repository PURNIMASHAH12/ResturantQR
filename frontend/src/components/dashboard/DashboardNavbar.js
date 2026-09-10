import { useNavigate } from "react-router-dom";
import "../../styles/DashboardNavbar.css";

function DashboardNavbar({ type = "customer" }) {
  const navigate = useNavigate();
  const isAdmin = type === "admin";
  const isWaiter = type === "waiter";
  const isCustomer = type === "customer";
  const goHome = () => {
    if (isAdmin) {
      navigate("/admin");
    } else if (isWaiter) {
      navigate("/waiter");
    } else {
      navigate("/");
    }};
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <nav className="dashboard-navbar">
      {/* LOGO */}
      <div
        className="dashboard-logo"
        onClick={goHome}
      >
        <div>
          <strong>RestaurantQR</strong>
          <small>
            {isAdmin
              ? "Admin Panel"
              : isWaiter
                ? "Waiter Panel"
                : "Digital Menu"}
          </small>
        </div>
      </div>
      {/* NAVIGATION */}
      <div className="dashboard-nav-links">
        {isAdmin && (
          <>
            <button onClick={() => navigate("/admin")}>Dashboard  </button>
            <button onClick={() => navigate("/admin/orders")}> Orders</button>
            <button onClick={() => navigate("/admin/foods")}> Foods </button>
            <button onClick={() => navigate("/admin/categories")}>Categories </button>
          </>
        )}
        {isWaiter && (
          <button onClick={() => navigate("/waiter")}>
            Orders
          </button>
        )}
        {isCustomer && (
          <>
            <button onClick={() => navigate("/about")}> About</button>
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/menu")}> Menu</button>
          </>
        )}
        {/* WEBSITE / HOME */}
        {!isCustomer && (
          <button
            className="website-btn"
            onClick={() => navigate("/")}
          > Website</button>
        )}
        <button onClick={logout}> Logout </button>
      </div>
    </nav>
  );
}
export default DashboardNavbar;