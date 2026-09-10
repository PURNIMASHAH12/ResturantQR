import { useNavigate } from "react-router-dom";
import { useTable } from "../../context/TableContext";

function HomeNavbar() {
  const navigate = useNavigate();
  const { clearCustomerInfo } = useTable();

  const startOrder = () => {
    clearCustomerInfo();
    navigate("/customer-info");
  };

  return (
    <nav className="home-nav">
      <div
        className="home-logo"
        onClick={() => navigate("/")}
      >
        {/* <span>🍽</span>
        <div>
          <strong>RestaurantQR</strong>
          <small>Smart table ordering</small>
        </div> */}
      </div>

      <div className="nav-links">
        <button onClick={() => navigate("/menu")}>
          Menu
        </button>

        <button
          className="nav-order"
          onClick={startOrder}
        >
          Start Ordering
        </button>
      </div>
    </nav>
  );
}

export default HomeNavbar;