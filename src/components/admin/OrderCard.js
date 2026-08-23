function OrderCard({ order, onStatusChange }) {
  const nextStatus = {
    pending: "confirmed",
    confirmed: "preparing",
    preparing: "ready",
    ready: "completed",
  };

  const next = nextStatus[order.status];

  return (
    <div className="order-card">
      <h3>Order #{order._id}</h3>

      <p>👤 {order.customerName}</p>
      <p>🪑 Table {order.tableNumber}</p>

      {order.items?.map((item, i) => (
        <p key={item._id || i}>
          {item.name || item.food?.name} × {item.quantity}
        </p>
      ))}

      <h3>Rs. {order.totalAmount}</h3>

      <p>Status: {order.status}</p>

      {next && (
        <button onClick={() => onStatusChange(order._id, next)}>
          {next === "confirmed" && "✅ Confirm"}
          {next === "preparing" && "🍳 Start Preparing"}
          {next === "ready" && "🔔 Mark Ready"}
          {next === "completed" && "🎉 Complete Order"}
        </button>
      )}
    </div>
  );
}
export default OrderCard;