import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pricing from "./pages/Pricing";
import CustomerInfo from "./pages/CustomerInfo";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import About from "./pages/About";

import { CartProvider } from "./context/CartContext";
import { TableProvider, useTable } from "./context/TableContext";

import ProtectedRoute from "./ProtectedRoute";

import WaiterDashboard from "./pages/waiter/WaiterDashboard";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminFood from "./pages/admin/AdminFood";
import AdminCategories from "./pages/admin/AdminCategories";

import SuperAdminTest from "./pages/SuperAdminTest";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SuperAdminUsers from "./pages/SuperAdminUsers";

import Footer from "./components/common/Footer";
import "./styles/Global.css";
import Navbar from "./components/common/navbar/Navbar";

function GlobalNavbar() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  if (hideNavbar) {
    return null;
  }

  return <Navbar />;
}
/* =========================================
   MENU PROTECTION
========================================= */
function MenuGuard() {
  const {
    customerName,
    tableNumber,
    orderType,
    contactNumber,
    deliveryAddress,
  } = useTable();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("MENU GUARD:", {
      customerName,
      tableNumber,
      orderType,
      contactNumber,
      deliveryAddress,
    });

    const validDineIn =
      orderType === "dine_in" &&
      customerName &&
      tableNumber;

    const validParcel =
      orderType === "parcel" &&
      customerName &&
      contactNumber &&
      deliveryAddress;

    if (!validDineIn && !validParcel) {
      console.log("MENU GUARD: INVALID - REDIRECTING");
      navigate("/customer-info", { replace: true });
    }
  }, [
    customerName,
    tableNumber,
    orderType,
    contactNumber,
    deliveryAddress,
    navigate,
  ]);

  const validDineIn =
    orderType === "dine_in" &&
    customerName &&
    tableNumber;

  const validParcel =
    orderType === "parcel" &&
    customerName &&
    contactNumber &&
    deliveryAddress;

  if (!validDineIn && !validParcel) {
    return null;
  }

  return <Menu />;
}
/* =========================================
   APP CONTENT
========================================= */

function App() {
  return (
    <BrowserRouter>
    <TableProvider>
      <CartProvider>
         <GlobalNavbar />
        <Routes>

          {/* ================================
              CUSTOMER
          ================================= */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/pricing"
            element={<Pricing />}
          />

          <Route
            path="/customer-info"
            element={<CustomerInfo />}
          />

          {/* ================================
              LOGIN
          ================================= */}

          <Route
            path="/login"
            element={<Login />}
          />

          {/* ================================
              MENU
          ================================= */}

         <Route path="/menu" element={<Menu />} />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/order-success/:orderId"
            element={<OrderSuccess />}
          />

          {/* ================================
              SUPER ADMIN
          ================================= */}

          <Route
            path="/superadmin-test"
            element={<SuperAdminTest />}
          />

          <Route
            path="/superadmin"
            element={
              <ProtectedRoute role="superadmin">
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/superadmin/users"
            element={
              <ProtectedRoute role="superadmin">
                <SuperAdminUsers />
              </ProtectedRoute>
            }
          />

          {/* ================================
              WAITER
          ================================= */}

          <Route
            path="/waiter"
            element={
              <ProtectedRoute role="waiter">
                <WaiterDashboard />
              </ProtectedRoute>
            }
          />

          {/* ================================
              ADMIN
          ================================= */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute role="admin">
                <AdminOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/foods"
            element={
              <ProtectedRoute role="admin">
                <AdminFood />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute role="admin">
                <AdminCategories />
              </ProtectedRoute>
            }
          />

        </Routes>

        {/* =================================
            GLOBAL FOOTER
        ================================= */}

        <Footer />

      </CartProvider>
    </TableProvider>
    </BrowserRouter>
  );
}

export default App;

