const steps = [
  ["confirmed", "Confirmed"],
  ["preparing", "Preparing"],
  ["ready", "Ready"],
  ["completed", "Completed"],
];

function OrderTracking({ status }) {
  const current = steps.findIndex(
    ([name]) => name === status
  );

  if (current < 0) return null;

  return (
    <div className="order-tracking">
      <h2>Order Status</h2>

      <div className="status-timeline">
        {steps.map(([name, label], i) => (
          <div
            key={name}
            className={`status-step ${
              current >= i ? "completed" : ""
            }`}
          >
            <div className="status-icon">
              {i + 1}
            </div>

            <b>{label}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderTracking;