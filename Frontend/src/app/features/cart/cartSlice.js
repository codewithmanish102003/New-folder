import { createSlice } from "@reduxjs/toolkit";
import { addToCartThunk, fetchCartProductsThunk, removeProductThunk, updateQuantityThunk } from "./cartThunk";

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
        const { productId } = action.payload;
        state.cart = state.cart.filter(item => item.product._id !== productId); // Remove item locally
        state.status = "succeeded";
      })
      .addCase(removeProductThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateQuantityThunk.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        const cartItem = state.cart.find(item => item.product._id === productId);
        if (cartItem) {
          cartItem.quantity = quantity; // Update quantity locally
        }
        state.cart = [...state.cart]; // Create a new array to trigger re-render
        state.status = "succeeded";
      })
      .addCase(updateQuantityThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  }
})

export default cartSlice.reducer;