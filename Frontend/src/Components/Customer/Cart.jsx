import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus, FaShoppingBag, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartProductsThunk, removeProductThunk, updateQuantityThunk } from '../../app/features/cart/cartThunk';
import { toast } from 'react-toastify'

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, status } = useSelector((state) => state.cart);


  useEffect(() => {
    fetchCartProducts();
  }, []);

  useEffect(() => {
    dispatch(fetchCartProductsThunk());
  }, [dispatch]);

  const fetchCartProducts = async () => {
    try {
      dispatch(fetchCartProductsThunk());
    } catch (error) {
      console.error('Error fetching cart products:', error);
      toast.error("Error fetching cart products")
    }
  };

  const handleQuantityChange = (productId, operation) => {
    console.log(productId, operation)
    try {
      if (operation === 'decrease') {
        dispatch(updateQuantityThunk({ productId, operation: 'decrease' }));
      } else if (operation === 'increase') {
        dispatch(updateQuantityThunk({ productId, operation: 'increase' }));
      }
    } catch (error) {
      toast.error(error || "Error updating quantity")
    }

  };

  const handleRemoveItem = async (e, item) => {
    e.preventDefault();
    try {
      const response = await dispatch(removeProductThunk(item.product._id));
      if (response.payload.success) {
        toast.success("Product removed from cart")
      }
      console.log(response.payload.message);
    } catch (error) {
      toast.error(error || "Error removing product from cart")
      console.error('Error removing product from cart:', error);
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * (discount / 100));
  };

  const calculateGrandTotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = calculateDiscountedPrice(item.product.price, item.product.discount);
      return total + (discountedPrice * (item.quantity || 1));
    }, 0);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }


  if (!cart.length) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center space-y-4">
        <FaShoppingBag className="text-gray-400 text-6xl" />
        <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty</h2>
        <p className="text-gray-500">Add some items to get started!</p>
        <button
          className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          onClick={() => window.history.back()}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-purple-500">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item, index) => {
              const discountedPrice = calculateDiscountedPrice(item.product.price, item.product.discount);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center gap-6"
                >
                  <div className="w-full sm:w-32 h-32 relative">
                    {item.image ? (
                      <img
                        src={`data:image/jpeg;base64,${item.image.toString('base64')}`}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">

                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    {item.product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{item.product.discount}%
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.product.desc}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.product._id, 'decrease')}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <FaMinus className="text-gray-600" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product._id, 'increase')}
                          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <FaPlus className="text-gray-600" />
                        </button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500 line-through">₹{item.product.price}</span>
                        <span className="text-lg font-semibold text-green-600">₹{discountedPrice.toFixed(2)}</span>
                      </div>

                      <button
                        onClick={(e) => handleRemoveItem(e, item)}
                        className="ml-auto text-red-500 hover:text-red-600 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{calculateGrandTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{calculateGrandTotal().toFixed(2)}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">Including GST</p>
              </div>
            </div>
            <button className="w-full mt-6 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2">
              <Link to="/payments"><span>Proceed to Checkout</span></Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;