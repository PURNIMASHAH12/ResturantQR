import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "./services/Api";

function ProtectedRoute({ children, role }) {
  const [status, setStatus] = useState("checking");

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  useEffect(() => {
    if (!token || !user) {
      setStatus("login");
      return;
    }

    const checkAccount = async () => {
      try {
        await API.get("/auth/me");

        setStatus("active");

      } catch (error) {

        if (error.response?.status === 403) {
          setStatus("disabled");
        } else if (error.response?.status === 401) {
          setStatus("login");
        } else {
          // Don't redirect because of a temporary server error
          setStatus("active");
        }
      }
    };

    checkAccount();

    const interval = setInterval(checkAccount, 3000);

    return () => clearInterval(interval);

  }, []);


  // Loading
  if (status === "checking") {
    return (
      <div className="account-checking">
        <h2>Checking account...</h2>
      </div>
    );
  }


  // DISABLED
  if (status === "disabled") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f4ee",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "500px",
            padding: "40px",
            background: "#fffdf9",
            borderRadius: "20px",
            border: "1px solid #e9e1d4",
          }}
        >
          <div style={{ fontSize: "45px", marginBottom: "15px" }}>
            🔒
          </div>

          <h1>
            Your account has been disabled
          </h1>

          <p>
            Your account has been disabled by Super Admin.
          </p>

          <p>
            Please contact the Super Admin.
          </p>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }


  // Not logged in
  if (status === "login") {
    return <Navigate to="/login" replace />;
  }


  // Wrong role
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }


  return children;
}

export default ProtectedRoute;