import { useNavigate } from "react-router-dom";
import { useTable } from "../../context/TableContext";

function Hero() {
  const navigate = useNavigate();
  const { clearCustomerInfo } = useTable();

  const startOrder = () => {
    clearCustomerInfo();
    navigate("/customer-info");
  };

  return (
    <section className="hero">

      <div className="hero-content">

        <div className="hero-badge">
          <span></span>
          SMART TABLE ORDERING
        </div>

        <h1>
          Good food.
          <br />
          <span>Right at your table.</span>
        </h1>

        <p>
          Scan the QR code, explore our menu, choose your
          favorites and order without waiting for a waiter.
        </p>

        {/* ONLY ONE BUTTON */}
        <div className="hero-actions">
          <button
            className="hero-primary"
            onClick={startOrder}
          >
            Start Ordering
            <span>→</span>
          </button>
        </div>

        <div className="hero-info">

          <div>
            <strong>01</strong>
            <span>Scan QR</span>
          </div>

          <div>
            <strong>02</strong>
            <span>Choose Food</span>
          </div>

          <div>
            <strong>03</strong>
            <span>Enjoy</span>
          </div>

        </div>

      </div>

      <div className="hero-image">

        <div className="hero-main-image">

          <div className="hero-food-icon">
            🍕
          </div>

          <div className="hero-image-text">
            <span>Today's craving</span>
            <strong>Made fresh for you</strong>
          </div>

        </div>

        <div className="hero-floating-card">

          <div className="floating-icon">
            ✓
          </div>

          <div>
            <strong>Easy ordering</strong>
            <span>No waiting required</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;