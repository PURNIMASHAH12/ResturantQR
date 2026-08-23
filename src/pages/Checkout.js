import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTable } from "../context/TableContext";
import API from "../services/Api";
import "../styles/Checkout.css";

function Checkout() {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { customerName, tableNumber } = useTable();

  const [paymentMethod, setPaymentMethod] = useState("counter");
  const [confirmationMethod, setConfirmationMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!customerName || !tableNumber || !cartItems.length) {
      setError("Please check your customer information and cart.");
      return;
    }

    if (!confirmationMethod) {
      setError("Please choose an order confirmation method.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const orderData = {
        customerName,
        tableNumber: Number(tableNumber),
        items: cartItems.map(item => ({
          food: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          remarks: item.remarks || ""
        })),
        totalAmount,
        paymentMethod,
        confirmationMethod
      };

      const res = await API.post("/orders", orderData);

      if (!res.data.success) {
        setError(res.data.message || "Failed to place order.");
        return;
      }

      const order = res.data.order;

      if (confirmationMethod === "customer") {
        await API.put(`/orders/${order._id}/confirm`, {
          confirmationMethod: "customer"
        });
      }

      clearCart();

      navigate(
        `/order-success/${order._id}?method=${confirmationMethod}`
      );

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to place order."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems.length) {
    return (
      <div className="checkout-empty">
        <h1>🛒 Cart is Empty</h1>
        <button onClick={() => navigate("/menu")}>
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">

      <div className="checkout-header">
        <div>
          <h1>💳 Checkout</h1>
          <p>Review your order before placing it.</p>
        </div>

        <button onClick={() => navigate("/cart")}>
          ← Cart
        </button>
      </div>

      <div className="checkout-layout">

        <div className="checkout-main">

          {/* Customer */}
          <section className="checkout-card">
            <h2>👤 Customer Information</h2>

            <div className="customer-details">
              <div>
                <span>Name</span>
                <b>{customerName}</b>
              </div>

              <div>
                <span>Table</span>
                <b>Table {tableNumber}</b>
              </div>
            </div>
          </section>

          {/* Order */}
          <section className="checkout-card">
            <h2>🍽️ Your Order</h2>

            {cartItems.map(item => (
              <div className="checkout-item" key={item.cartId}>

                <div>
                  <b>{item.name}</b>
                  <p>
                    Rs. {item.price} × {item.quantity}
                  </p>

                  {item.remarks && (
                    <small>📝 {item.remarks}</small>
                  )}
                </div>

                <strong>
                  Rs. {item.price * item.quantity}
                </strong>

              </div>
            ))}

            <div className="checkout-total">
              <b>Total</b>
              <b>Rs. {totalAmount}</b>
            </div>
          </section>

          {/* Payment */}
          <section className="checkout-card">
            <h2>💰 Payment Method</h2>

            <label className="option">
              <input
                type="radio"
                value="counter"
                checked={paymentMethod === "counter"}
                onChange={e => setPaymentMethod(e.target.value)}
              />
              <span>💵 Pay at Counter</span>
            </label>

            <label className="option">
              <input
                type="radio"
                value="online"
                checked={paymentMethod === "online"}
                onChange={e => setPaymentMethod(e.target.value)}
              />
              <span>💳 Pay Online</span>
            </label>
          </section>

          {/* Confirmation */}
          <section className="checkout-card">
            <h2>🔔 Order Confirmation</h2>

            <label className="option">
              <input
                type="radio"
                name="confirmation"
                value="customer"
                checked={confirmationMethod === "customer"}
                onChange={e =>
                  setConfirmationMethod(e.target.value)
                }
              />
              <div>
                <b>Confirm My Order</b>
                <small>Order goes directly to the kitchen.</small>
              </div>
            </label>

            <label className="option">
              <input
                type="radio"
                name="confirmation"
                value="waiter"
                checked={confirmationMethod === "waiter"}
                onChange={e =>
                  setConfirmationMethod(e.target.value)
                }
              />
              <div>
                <b>Call Waiter</b>
                <small>Waiter will confirm your order.</small>
              </div>
            </label>
          </section>

        </div>

        {/* Summary */}
        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          <div>
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="summary-total">
            <b>Total</b>
            <b>Rs. {totalAmount}</b>
          </div>

          {error && (
            <p className="checkout-error">{error}</p>
          )}

          <button
            className="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={loading || !confirmationMethod}
          >
            {loading ? "Processing..." : "Place Order →"}
          </button>

          <button
            className="back-cart-btn"
            onClick={() => navigate("/cart")}
          >
            ← Back to Cart
          </button>
        </aside>

      </div>
    </div>
  );
}

export default Checkout;