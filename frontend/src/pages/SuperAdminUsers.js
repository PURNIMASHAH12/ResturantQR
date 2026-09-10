import { useEffect, useState } from "react";
import API from "../services/Api";
import "../styles/SuperAdminUsers.css";

function SuperAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await API.get("/superadmin/users");

      setUsers(response.data.users);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="superadmin-users-page">
        <h2>Loading users...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="superadmin-users-page">
        <h2>Unable to load users</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="superadmin-users-page">

      <div className="users-header">
        <div>
          <span>SUPER ADMIN</span>

          <h1>Manage Users</h1>

          <p>
            View and manage restaurant administrators
            and staff.
          </p>
        </div>
      </div>


      <div className="users-panel">

        <div className="users-panel-header">
          <h2>Restaurant Users</h2>

          <span>
            {users.length} users
          </span>
        </div>


        {users.length === 0 ? (

          <div className="no-users">
            No admin or waiter accounts found.
          </div>

        ) : (

          <div className="users-list">

            {users.map((user) => (

              <div
                className="user-card"
                key={user._id}
              >

                <div className="user-info">

                  <div className="user-avatar">
                    {user.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h3>{user.name}</h3>

                    <p>{user.email}</p>
                  </div>

                </div>


                <div className="user-role">

                  <span
                    className={
                      user.role === "admin"
                        ? "role-admin"
                        : "role-waiter"
                    }
                  >
                    {user.role}
                  </span>

                </div>


                <div className="user-status">
                  Active
                </div>


                <button className="manage-button">
                  Manage
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default SuperAdminUsers;

