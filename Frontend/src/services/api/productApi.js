import axiosInstance from './axiosInstance';

// Fetch all products
export const fetchAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/products');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || 'Failed to fetch products');
  }
};

// Fetch a single product by ID
export const fetchProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || 'Failed to fetch product');
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post('/products/create', productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || 'Failed to create product');
  }
};

// Update an existing product
export const updateProduct = async (productId, productData) => {
  try {
    const response = await axiosInstance.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || 'Failed to update product');
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/products/${productId}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || 'Failed to delete product');
  }
};

//fetch products created by owner
export const fetchOwnerProducts = async ()=>{
  try{
    const response = await axiosInstance.get('/products/owner-products');
    console.log(response)
    return response.data
  }catch{
     throw new Error(error.response?.data || "Failed to fetch products")
  }
}
