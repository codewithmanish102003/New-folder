import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductById, createProduct , fetchOwnerProducts, deleteProduct } from "../../../services/api/productApi";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetchAllProducts();
      console.log(response)
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch single product by ID
export const fetchProductByIdThunk = createAsyncThunk(
  "products/fetchById",
  async (productId, thunkAPI) => {
    console.log(productId)
    try {
      const response = await fetchProductById(productId);
      console.log(response)
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create a new product
export const createProductThunk = createAsyncThunk(
  "products/create",
  async (product, thunkAPI) => {
    try {
      const response = await createProduct(product);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//owner products
export const fetchOwnerProductsThunk = createAsyncThunk(
  "products/fetchOwnerProducts",
  async (_, thunkAPI) => {
      try {
          const response = await fetchOwnerProducts()
          return response;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.message);
      }
  }
);

// Edit a product
export const editProductThunk = createAsyncThunk(
  "products/edit",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/products/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete a product
export const deleteProductThunk = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      const response = await deleteProduct(id)
      console.log(response)
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export default {
  fetchProducts,
  fetchProductByIdThunk,
  createProductThunk,
  fetchOwnerProductsThunk,
  editProductThunk,
  deleteProductThunk,
};