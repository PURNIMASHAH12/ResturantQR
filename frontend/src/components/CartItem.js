import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h3>
          {item.foodType === "veg" && <span className="veg-symbol">●</span>}
          {item.foodType === "nonveg" && <span className="nonveg-symbol">●</span>}
          {item.name}
        </h3>
        <p>Rs. {item.price}</p>
        
        {/* ===== SPECIAL REQUEST SECTION ===== */}
        {item.remarks && item.remarks.trim() && (
          <div className="cart-item-remarks">
            <span className="remarks-label">📝 Special Request</span>
            <span className="remarks-text">{item.remarks}</span>
          </div>
        )}
      </div>

      <div className="cart-quantity">
        <button onClick={() => decreaseQuantity(item._id)}>−</button>
        <span>{item.quantity}</span>
        <button onClick={() => increaseQuantity(item._id)}>+</button>
      </div>

      <div className="item-price">
        Rs. {item.price * item.quantity}
      </div>

      <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
        ✕
      </button>
    </div>
  );
}

export default CartItem;