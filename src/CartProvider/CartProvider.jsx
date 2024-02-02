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
      // console.log("Error getting cart Items :", error);
    }
  });

  const addItemToCart = (item) => {
    // Check if the item already exists in the cart based on its id
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // If the item already exists, update the existing item
      setCartItems((prevItems) => {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];

        // Check if quantity is defined and a number before incrementing
        if (
          existingItem.quantity !== undefined &&
          !isNaN(existingItem.quantity)
        ) {
          existingItem.quantity += 1;
        } else {
          // If quantity is undefined or not a number, set it to 1
          existingItem.quantity += 1;
        }

        // console.log(updatedItems);
        return updatedItems;
      });
    } else {
      // If the item is not in the cart, add it with an initial quantity of 1
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };
  // console.log(cartItems);

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
