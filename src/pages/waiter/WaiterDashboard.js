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
  const load = async () => {
    try {
      const [ordersRes, foodsRes] = await Promise.all([
        API.get("/orders"),
        API.get("/foods"),
      ]);
      setOrders(
        (ordersRes.data.orders || []).filter(
          o => o.status === "waiter_requested"
        ));
      setFoods(foodsRes.data.foods || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }};
  useEffect(() => {
    load();
    const update = order => {
      setOrders(prev =>
        order.status === "waiter_requested"
          ? [order, ...prev.filter(o => o._id !== order._id)]
          : prev.filter(o => o._id !== order._id)
      );
      if (order.status === "waiter_requested")
        setNewOrder(order);
    };
    socket.on("new-order", update);
    socket.on("order-updated", update);
    return () => {
      socket.off("new-order", update);
      socket.off("order-updated", update);
    };}, []);
  const confirmOrder = async id => {
    try {
      await API.put(`/orders/${id}/confirm`, {
        confirmationMethod: "waiter",
      });
      setOrders(prev => prev.filter(o => o._id !== id));
      setNewOrder(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to confirm order.");
    }};
  if (loading) return <h2>Loading...</h2>;
  return (
    <div className="waiter-dashboard">
      {newOrder && (
        <div className="new-order-alert">
          🔔 New request — Table {newOrder.tableNumber}
          <button onClick={() => setNewOrder(null)}>✕</button>
        </div>
      )}
      <h1>👨‍💼 Waiter Dashboard</h1>
      <button onClick={load}>🔄 Refresh</button>
      <WaiterStats orders={orders} />
      {!orders.length ? (
        <div className="no-orders">
          <h2>😊 No customers waiting</h2>
          <p>New waiter requests will appear here.</p>
        </div>
      ) : (
        orders.map(order => (
          <WaiterOrderCard
            key={order._id}
            order={order}
            foods={foods}
            onConfirm={confirmOrder}
            onUpdate={updated =>
              setOrders(prev =>
                prev.map(o => o._id === updated._id ? updated : o)
              )}/>))
      )}
    </div>
  );}
export default WaiterDashboard;