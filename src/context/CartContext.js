import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (food) => {
    setCartItems((items) => {
      const existing = items.find(
        (item) =>
          item._id === food._id && item.remarks === food.remarks
      );
      if (existing) {
        return items.map((item) =>
          item._id === food._id && item.remarks === food.remarks
            ? { ...item, quantity: item.quantity + food.quantity }
            : item
        ); }
      return [
        ...items,
        {
          ...food,
          cartId: Date.now().toString() + Math.random(),
          quantity: food.quantity || 1,
          remarks: food.remarks || "",
        },];});};
  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.cartId === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));};
  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.cartId === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );};
  const removeFromCart = (id) => {
    setCartItems((items) => items.filter((item) => item.cartId !== id));
  };
  const clearCart = () => setCartItems([]);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalAmount,
      }}>
      {children}
    </CartContext.Provider>
  );}
export const useCart = () => useContext(CartContext);