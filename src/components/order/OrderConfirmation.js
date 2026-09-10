function OrderConfirmation({ status, onAction }) {
  if (status === "waiter_requested")
    return (
      <div className="order-message">
        👨‍🍳 Waiter has been notified.
      </div>
    );

  if (status !== "pending") return null;

  return (
    <div className="confirmation-section">
      <h2>Confirm Your Order</h2>

      <button onClick={() => onAction("confirm")}>
        ✅ Confirm
      </button>

      <button onClick={() => onAction("waiter")}>
        👨‍🍳 Call Waiter
      </button>
    </div>
  );
}

export default OrderConfirmation;