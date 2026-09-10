
import "../../styles/Footer.css";

function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>RestaurantQR</h2>
          <p>
            Smart and simple restaurant ordering
            for a better dining experience.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/menu">Menu</a>
          <a href="/about">About</a>
        </div>

        <div className="footer-info">
          <h3>RestaurantQR</h3>
          <p>Digital ordering made simple.</p>
          <p>Fast. Simple. Convenient.</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 RestaurantQR. All rights reserved.</p>
        <p>Smart Restaurant Management System</p>
      </div>

    </footer>
  );
}

export default Footer;