import { useEffect, useState } from "react";
import API from "../../services/Api";
import OrderTabs from "../../components/admin/OrderTabs";
import PendingOrders from "../../components/admin/PendingOrders";
import CompletedOrders from "../../components/admin/CompletedOrders";
import "../../styles/AdminOrders.css";
function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  useEffect(() => {
    API.get("/orders")
      .then(({ data }) => setOrders(data.orders || []))
      .catch(console.log);
  }, []);
  const updateStatus = async (id, status) => {
    try {
      const { data } = await API.put(`/orders/${id}/status`, {
        status,
      });
      if (data.success) {
        setOrders(prev =>
          prev.map(order =>
            order._id === id ? data.order : order
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="admin-orders">
      <h1>📦 Orders</h1>
      <OrderTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "pending" ? (
        <PendingOrders
          orders={orders}
          onStatusChange={updateStatus}
        />
      ) : (
        <CompletedOrders orders={orders} />
      )}
    </div>
  );
}

export default AdminOrders;