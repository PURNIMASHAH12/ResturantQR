import { useNavigate } from "react-router-dom";
import { useTable } from "../context/TableContext";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const { clearCustomerInfo } = useTable();
  const goToMenu = () => navigate("/menu");
  const startOrdering = () => navigate("/customer-info");

  return (
    <div className="home-page">

      {/* ================= HERO ================= */}

      <section className="home-hero">

        <div className="hero-left">

          {/* <div className="hero-label">
            <span className="pulse-dot"></span>
            SMART TABLE ORDERING
          </div> */}

          <h1>
            Great food.
            <br />
            <span>Zero waiting.</span>
          </h1>

          <p className="hero-description">
            Scan your table QR, explore our menu, choose your favorites
            and enjoy a faster, more effortless dining experience.
          </p>

          <div className="hero-buttons">

            <button
              className="hero-order-btn"
              onClick={startOrdering}
            >
              Start Ordering
              <span>→</span>
            </button>

            <button
              className="hero-menu-btn"
              onClick={goToMenu}
            >
              View Menu
            </button>

          </div>

          <div className="hero-features">

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


        {/* ================= HERO VISUAL ================= */}

        <div className="hero-right">

          <div className="hero-glow"></div>

          <div className="hero-food-card">

            <div className="hero-food-image">

              <div className="food-visual">

                <span>CHEF'S</span>

                <strong>
                  SELECTION
                </strong>

                <div className="food-visual-line"></div>

                <small>
                  FRESH · REFINED · MADE TO ORDER
                </small>

              </div>

            </div>

            <div className="hero-food-content">

              <span>CHEF'S FAVORITE</span>

              <h3>
                Freshly Made
              </h3>

              <p>
                Thoughtfully prepared dishes served directly
                to your table.
              </p>

              <div className="hero-rating">
                <span>★★★★★</span>
                <small>Customer favorite</small>
              </div>

            </div>

          </div>


          <div className="floating-order-card">

            <div className="floating-check">
              ✓
            </div>

            <div>
              <strong>Easy ordering</strong>
              <span>No waiting for a waiter</span>
            </div>

          </div>


          <div className="floating-food-card">

            <span className="floating-number">
              01
            </span>

            <div>
              <strong>Chicken Momo</strong>
              <small>Rs. 220</small>
            </div>

          </div>

        </div>

      </section>


      {/* ================= QUICK CATEGORIES ================= */}

      <section className="quick-section">

        <div className="section-top">

          <div>
            <span className="section-label">
              WHAT ARE YOU CRAVING?
            </span>

            <h2>
              Pick your favorite
            </h2>
          </div>

          <button onClick={goToMenu}>
            See full menu →
          </button>

        </div>


        <div className="quick-categories">

          <button onClick={goToMenu}>
            <span className="category-number">01</span>
            <strong>Pizza</strong>
            <small>Freshly baked</small>
          </button>

          <button onClick={goToMenu}>
            <span className="category-number">02</span>
            <strong>Momo</strong>
            <small>Steamed &amp; juicy</small>
          </button>

          <button onClick={goToMenu}>
            <span className="category-number">03</span>
            <strong>Burgers</strong>
            <small>Made to order</small>
          </button>

          <button onClick={goToMenu}>
            <span className="category-number">04</span>
            <strong>Snacks</strong>
            <small>Perfect bites</small>
          </button>

          <button onClick={goToMenu}>
            <span className="category-number">05</span>
            <strong>Drinks</strong>
            <small>Fresh &amp; refreshing</small>
          </button>

        </div>
      </section>


      {/* ================= POPULAR ================= */}

      <section className="popular-section">

        <div className="popular-heading">

          <div>
            <span className="section-label">
              CUSTOMER FAVORITES
            </span>

            <h2>
              Popular right now
            </h2>
          </div>

          <button onClick={goToMenu}>
            View all →
          </button>

        </div>


        <div className="popular-grid">

          <div className="popular-card">

            <div className="popular-image pizza-bg">

              <div className="food-placeholder">
                <span>01</span>
                <strong>HOUSE<br />PIZZA</strong>
              </div>

              <span className="popular-badge">
                Popular
              </span>

            </div>

            <div className="popular-content">

              <div className="food-type">
                <span className="veg-dot"></span>
                Veg
              </div>

              <h3>
                Cheese Pizza
              </h3>

              <p>
                Loaded with mozzarella and fresh toppings.
              </p>

              <div className="popular-bottom">

                <strong>
                  Rs. 450
                </strong>

                <button onClick={goToMenu}>
                  Add +
                </button>

              </div>

            </div>

          </div>


          <div className="popular-card">

            <div className="popular-image momo-bg">

              <div className="food-placeholder">
                <span>02</span>
                <strong>CHICKEN<br />MOMO</strong>
              </div>

              <span className="popular-badge">
                Bestseller
              </span>

            </div>

            <div className="popular-content">

              <div className="food-type">
                <span className="nonveg-dot"></span>
                Non-Veg
              </div>

              <h3>
                Chicken Momo
              </h3>

              <p>
                Juicy steamed dumplings served with spicy sauce.
              </p>

              <div className="popular-bottom">

                <strong>
                  Rs. 220
                </strong>

                <button onClick={goToMenu}>
                  Add +
                </button>

              </div>

            </div>

          </div>


          <div className="popular-card">

            <div className="popular-image burger-bg">

              <div className="food-placeholder">
                <span>03</span>
                <strong>HOUSE<br />BURGER</strong>
              </div>

              <span className="popular-badge">
                Favorite
              </span>

            </div>

            <div className="popular-content">

              <div className="food-type">
                <span className="nonveg-dot"></span>
                Non-Veg
              </div>

              <h3>
                Chicken Burger
              </h3>

              <p>
                Crispy chicken with fresh vegetables and sauce.
              </p>

              <div className="popular-bottom">

                <strong>
                  Rs. 350
                </strong>

                <button onClick={goToMenu}>
                  Add +
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="how-section">

        <div className="how-intro">

          <span className="section-label">
            SIMPLE & FAST
          </span>

          <h2>
            Dining made
            <br />
            <span>effortless.</span>
          </h2>

          <p>
            No waiting. No complicated process.
            Everything you need is right at your table.
          </p>

          <button onClick={startOrdering}>
            Start Ordering →
          </button>

        </div>


        <div className="steps-container">

          <div className="step-card">

            <div className="step-number">
              01
            </div>

            <div className="step-icon">
              <span>SCAN</span>
            </div>

            <h3>
              Scan
            </h3>

            <p>
              Scan the QR code on your table.
            </p>

          </div>


          <div className="step-line"></div>


          <div className="step-card">

            <div className="step-number">
              02
            </div>

            <div className="step-icon">
              <span>MENU</span>
            </div>

            <h3>
              Choose
            </h3>

            <p>
              Explore the menu and pick your favorites.
            </p>

          </div>


          <div className="step-line"></div>


          <div className="step-card">

            <div className="step-number">
              03
            </div>

            <div className="step-icon">
              <span>ORDER</span>
            </div>

            <h3>
              Order
            </h3>

            <p>
              Confirm your order directly from your table.
            </p>

          </div>


          <div className="step-line"></div>


          <div className="step-card">

            <div className="step-number">
              04
            </div>

            <div className="step-icon">
              <span>ENJOY</span>
            </div>

            <h3>
              Enjoy
            </h3>

            <p>
              Sit back and enjoy your meal.
            </p>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="home-cta">

        <div className="cta-content">

          <span>
            READY TO EAT?
          </span>

          <h2>
            Your next favorite
            <br />
            meal is waiting.
          </h2>

          <p>
            Browse our menu and discover something delicious.
          </p>

          <button onClick={startOrdering}>
            Start Ordering
            <span>→</span>
          </button>

        </div>

        <div className="cta-decoration">
          <span>RQ</span>
        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="home-footer">

        <div className="footer-brand">

          <h3>
            RestaurantQR
          </h3>

          <p>
            Good food. Good mood.
          </p>

        </div>


        <div className="footer-middle">

          <span>Fresh food</span>
          <span>•</span>
          <span>Easy ordering</span>
          <span>•</span>
          <span>Happy customers</span>

        </div>


        <div className="footer-copy">

          <small>
            © 2026 RestaurantQR
          </small>

        </div>

      </footer>

    </div>
  );
}

export default Home;

