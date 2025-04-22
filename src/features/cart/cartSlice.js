import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || []  // default empty array if nothing in localStorage
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      console.log(product)
      const exists = state.cart.find((item) => item && item.id === product.id);

      if (!exists) {
        state.cart.push(product);
        // Update localStorage with the new cart array
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else {
        alert("Product already exists in cart");
      }
    },
    deleteToCart: (state, action) => {
      const product = action.payload;
      state.cart = state.cart.filter(item => item.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
    
  },
});


export const { addToCart ,deleteToCart} = cartSlice.actions;

export default cartSlice.reducer;
