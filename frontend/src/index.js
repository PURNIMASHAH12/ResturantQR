import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { CartProvider } from "./context/CartContext";
import { TableProvider } from "./context/TableContext";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <TableProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </TableProvider>
  </React.StrictMode>
);