import OrderCard from "./OrderCard";

function CompletedOrders({ orders }) {
  const completed = orders.filter(
    order => order.status === "completed"
  );

  return (
    <div>
      <h2>Completed Orders</h2>

      {completed.length === 0 ? (
        <div className="no-orders">
          No completed orders.
        </div>
      ) : (
        <div className="orders-list">
          {completed.map(order => (
            <OrderCard
              key={order._id}
              order={order}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CompletedOrders;