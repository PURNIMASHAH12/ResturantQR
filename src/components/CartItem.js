import { useCart } from "../context/CartContext";
function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();
  return (
    <div className="cart-item">
      <div>
        <h3>{item.name}</h3>

        <p>Rs. {item.price}</p>
      </div>
      <div>
        <button
          onClick={() =>
            decreaseQuantity(item._id)
          }
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() =>
            increaseQuantity(item._id)
          }
        >
          +
        </button>
      </div>
      <button
        onClick={() =>
          removeFromCart(item._id)
        }
      >
        Remove
      </button>
    </div>
  );
}
export default CartItem;