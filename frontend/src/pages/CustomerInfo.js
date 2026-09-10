import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "../context/TableContext";
import "../styles/CustomerInfo.css";

function CustomerInfo() {
  const [name, setName] = useState("");
  const [orderType, setOrderType] = useState("dine_in");
  const [tableNumber, setTableNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  const { saveCustomerInfo } = useTable();
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (orderType === "dine_in") {
      if (!tableNumber.trim()) {
        alert("Please enter your table number.");
        return;
      }

      saveCustomerInfo(
        name.trim(),
        tableNumber.trim(),
        "dine_in",
        "",
        ""
      );
    }

    if (orderType === "parcel") {
      if (!contactNumber.trim() || !address.trim()) {
        alert("Please enter your contact number and address.");
        return;
      }

      saveCustomerInfo(
        name.trim(),
        "",
        "parcel",
        contactNumber.trim(),
        address.trim()
      );
    }

    navigate("/menu");
  };

  return (
    <div className="customer-info-page">

      <button
        type="button"
        className="back-home-btn"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>

      <div className="customer-info-card">

        <h1>Welcome</h1>
        <p>Enter your details to start your order.</p>

        {/* ORDER TYPE FIRST */}
        <label>Order Type</label>

        <div className="order-type-options">

          <button
            type="button"
            className={
              orderType === "dine_in"
                ? "order-type-btn active"
                : "order-type-btn"
            }
            onClick={() => setOrderType("dine_in")}
          >
            Dine-in
          </button>

          <button
            type="button"
            className={
              orderType === "parcel"
                ? "order-type-btn active"
                : "order-type-btn"
            }
            onClick={() => setOrderType("parcel")}
          >
            Parcel
          </button>

        </div>

        {/* CUSTOMER NAME SECOND */}
        <label>Customer Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        {/* DINE-IN */}
        {orderType === "dine_in" && (
          <>
            <label>Table Number</label>

            <input
              type="number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Enter table number"
            />
          </>
        )}

        {/* PARCEL */}
        {orderType === "parcel" && (
          <>
            <label>Contact Number</label>

            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter contact number"
            />

            <label>Delivery Address</label>

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter delivery address"
              rows="3"
            />
          </>
        )}

        <button
          type="button"
          onClick={handleContinue}
        >
          Continue to Menu →
        </button>

      </div>
    </div>
  );
}

export default CustomerInfo;