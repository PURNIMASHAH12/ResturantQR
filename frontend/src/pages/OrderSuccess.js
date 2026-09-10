import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/Api";
import socket from "../services/Socket";
import OrderHeader from "../components/order/OrderHeader";
import OrderConfirmation from "../components/order/OrderConfirmation";
import OrderTracking from "../components/order/OrderTracking";
import OrderDetails from "../components/order/OrderDetails";
import "../styles/OrderSuccess.css";

function OrderSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get(`/orders/${orderId}/customer`)
      .then(({ data }) => setOrder(data.order))
      .catch(() => setMessage("Failed to load order."));

    const update = (data) => {
      if (data._id === orderId) setOrder(data);
    };

    socket.on("order-updated", update);
    socket.on("order-confirmed", update);

    return () => {
      socket.off("order-updated", update);
      socket.off("order-confirmed", update);
    };
  }, [orderId]);

  const updateOrder = async (type) => {
    try {
      const url =
        type === "confirm"
          ? `/orders/${orderId}/customer_confirm`
          : `/orders/${orderId}/status`;

      const body =
        type === "confirm"
          ? { confirmationMethod: "customer" }
          : { status: "waiter_requested" };

      const { data } = await API.put(url, body);

      setOrder(data.order);
      setMessage(
        type === "confirm"
          ? " Order confirmed!"
          : " Waiter has been notified."
      );
    } catch {
      setMessage("Something went wrong.");
    }
  };

  if (!order)
    return <div className="order-success">Loading...</div>;

  return (
    <div className="order-success">

      <OrderHeader order={order} />

      <OrderConfirmation
        status={order.status}
        onAction={updateOrder}
        orderType={order.orderType}
      />
      <OrderTracking status={order.status} />

      {message && (
        <div className="order-message">
          {message}
        </div>
      )}

      <OrderDetails order={order} />

      <button
        className="back-menu"
        onClick={() => navigate("/menu")}
      >
        ← Back to Menu
      </button>

    </div>
  );
}

export default OrderSuccess;