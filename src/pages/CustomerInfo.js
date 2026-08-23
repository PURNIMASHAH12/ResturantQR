import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "../context/TableContext";
import "../styles/CustomerInfo.css";

function CustomerInfo() {
  const [name, setName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const { saveCustomerInfo } = useTable();
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();

    if (!name.trim() || !tableNumber.trim()) {
      alert("Please enter your name and table number.");
      return;
    }

    saveCustomerInfo(name.trim(), tableNumber.trim());
    navigate("/menu");
  };

  return (
    <div className="customer-info-page">
      <div className="customer-info-card">
        <h1>🍽️ Welcome!</h1>
        <p>Enter your details to start your order.</p>

        <label>Customer Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your name"
        />

        <label>Table Number</label>
        <input
          type="number"
          value={tableNumber}
          onChange={e => setTableNumber(e.target.value)}
          placeholder="Enter table number"
        />

        <button onClick={handleContinue}>
          Continue to Menu →
        </button>
      </div>
    </div>
  );
}
export default CustomerInfo;