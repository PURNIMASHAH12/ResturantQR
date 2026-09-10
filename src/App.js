import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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

import { CartProvider } from "./context/CartContext";
import { TableProvider, useTable } from "./context/TableContext";

import WaiterDashboard from "./pages/waiter/WaiterDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminFood from "./pages/admin/AdminFood";
import AdminCategories from "./pages/admin/AdminCategories";


/* MENU PROTECTION */
function MenuGuard() {
  const { customerName, tableNumber } = useTable();
  const navigate = useNavigate();

  useEffect(() => {
    if (!customerName || !tableNumber) {
      navigate("/customer-info");
    }
  }, [customerName, tableNumber, navigate]);

  if (!customerName || !tableNumber) {
    return null;
  }

  return <Menu />;
}


function App() {
  return (
    <BrowserRouter>
      <TableProvider>
        <CartProvider>

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/pricing" element={<Pricing />} />

            <Route
              path="/customer-info"
              element={<CustomerInfo />}
            />

            {/* PROTECTED MENU */}
            <Route
              path="/menu"
              element={<MenuGuard />}
            />

            <Route path="/cart" element={<Cart />} />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/order-success/:orderId"
              element={<OrderSuccess />}
            />

            {/* WAITER */}
            <Route
              path="/waiter"
              element={<WaiterDashboard />}
            />

            {/* ADMIN */}
            <Route
              path="/admin"
              element={<AdminDashboard />}
            />

            <Route
              path="/admin/orders"
              element={<AdminOrders />}
            />

            <Route
              path="/admin/foods"
              element={<AdminFood />}
            />

            <Route
              path="/admin/categories"
              element={<AdminCategories />}
            />

          </Routes>

        </CartProvider>
      </TableProvider>
    </BrowserRouter>
  );
}

export default App;