import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchCartProductsThunk, removeProductThunk, updateQuantityThunk } from "../../app/features/cart/cartThunk";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, status } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartProductsThunk());
  }, [dispatch]);

  const handleQuantityChange = useCallback(
    async (productId, operation) => {
      try {
        await dispatch(updateQuantityThunk({ productId, operation }));
        toast.success("Quantity updated successfully");
      } catch (error) {
        toast.error(error || "Error updating quantity");
      }
    },
    [dispatch]
  );

  const handleRemoveItem = useCallback(
    async (e, item) => {
      e.preventDefault();
      try {
        await dispatch(removeProductThunk(item.product._id));
        toast.success("Product removed from cart");
      } catch (error) {
        toast.error(error || "Error removing product from cart");
      }
    },
    [dispatch]
  );

  const calculateDiscountedPrice = useCallback((price, discount) => {
    return price - price * (discount / 100);
  }, []);

  const calculateGrandTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      const discountedPrice = calculateDiscountedPrice(item.product.price, item.product.discount);
      return total + discountedPrice * (item.quantity || 1);
    }, 0);
  }, [cart, calculateDiscountedPrice]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty</h2>
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
              if (!item.product) {
                console.error(`Cart item at index ${index} is missing the product field:`, item);
                return null; // Skip rendering this item
              }

              return (
                <CartItem
                  key={item.product._id}
                  item={item}
                  index={index}
                  handleQuantityChange={handleQuantityChange}
                  handleRemoveItem={handleRemoveItem}
                  calculateDiscountedPrice={calculateDiscountedPrice}
                />
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
            <button
              className="w-full mt-6 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors"
              onClick={() =>
                navigate("/payments", {
                  state: {
                    cartTotal: calculateGrandTotal(),
                    cartItems: cart, // optional: send cart items too
                  },
                })
              }
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;