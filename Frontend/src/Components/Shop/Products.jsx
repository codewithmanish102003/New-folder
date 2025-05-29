import { motion } from 'framer-motion';
import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../../app/features/product/productThunk';

// Lazy load ProductCard
const ProductCard = React.lazy(() => import('../Products/ProductCard'));

const categories = [
  { value: "", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "glasses", label: "Glasses" },
  { value: "tshirts", label: "T-Shirts" },
  { value: "shirts", label: "Shirts" },
];


const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let filtered = products;
    if (filter) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter((product) =>
        product.category && product.category.toLowerCase() === category.toLowerCase()
      );
    }
    setFilteredProducts(filtered);
  }, [filter, category, products]);
  

  return (
    <div className="min-h-screen flex flex-col items-center overflow-hidden bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
          {/* Filter Section */}
          <div className="md:col-span-1 w-full mb-4 md:mb-0">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:sticky md:top-0 md:left-10 md:w-64 md:h-[100vh] md:max-h-[84vh] md:shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-6 text-purple-600">Filters</h2>
              {/* Hide search on mobile */}
              <div className="mb-4 hidden md:block">
                <label className="block text-gray-700 mb-2 font-medium">Search</label>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full p-2 border rounded-lg"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
              {/* Category: select on mobile, radios on desktop */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Category</label>
                {/* Mobile: select */}
                <div className="block md:hidden">
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                {/* Desktop: radio */}
                <div className="hidden md:flex flex-col gap-2">
                  {categories.map((cat) => (
                    <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={category === cat.value}
                        onChange={() => setCategory(cat.value)}
                        className="accent-purple-500"
                      />
                      <span className="text-gray-700">{cat.label}</span>
                    </label>
                  ))}

                  <label className="block text-gray-700 mb-2 font-medium">Price Range</label>
                </div>
              </div>
            </div>
          </div>

          {/* Product List - Right, one per row */}
          <div className="md:col-span-4 w-full">
            {status === "loading" ? (
              <div className="min-h-[40vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : status === "failed" ? (
              <p className="text-red-500">Error: {error}</p>
            ) : !Array.isArray(filteredProducts) || filteredProducts.length === 0 ? (
              <p className="text-gray-500 flex items-center justify-center">No products available</p>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                <Suspense fallback={<div>Loading products...</div>}>
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full"
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </Suspense>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;