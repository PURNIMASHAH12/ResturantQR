import { useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import API from "../services/Api";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ===============================
  // DISABLED ACCOUNT MESSAGE
  // ===============================

  const disabledMessage =
    localStorage.getItem("disabledMessage");

  const accountDisabled =
    searchParams.get("disabled") === "true" ||
    !!disabledMessage;

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Remove old disabled message after successful login
      localStorage.removeItem("disabledMessage");

      if (user.role === "superadmin") {
        navigate("/superadmin");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "waiter") {
        navigate("/waiter");
      }

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          🍽️
        </div>

        <div className="login-heading">
          <h1>Welcome Back</h1>
          <p>
            Login to manage your restaurant
          </p>
        </div>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          {accountDisabled && (
            <div className="login-error">
              {disabledMessage ||
                "Your account has been disabled by Super Admin."}
            </div>
          )}

          {error && !accountDisabled && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          type="button"
          className="back-home-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

        <div className="login-footer">
          <span>RestaurantQR</span>
          <small>
            Secure restaurant management
          </small>
        </div>

      </div>

    </div>
  );
}

export default Login;

