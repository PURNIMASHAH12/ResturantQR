import { useState } from "react";
import EditOrder from "./EditOrder";

function WaiterOrderCard({ order, foods, onConfirm, onUpdate }) {
  const [editing, setEditing] = useState(false);

  const saveOrder = order => {
    onUpdate(order);
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

  return (
    <div className="waiter-order-card">

      <div className="order-top">
        <div>
          <h2>🪑 Table {order.tableNumber}</h2>
          <p>
            Customer: <b>{order.customerName}</b>
          </p>
        </div>

        <span className="waiting-badge">🔔 Waiting</span>
      </div>

      <p>
        Payment: <b>{order.paymentMethod}</b>
      </p>

      <h3>🍽️ Ordered Items</h3>

      {order.items.map((item, i) => (
        <div className="waiter-order-item" key={i}>
          <span>
            <b>{item.name}</b>
            <br />
            Rs. {item.price} × {item.quantity}

            {item.remarks && (
              <>
                <br />
                Remark: {item.remarks}
              </>
            )}
          </span>

          <b>Rs. {item.price * item.quantity}</b>
        </div>
      ))}

      <h3>Total: Rs. {order.totalAmount}</h3>

      <button onClick={() => setEditing(true)}>
        ✏️ Modify
      </button>

      <button onClick={() => onConfirm(order._id)}>
        ✅ Confirm
      </button>
    </div>
  );
}

export default WaiterOrderCard;