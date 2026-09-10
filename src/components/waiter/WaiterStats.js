function WaiterStats({ orders }) {
  const items = orders.reduce(
    (total, order) => total + order.items.length,
    0
  );

  const tables = new Set(
    orders.map(order => order.tableNumber)
  ).size;

  return (
    <div className="waiter-stats">
      <div>
        <span>🔔</span>
        <b>{orders.length}</b>
        <p>Waiting</p>
      </div>

      <div>
        <span>🍽️</span>
        <b>{items}</b>
        <p>Items</p>
      </div>

      <div>
        <span>🪑</span>
        <b>{tables}</b>
        <p>Tables</p>
      </div>
    </div>
  );
}

export default WaiterStats;