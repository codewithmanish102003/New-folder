import { motion } from "framer-motion";
import React from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

const CartItem = React.memo(({ item, index,handleQuantityChange, handleRemoveItem, calculateDiscountedPrice }) => {
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
            src={`data:image/jpeg;base64,${item.image.toString("base64")}`}
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
              onClick={() => handleQuantityChange(item.product._id, "decrease")}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <FaMinus className="text-gray-600" />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.product._id, "increase")}
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
});

export default CartItem;