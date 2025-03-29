import React, { useEffect } from 'react';
import ProductCard from '../Products/ProductCard';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../../app/features/product/productThunk';
import TruckLoader from '../Partials/Loader';
import { motion } from 'framer-motion';

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600">
      {status === "loading" ? (
        <TruckLoader />
      ) : status === "failed" ? (
        <p className="text-white">Error: {error}</p>
      ) : !Array.isArray(products) ? (
        <p className="text-white">No products available</p>
      ) : (
        <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col gap-4 flex-wrap justify-center items-center">
            {products.map((product, index) => (
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