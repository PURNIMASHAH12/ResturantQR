import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        Restaurant QR
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/menu">Menu</Link>

        <Link to="/pricing">Pricing</Link>

        <Link to="/cart">Cart</Link>

        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;