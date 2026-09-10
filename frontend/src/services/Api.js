import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


// ===============================
// ADD TOKEN TO REQUEST
// ===============================

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// ===============================
// HANDLE DISABLED ACCOUNT
// ===============================

API.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
   console.log("INTERCEPTOR ERROR:", error.response?.status);
    console.log("INTERCEPTOR MESSAGE:", error.response?.data?.message);
    if (
      error.response?.status === 403 &&
      error.response?.data?.message ===
        "Your account has been disabled by Super Admin."
    ) {
 console.log("DISABLED ACCOUNT DETECTED!");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Save disabled message
      localStorage.setItem(
        "disabledMessage",
        "Your account has been disabled by Super Admin."
      );

      // Go to login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);


export default API;