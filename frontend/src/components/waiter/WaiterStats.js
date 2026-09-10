function WaiterStats({ orders = [] }) {

const waiting = orders.filter(
order =>
order.status === "pending" ||
order.status === "waiter_requested"
).length;

const active = orders.filter(
order =>
order.status === "confirmed" ||
order.status === "preparing" ||
order.status === "ready"
).length;

const completed = orders.filter(
order => order.status === "completed"
).length;

return ( <div className="waiter-stats">

  {/* WAITING */}
  <div className="stat-card waiting-stat">

    <div className="stat-content">

      <span className="stat-title">
        Waiting Orders
      </span>

      <strong className="stat-number">
        {waiting}
      </strong>

      <span className="stat-description">
        Requires attention
      </span>

    </div>

    <div className="stat-indicator"></div>

  </div>


  {/* ACTIVE */}
  <div className="stat-card active-stat">

    <div className="stat-content">

      <span className="stat-title">
        Active Orders
      </span>

      <strong className="stat-number">
        {active}
      </strong>

      <span className="stat-description">
        Currently in progress
      </span>

    </div>

    <div className="stat-indicator"></div>

  </div>


  {/* COMPLETED */}
  <div className="stat-card completed-stat">

    <div className="stat-content">

      <span className="stat-title">
        Completed Orders
      </span>

      <strong className="stat-number">
        {completed}
      </strong>

      <span className="stat-description">
        Successfully served
      </span>

    </div>

    <div className="stat-indicator"></div>

  </div>

</div>


);
}

export default WaiterStats;
