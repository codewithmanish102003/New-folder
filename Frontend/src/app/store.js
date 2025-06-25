import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/product/productSlice";

const initaialState={
  auth:{
    user:null,
    isAuthenticated:false,
    loading:false,
    error:null,
  }
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'] // persist these slices
};

const persistedReducer = persistReducer(persistConfig, {
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: persistedReducer,
  preloadedState:initaialState,
});

export const persistor = persistStore(store);

export default store;