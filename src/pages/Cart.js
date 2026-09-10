import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalAmount,
  } = useCart();

  if (!cartItems.length) {
    return (
      <div className="cart-empty">
        <div>
          <span>🛒</span>
          <h1>Your Cart is Empty</h1>
          <p>Add some delicious food from the menu.</p>

          <button onClick={() => navigate("/menu")}>
            ← Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <header className="cart-header">
        <div>
          <h1>🛒 Your Cart</h1>
          <p>{cartItems.length} item(s) in your cart</p>
        </div>

        <button onClick={() => navigate("/menu")}>
          ← Menu
        </button>
      </header>

      <div className="cart-layout">

        <div className="cart-items">

          {cartItems.map(item => (
            <div className="cart-item" key={item.cartId}>

              <div className="cart-item-info">
                <h2>{item.name}</h2>
                <p>Rs. {item.price}</p>

                {item.remarks && (
                  <small>
                    📝 {item.remarks}
                  </small>
                )}
              </div>

              <div className="cart-quantity">
                <button onClick={() =>
                  decreaseQuantity(item.cartId)
                }>
                  −
                </button>

                <b>{item.quantity}</b>

                <button onClick={() =>
                  increaseQuantity(item.cartId)
                }>
                  +
                </button>
              </div>

              <strong className="item-price">
                Rs. {item.price * item.quantity}
              </strong>

              <button
                className="remove-btn"
                onClick={() =>
                  removeFromCart(item.cartId)
                }
              >
                🗑️
              </button>

            </div>
          ))}

        </div>

        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div>
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="cart-total">
            <b>Total</b>
            <b>Rs. {totalAmount}</b>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout →
          </button>

        </div>

      </div>
    </div>
  );
}

export default Cart;