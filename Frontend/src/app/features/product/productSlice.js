import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, createProductThunk , fetchOwnerProductsThunk ,editProductThunk,deleteProductThunk,fetchProductByIdThunk} from "./productThunk";

const initialState = {
  product: [],
  products: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchProductByIdThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
        console.log(action.payload)
      })
      .addCase(fetchProductByIdThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createProductThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchOwnerProductsThunk.pending, (state) => {
        state.status = "loading";
    })
    .addCase(fetchOwnerProductsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
    })
    .addCase(fetchOwnerProductsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
    })
    .addCase(editProductThunk.fulfilled, (state, action) => {
      const index = state.products.findIndex((product) => product._id === action.payload._id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    })
    .addCase(deleteProductThunk.fulfilled, (state, action) => {
      state.products = state.products.filter((product) => product._id !== action.meta.arg);
    });
  },
});

export default productSlice.reducer;