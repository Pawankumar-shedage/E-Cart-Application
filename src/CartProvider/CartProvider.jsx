/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CART_STORAGE = "cartItems";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCartItems = localStorage.getItem(CART_STORAGE);
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (error) {
      console.log("Error getting cart Items :", error);
    }
  });

  const addItemToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error storing cart items in localStorage:", error);
    }
  }, [cartItems]);

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
