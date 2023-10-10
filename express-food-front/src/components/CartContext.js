import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  cart: []
};

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FOOD':
      return { ...state, cart: [...state.cart, action.item] };
    case 'REMOVE_FOOD':
      return { ...state, cart: state.cart.filter(item => item.id !== action.id) };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
