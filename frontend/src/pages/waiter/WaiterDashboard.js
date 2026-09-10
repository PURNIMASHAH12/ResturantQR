import { useEffect, useState } from "react";
import API from "../../services/Api";
import socket from "../../services/Socket";
import WaiterStats from "../../components/waiter/WaiterStats";
import WaiterOrderCard from "../../components/waiter/WaiterOrderCard";
import "../../styles/WaiterDashboard.css";

function WaiterDashboard() {
const [orders, setOrders] = useState([]);
const [foods, setFoods] = useState([]);
const [newOrder, setNewOrder] = useState(null);
const [loading, setLoading] = useState(true);

// Waiting is selected by default
const [filter, setFilter] = useState("waiting");

const load = async () => {
try {
setLoading(true);
  const [ordersRes, foodsRes] = await Promise.all([
    API.get("/orders"),
    API.get("/foods"),
  ]);
  setOrders(ordersRes.data.orders || []);
  setFoods(foodsRes.data.foods || []);
} catch (err) {
  console.log(err);
} finally {
  setLoading(false);
}
};
useEffect(() => {
load();
const update = (order) => {
  setOrders((prev) => {
    const exists = prev.some(
      (item) => item._id === order._id
    );
    if (exists) {
      return prev.map((item) =>
        item._id === order._id
          ? order
          : item
      );
    }
    return [order, ...prev];
  });
  if (order.status === "waiter_requested") {
    setNewOrder(order);
  }
};
socket.on("new-order", update);
socket.on("order-updated", update);
return () => {
  socket.off("new-order", update);
  socket.off("order-updated", update);
};
}, []);
const confirmOrder = async (id) => {
try {
const response = await API.put(
`/orders/${id}/confirm`,
{
confirmationMethod: "waiter",
}
);
  const confirmedOrder = response.data.order;
  setOrders((prev) =>
    prev.map((order) =>
      order._id === id
        ? confirmedOrder
        : order
    )
  );

  setNewOrder(null);
} catch (err) {
  alert(
    err.response?.data?.message ||
    "Failed to confirm order."
  );
}
};
const updateOrder = (updated) => {
setOrders((prev) =>
prev.map((order) =>
order._id === updated._id
? updated
: order
));};
const updateOrderStatus = async (id, status) => {
try {
const response = await API.put(
`/orders/${id}/status`,
{ status }
);
  const updatedOrder = response.data.order;
  setOrders((prev) =>
    prev.map((order) =>
      order._id === id
        ? updatedOrder
        : order
    )
  );
} catch (err) {
  alert(
    err.response?.data?.message ||
    "Failed to update order status."
  );
}
};
// Filter orders for the list
const filteredOrders =
filter === "waiting"
? orders.filter(
(order) =>
order.status === "pending" ||
order.status === "waiter_requested"
)
: orders.filter(
(order) => order.status === "confirmed"
);

if (loading) {
return ( <div className="waiter-loading"> <div className="loading-spinner"></div> <p>Loading dashboard...</p> </div>
);
}

return ( <div className="waiter-page"> <main className="waiter-dashboard">

```
    {newOrder && (
      <div className="new-order-alert">
        <div>
          <strong>New Order Request</strong>

          <span>
            Customer at Table {newOrder.tableNumber}
            is waiting for assistance.
          </span>
        </div>

        <button
          className="alert-close"
          onClick={() => setNewOrder(null)}
        >
          Close
        </button>
      </div>
    )}

    <header className="waiter-header">

      <div>
        <p className="page-label">
          RESTAURANT MANAGEMENT
        </p>

        <h1>Waiter Dashboard</h1>

        <p className="page-description">
          Manage customer orders and service requests.
        </p>
      </div>

      <button
        className="refresh-button"
        onClick={load}
      >
        Refresh
      </button>

    </header>

    <WaiterStats orders={orders} />

    <section className="waiter-section">

      <div className="section-header">

        <div>
          <h2>Orders</h2>

          <p>
            Manage customer orders
          </p>
        </div>

        <div className="order-filter">
          <label htmlFor="order-filter">
            Filter
          </label>

          <select
            id="order-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="waiting">
              Waiting
            </option>

            <option value="active">
              Active
            </option>
          </select>
        </div>

        <span className="order-count">
          {filteredOrders.length}
        </span>

      </div>

      {!filteredOrders.length ? (

        <div className="no-orders">

          <div className="empty-icon">
            —
          </div>

          <h2>
            {filter === "waiting"
              ? "No Waiting Orders"
              : "No Active Orders"}
          </h2>

          <p>
            {filter === "waiting"
              ? "New orders waiting for confirmation will appear here."
              : "Confirmed orders will appear here."}
          </p>

        </div>

      ) : (

        <div className="waiter-orders">

          {filteredOrders.map((order) => (
            <WaiterOrderCard
              key={order._id}
              order={order}
              foods={foods}
              onConfirm={confirmOrder}
              onUpdate={updateOrder}
              onStatusChange={updateOrderStatus}
            />
          ))}

        </div>

      )}

    </section>

  </main>
</div>
);
}
export default WaiterDashboard;
