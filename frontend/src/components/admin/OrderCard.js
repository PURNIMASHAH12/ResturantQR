function OrderCard({ order }) {
  return (
    <div className="order-card">

      {/* ORDER HEADER */}

      <h3>
        Order #{order.orderId}
      </h3>


      {/* CUSTOMER */}

      <p>
        {order.customerName}
      </p>

      <p>
        Table {order.tableNumber}
      </p>


      {/* ORDER ITEMS */}

      <div className="order-items">

        {order.items?.map((item, i) => (

          <p key={item._id || i}>
            {item.name || item.food?.name}
            {" × "}
            {item.quantity}
          </p>

        ))}

      </div>


      {/* TOTAL */}

      <h3>
        Rs. {Number(order.totalAmount || 0).toLocaleString()}
      </h3>


      {/* STATUS */}

      <p>
        ✓ {order.status}
      </p>

    </div>
  );
}

export default OrderCard;