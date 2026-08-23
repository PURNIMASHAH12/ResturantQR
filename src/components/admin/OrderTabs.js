function OrderTabs({ activeTab, setActiveTab }) {
  return (
    <div className="order-tabs">
      <button
        className={activeTab === "pending" ? "active" : ""}
        onClick={() => setActiveTab("pending")}
      >
        Pending Orders
      </button>

      <button
        className={activeTab === "completed" ? "active" : ""}
        onClick={() => setActiveTab("completed")}
      >
        Completed Orders
      </button>
    </div>
  );
}

export default OrderTabs;