import {
  createContext,
  useContext,
  useState
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);


  /* =========================
     ADD TO CART
  ========================= */

  const addToCart = (food) => {

    setCartItems((items) => {

      const existing = items.find(
        (item) =>
          item._id === food._id &&
          item.remarks === (food.remarks || "")
      );

      if (existing) {

        return items.map((item) =>
          item.cartId === existing.cartId
            ? {
                ...item,
                quantity:
                  item.quantity +
                  (food.quantity || 1)
              }
            : item
        );

      }

      return [
        ...items,

        {
          ...food,

          cartId:
            Date.now().toString() +
            Math.random(),

          quantity:
            food.quantity || 1,

          remarks:
            food.remarks || "",
        }
      ];

    });

  };


  /* =========================
     INCREASE
  ========================= */

  const increaseQuantity = (id) => {

    setCartItems((items) =>
      items.map((item) =>
        item.cartId === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );

  };


  /* =========================
     DECREASE
  ========================= */

  const decreaseQuantity = (id) => {

    setCartItems((items) =>
      items

        .map((item) =>
          item.cartId === id
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )

        .filter(
          (item) => item.quantity > 0
        )
    );

  };


  /* =========================
     UPDATE REMARKS
  ========================= */

  const updateRemarks = (id, remarks) => {

    setCartItems((items) =>
      items.map((item) =>
        item.cartId === id
          ? {
              ...item,
              remarks
            }
          : item
      )
    );

  };


  /* =========================
     REMOVE
  ========================= */

  const removeFromCart = (id) => {

    setCartItems((items) =>
      items.filter(
        (item) => item.cartId !== id
      )
    );

  };


  /* =========================
     CLEAR
  ========================= */

  const clearCart = () => {
    setCartItems([]);
  };


  /* =========================
     TOTAL
  ========================= */

  const totalAmount =
    cartItems.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );


  return (

    <CartContext.Provider
      value={{
        cartItems,

        addToCart,

        increaseQuantity,

        decreaseQuantity,

        updateRemarks,

        removeFromCart,

        clearCart,

        totalAmount,
      }}
    >

      {children}

    </CartContext.Provider>

  );

}


export const useCart = () =>
  useContext(CartContext);
