import { useState } from "react";
import EditOrder from "./EditOrder";
import API from "../../services/Api";

function WaiterOrderCard({
  order,
  foods,
  onConfirm,
  onUpdate,
  onStatusChange,
}) {
  const [editing, setEditing] = useState(false);

  const saveOrder = (updatedOrder) => {
    onUpdate(updatedOrder);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="waiter-order-card">
        <EditOrder
          order={order}
          foods={foods}
          onSave={saveOrder}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }

  const nextStatus = {
    confirmed: "preparing",
    preparing: "ready",
    ready: "completed",
  };

  const next = nextStatus[order.status];

  const printBill = async () => {
    try {
      await API.post(`/orders/${order._id}/print`);

      alert("Order sent to kitchen.");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to print order."
      );
    }
  };

  const statusLabels = {
    pending: "Pending",
    waiter_requested: "Waiting",
    confirmed: "Confirmed",
    preparing: "Preparing",
    ready: "Ready",
    completed: "Completed",
  };

  const isParcel = order.orderType === "parcel";

  return (
    <article className="waiter-order-card">

      {/* ORDER HEADER */}
      <div className="order-top">

        <div>
          <p className="order-label">
            {isParcel ? "PARCEL ORDER" : "DINE-IN ORDER"}
          </p>

          <h2>
            {isParcel
              ? "Parcel"
              : `Table ${order.tableNumber}`}
          </h2>

          <p className="customer-name">
            {order.customerName}
          </p>
        </div>

        <span
          className={`status-badge status-${order.status}`}
        >
          {statusLabels[order.status] || order.status}
        </span>

      </div>

      {/* ORDER INFORMATION */}
      <div className="order-information">

        <div>
          <span>Payment Method</span>
          <strong>
            {order.paymentMethod}
          </strong>
        </div>

        <div>
          <span>Order ID</span>
          <strong>
            {order.orderId}
          </strong>
        </div>

      </div>

      {/* PARCEL INFORMATION */}
      {isParcel && (
        <div className="order-information">

          <div>
            <span>Contact Number</span>
            <strong>
              {order.contactNumber}
            </strong>
          </div>

          <div>
            <span>Delivery Address</span>
            <strong>
              {order.deliveryAddress}
            </strong>
          </div>

        </div>
      )}

      {/* ORDER ITEMS */}
      <div className="order-items-section">

        <h3>Order Items</h3>

        {order.items.map((item, i) => (
          <div
            className="waiter-order-item"
            key={i}
          >

            <div className="item-details">

              <strong>
                {item.name}
              </strong>

              <span>
                Rs. {item.price} × {item.quantity}
              </span>

              {item.remarks && (
                <small>
                  Note: {item.remarks}
                </small>
              )}

            </div>

            <strong>
              Rs. {item.price * item.quantity}
            </strong>

          </div>
        ))}

      </div>

      {/* TOTAL */}
      <div className="order-total">
        <span>Total Amount</span>

        <strong>
          Rs. {order.totalAmount}
        </strong>
      </div>

      {/* ACTION BUTTONS */}
      <div className="waiter-action-buttons">

        {(order.status === "pending" ||
          order.status === "waiter_requested") && (

          <>
            <button
              className="button-secondary"
              onClick={() => setEditing(true)}
            >
              Modify Order
            </button>

            <button
              className="button-primary"
              onClick={() =>
                onConfirm(order._id)
              }
            >
              Confirm Order
            </button>
          </>
        )}

        {order.status === "confirmed" && (
          <button
            className="button-print"
            onClick={printBill}
          >
            Print Bill
          </button>
        )}

        {next && (
          <button
            className="button-primary"
            onClick={() =>
              onStatusChange(
                order._id,
                next
              )
            }
          >
            {next === "preparing" &&
              "Start Preparing"}

            {next === "ready" &&
              "Mark Ready"}

            {next === "completed" &&
              "Complete Order"}
          </button>
        )}

      </div>

    </article>
  );
}

export default WaiterOrderCard;