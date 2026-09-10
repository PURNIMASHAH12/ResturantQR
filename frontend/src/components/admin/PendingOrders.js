import OrderCard from "./OrderCard";
function PendingOrders({ orders, onStatusChange }) {
  const pending = orders.filter(
    order => order.status !== "completed"
  );

  return (
    <div>
      <h2>Pending Orders</h2>

      {pending.length === 0 ? (
        <div className="no-orders">
          No pending orders.
        </div>
      ) : (
        <div className="orders-list">
          {pending.map(order => (
            <OrderCard
              key={order._id}
              order={order}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default PendingOrders;