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
    updateRemarks,
    totalAmount,
  } = useCart();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  /* ================================
     EMPTY CART
  ================================= */

  if (!cartItems.length) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-box">
          <div className="empty-cart-icon">
            <span className="empty-cart-symbol"></span>
          </div>

          <h1>Your Cart is Empty</h1>

          <p>
            Looks like you haven't added anything to your
            order yet.
          </p>

          <button
            className="empty-menu-btn"
            onClick={() => navigate("/menu")}
          >
            Browse Our Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">

      {/* ================================
          HEADER
      ================================= */}

      <header className="cart-header">

        <div>
          <span className="cart-label">
            YOUR ORDER
          </span>

          <h1>Your Cart</h1>

          <p>
            {totalItems}{" "}
            {totalItems === 1 ? "item" : "items"} in your
            order
          </p>
        </div>

        <button
          className="back-menu-btn"
          onClick={() => navigate("/menu")}
        >
          <span>←</span>
          Continue Browsing
        </button>

      </header>

      {/* ================================
          CART CONTENT
      ================================= */}

      <div className="cart-layout">

        {/* LEFT — ITEMS */}

        <section className="cart-items">

          <div className="cart-items-heading">
            <h2>Your Selected Items</h2>

            <span>
              {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"}
            </span>
          </div>

          {cartItems.map((item) => (

            <article
              className="cart-item"
              key={item.cartId}
            >

              {/* FOOD IMAGE */}

              <div className="cart-food-image">

                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                ) : (
                  <div className="cart-image-placeholder">
                    Food
                  </div>
                )}

              </div>

              {/* FOOD DETAILS */}

              <div className="cart-item-info">

                <div className="cart-item-title">

                  <h2>{item.name}</h2>

                  {item.foodType && (
                    <span
                      className={
                        item.foodType === "veg"
                          ? "cart-veg-symbol"
                          : "cart-nonveg-symbol"
                      }
                    >
                      {item.foodType === "veg"
                        ? "V"
                        : "N"}
                    </span>
                  )}

                </div>

                <p className="cart-item-unit-price">
                  Rs. {item.price} each
                </p>

                {/* REMARKS */}

                <div className="cart-remarks">

                  <label>
                    Special Request
                    <span>Optional</span>
                  </label>

                  <textarea
                    value={item.remarks || ""}
                    onChange={(e) =>
                      updateRemarks(
                        item.cartId,
                        e.target.value
                      )
                    }
                    placeholder="Less spicy, no onion, etc."
                    rows="2"
                  />

                </div>

              </div>

              {/* QUANTITY */}

              <div className="cart-quantity-wrapper">

                <span>Quantity</span>

                <div className="cart-quantity">

                  <button
                    onClick={() =>
                      decreaseQuantity(item.cartId)
                    }
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <b>{item.quantity}</b>

                  <button
                    onClick={() =>
                      increaseQuantity(item.cartId)
                    }
                    aria-label="Increase quantity"
                  >
                    +
                  </button>

                </div>

              </div>

              {/* PRICE + REMOVE */}

              <div className="cart-item-actions">

                <strong className="item-price">
                  Rs. {item.price * item.quantity}
                </strong>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromCart(item.cartId)
                  }
                >
                  Remove
                </button>

              </div>

            </article>

          ))}

        </section>

        {/* RIGHT — SUMMARY */}

        <aside className="cart-summary">

          <div className="summary-heading">
            <div>
              <span>ORDER DETAILS</span>
              <h2>Order Summary</h2>
            </div>
          </div>

          <div className="summary-items">

            <div>
              <span>Items</span>
              <strong>{totalItems}</strong>
            </div>

            <div>
              <span>Subtotal</span>
              <strong>Rs. {totalAmount}</strong>
            </div>

          </div>

          <div className="summary-divider"></div>

          <div className="cart-total">

            <span>Total Amount</span>

            <strong>
              Rs. {totalAmount}
            </strong>

          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
            <span>→</span>
          </button>

          <button
            className="summary-menu-btn"
            onClick={() => navigate("/menu")}
          >
            + Add More Items
          </button>

          <p className="secure-order-note">
            Your order details will be confirmed before
            checkout.
          </p>

        </aside>

      </div>

    </div>
  );
}

export default Cart;

