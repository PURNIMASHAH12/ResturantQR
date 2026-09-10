function MenuHeader({
  customerName,
  tableNumber,
  cartCount,
  onCart
}) {
  return (
    <header className="menu-header">

      <div>
        <h1>🍽️ Our Menu</h1>

        <p>
          {customerName} · Table {tableNumber}
        </p>
      </div>

      <button onClick={onCart}>
        🛒 Cart ({cartCount})
      </button>

    </header>
  );
}

export default MenuHeader;