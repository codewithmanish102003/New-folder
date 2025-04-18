import React, { useEffect, useState } from 'react';
import ProductCard from '../Products/ProductCard';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../../app/features/product/productThunk';
import { motion } from 'framer-motion';

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (filter) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [filter, products]);

  return (
    <div className="min-h-screen flex flex-col items-center overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600">
      {/* Filter Section */}
      <div className="w-full bg-white shadow-md p-4">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full md:w-1/3 p-2 border rounded-lg"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <select
            className="w-full md:w-1/4 p-2 border rounded-lg"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="bags">Bags</option>
            <option value="glasses">Glasses</option>
            <option value="tshirts">T-Shirts</option>
            <option value="shirts">Shirts</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      {status === "loading" ? ( 
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : status === "failed" ? (
        <p className="text-white">Error: {error}</p>
      ) : !Array.isArray(filteredProducts) || filteredProducts.length === 0 ? (
        <p className="text-white flex items-center justify-center">No products available</p>
      ) : (
        <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col gap-4 flex-wrap justify-center items-center">
            {filteredProducts.map((product, index) => (
              <React.Fragment key={product._id}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full"
                >
                  <ProductCard product={product} />
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;