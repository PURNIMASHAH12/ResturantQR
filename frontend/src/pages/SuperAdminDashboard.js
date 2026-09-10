import { useEffect, useState } from "react";
import API from "../services/Api";
import "../styles/SuperAdminDashboard.css";

function SuperAdminDashboard() {
  const [staff, setStaff] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await API.get("/superadmin/staff");

      setStaff(response.data.staff);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to load staff accounts."
      );
    } finally {
      setLoading(false);
    }
  };


  // Enable / Disable account

  const toggleStatus = async (id) => {
    try {
      const response = await API.put(
        `/superadmin/staff/${id}/status`
      );

      const updatedUser = response.data.user;

      setStaff((currentStaff) =>
        currentStaff.map((user) =>
          user._id === id
            ? {
                ...user,
                isActive: updatedUser.isActive,
              }
            : user
        )
      );

      setMessage(response.data.message);

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Failed to update account."
      );
    }
  };


  const admins = staff.filter(
    (user) => user.role === "admin"
  );

  const waiters = staff.filter(
    (user) => user.role === "waiter"
  );


  if (loading) {
    return (
      <div className="superadmin-page">
        <p>Loading Super Admin Dashboard...</p>
      </div>
    );
  }


  if (message && staff.length === 0) {
    return (
      <div className="superadmin-page">
        <h1>Access Denied</h1>
        <p>{message}</p>
      </div>
    );
  }


  return (
    <div className="superadmin-page">

      {/* HEADER */}

      <header className="superadmin-header">

        <div>
          <span>SUPER ADMIN</span>

          <h1>
            Security & Management
          </h1>

          <p>
            Monitor and manage restaurant administrators.
          </p>
        </div>

        <div className="superadmin-badge">
          👑 Super Admin
        </div>

      </header>


      {/* MESSAGE */}

      {message && (
        <div className="superadmin-message">
          {message}
        </div>
      )}


      {/* STATISTICS */}

      <section className="superadmin-stats">

        <div className="superadmin-card">
          <span>ADMINS</span>

          <h2>{admins.length}</h2>

          <p>
            Restaurant administrators
          </p>
        </div>


        <div className="superadmin-card">
          <span>WAITERS</span>

          <h2>{waiters.length}</h2>

          <p>
            Restaurant staff
          </p>
        </div>


        <div className="superadmin-card">
          <span>SECURITY</span>

          <h2>✓</h2>

          <p>
            System protection active
          </p>
        </div>

      </section>


      {/* ADMIN CONTROL */}

      <section className="superadmin-panel">

        <div className="panel-title">

          <span>
            ACCOUNT MANAGEMENT
          </span>

          <h2>
            Administrator Control
          </h2>

        </div>


        <div className="admin-actions">

          <button>
            ➕ Add Administrator
          </button>

          <button
            onClick={() =>
              window.location.href =
                "/superadmin/users"
            }
          >
            👥 Manage Users
          </button>

          <button>
            🔐 Security Settings
          </button>

        </div>

      </section>


      {/* STAFF ACCOUNTS */}

      <section className="superadmin-panel staff-panel">

        <div className="panel-title">

          <span>
            STAFF ACCOUNTS
          </span>

          <h2>
            Admin & Waiter Accounts
          </h2>

        </div>


        {staff.length === 0 ? (

          <div className="empty-staff">
            <p>
              No Admin or Waiter accounts found.
            </p>
          </div>

        ) : (

          <div className="staff-list">

            {staff.map((user) => (

              <div
                className="staff-card"
                key={user._id}
              >

                <div className="staff-info">

                  <div className="staff-avatar">
                    {user.role === "admin"
                      ? "🛡️"
                      : "👤"}
                  </div>

                  <div>

                    <h3>
                      {user.name}
                    </h3>

                    <p>
                      {user.email}
                    </p>

                  </div>

                </div>


                <div className="staff-account-right">

                  <div
                    className={`staff-role ${user.role}`}
                  >
                    {user.role}
                  </div>

                  <span
                    className={
                      user.isActive
                        ? "staff-status active"
                        : "staff-status disabled"
                    }
                  >
                    {user.isActive
                      ? "ACTIVE"
                      : "DISABLED"}
                  </span>

                  <button
                    className={
                      user.isActive
                        ? "staff-action disable"
                        : "staff-action activate"
                    }
                    onClick={() =>
                      toggleStatus(user._id)
                    }
                  >
                    {user.isActive
                      ? "Disable"
                      : "Activate"}
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default SuperAdminDashboard;
