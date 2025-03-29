import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import productReducer from "./features/product/productSlice";
import cartReducer from "./features/cart/cartSlice";
const initaialState={
  auth:{
    user:null,
    isAuthenticated:false,
    loading:false,
    error:null,
  }
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
  },
  preloadedState:initaialState,
});

export default store;