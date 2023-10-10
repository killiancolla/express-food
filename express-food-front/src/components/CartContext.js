import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  cart: []
};

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FOOD':
      const idExist = state.cart.some(item => item._id == action.item._id);
      if (idExist) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item._id === action.item._id
              ? { ...item, nb: item.nb + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.item, nb: 1 }],
        };
      }

    case 'UPDATE_NB':
      if (action.nb === 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item._id !== action.id),
        };
      } else {
        return {
          ...state,
          cart: state.cart.map(item =>
            item._id === action.id
              ? { ...item, nb: action.nb }
              : item
          ),
        };
      }

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
