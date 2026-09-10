import OrderCard from "./OrderCard";

function CompletedOrders({ orders }) {
  return (
    <div className="completed-orders-list">

      {orders.length === 0 ? (

        <div className="orders-empty">

          <div className="orders-empty-icon">
            ✓
          </div>

          <h3>
            No completed orders
          </h3>

          <p>
            Completed orders for the selected period will appear here.
          </p>

        </div>

      ) : (

        <div className="orders-list">

          {orders.map((order) => (
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