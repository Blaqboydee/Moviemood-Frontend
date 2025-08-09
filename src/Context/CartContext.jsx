import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [show, setShow] = useState(false);

  const updateQuantity = (foodId, change, price, name) => {
    setFoodItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.foodId === foodId);

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        const currentItem = updatedItems[existingItemIndex];
        const newQuantity = Math.max(currentItem.quantity + change, 0);

        if (newQuantity === 0) {
          updatedItems.splice(existingItemIndex, 1);
        } else {
          updatedItems[existingItemIndex] = {
            ...currentItem,
            quantity: newQuantity,
          };
        }

        return updatedItems;
      } else if (change > 0) {
        return [...prevItems, { foodId, name, price, quantity: 1 }];
      }

      return prevItems;
    });
  };

  const getItemQuantity = (foodId) => {
    const item = foodItems.find(item => item.foodId === foodId);
    return item ? item.quantity : 0;
  };

  const totalPrice = foodItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ foodItems, totalPrice, updateQuantity, getItemQuantity, show, setShow }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
