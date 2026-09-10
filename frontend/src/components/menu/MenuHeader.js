function MenuHeader({
  customerName,
  tableNumber,
  cartCount,
  onCart,
  canOrder,
}) {
  return (
    <div className="menu-header">

      {canOrder ? (
        <div className="customer-details">

          <div className="customer-item">
            <div>
              <small>Customer</small>
              <strong>{customerName}</strong>
            </div>
          </div>

          <div className="customer-divider"></div>

          <div className="customer-item">
            <div>
              <small>Table</small>
              <strong>{tableNumber}</strong>
            </div>
          </div>

        </div>
      ) : (
        <div className="menu-browse-title">
          <strong>Our Menu</strong>
        </div>
      )}

      <button
        className="menu-cart-btn"
        onClick={onCart}
      >
        {canOrder ? "Cart" : "Start Ordering"}

        {canOrder && cartCount > 0 && (
          <span className="cart-count">
            {cartCount}
          </span>
        )}
      </button>

    </div>
  );
}

export default MenuHeader;