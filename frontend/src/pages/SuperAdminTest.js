import { useEffect, useState } from "react";
import API from "../services/Api";

function SuperAdminTest() {
  const [message, setMessage] = useState("Checking access...");

  useEffect(() => {
    API.get("/superadmin")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(
          error.response?.data?.message ||
          "Access denied"
        );
      });
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Super Admin Test</h1>
      <p>{message}</p>
    </div>
  );
}

export default SuperAdminTest;