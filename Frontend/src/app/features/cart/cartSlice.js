import { createSlice } from "@reduxjs/toolkit";
import { fetchCartProductsThunk, removeProductThunk, addToCartThunk, updateQuantityThunk } from "./cartThunk";

const initialState = {
  status: 'active',
  error: 'null',
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProductsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartProductsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload.cart;
        state.total = action.payload.total;
      })
      .addCase(fetchCartProductsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const product = action.payload;
        const existingProduct = state.cart.find(item => item._id === product._id);
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          state.cart.push({ ...product, quantity: 1 });
        }
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeProductThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = state.cart.filter(item => item._id !== action.payload._id);
      })
      .addCase(removeProductThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateQuantityThunk.fulfilled, (state, action) => {
        const cartItemIndex = state.cart.findIndex(item => item._id === action.payload._id);
        if (cartItemIndex !== -1) {
          state.cart[cartItemIndex] = action.payload;
          state.status="succeeded"
          
        }
      })
      .addCase(updateQuantityThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  }
})

export default cartSlice.reducer;