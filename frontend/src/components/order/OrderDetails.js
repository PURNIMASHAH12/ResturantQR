function OrderDetails({ order }) {
  return (
    <div className="order-details">
      <h2>Order Details</h2>

      <p><b>Customer:</b> {order.customerName}</p>
      <p><b>Table:</b> {order.tableNumber}</p>

      <p>
        <b>Payment:</b>{" "}
        {order.paymentMethod === "online"
          ? "Online"
          : "Pay at Counter"}
      </p>

      <hr />

      {order.items?.map((item, i) => (
        <div className="order-item" key={item._id || i}>
          <div>
            <b>{item.name || item.food?.name}</b>
            <p>
              {item.quantity} × Rs.{item.price}
            </p>

            {item.remarks && (
              <small>Remark: {item.remarks}</small>
            )}
          </div>

          <b>Rs.{item.price * item.quantity}</b>
        </div>
      ))}

      <hr />

      <h2 className="total">
        Total: Rs.{order.totalAmount}
      </h2>
    </div>
  );
}

export default OrderDetails;