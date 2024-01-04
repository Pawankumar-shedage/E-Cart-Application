/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // cart functions()
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) =>
      // returning all items except item having id== iteId
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const clearCart = () => {
    // empty cart.
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ addItemToCart, removeFromCart, clearCart, cartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
