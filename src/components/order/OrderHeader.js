function OrderHeader({ order }) {
  return (
    <>
      <div className="success-header">
        <h1>🎉 Order Placed!</h1>
        <p>Thank you for your order.</p>
      </div>

      <div className="order-id">
        <p>Order ID</p>
        <strong>{order._id}</strong>
      </div>
    </>
  );
}

export default OrderHeader;