import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByIdThunk } from '../../app/features/product/productThunk';
import { addToCartThunk } from "../../app/features/cart/cartThunk"

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => ({
    product: state.products.product,
    status: state.products.status,
    error: state.products.error,
  }));
  const { isLoggedIn } = useSelector((state) => state.auth); // Assuming you have an auth slice for login status
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  // const relatedProducts = useSelector((state) => state.products.products); // Assuming related products are fetched elsewhere

  useEffect(() => {
    dispatch(fetchProductByIdThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setErr("");
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [success, error,err]);

  const handleAddToCart = async (e) => {
      e.preventDefault();
      setSuccess("");
      setErr("");
      if (!isLoggedIn) {
        setErr("You must be logged in");
      }else{
      try {
        const response=await dispatch(addToCartThunk(product));
        console.log(response)
        if (response.payload.message) {
        setSuccess(response.payload.message)
        }else{
          setErr(response.payload.error)
        }
      } catch (err) {
        setErr(err?.message || "Failed to add to cart");
      }
    }
    };

  // Loading, error, and product not found states
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Details Section */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          {product.image ? (
            <img
              src={`data:image/jpeg;base64,${product.image}`}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No Image Available</span>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-purple-600 mb-4">{product.name} || {product.brand}</h1>
          <p className="text-gray-600 text-lg mb-4">
            {product.description}
          </p>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-semibold text-green-600">
              ₹{(product.price - (product.price * product.discount) / 100).toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-gray-500 line-through">₹{product.price}</span>
            )}
          </div>
          <div className='flex items-center gap-3'>
          <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <Link to="/payments" className="ml-4 bg-gray-400 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors">
            Buy Now
          </Link>
          </div>
          
          {success && (
            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
              {success}
            </div>
          )}
          {err && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {err}
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Customer Reviews</h2>
        <div className="space-y-4">
          {/* Placeholder for reviews */}
          <div className="">
            <input type="text" name="" id="" placeholder="write your review...." className='w-full p-4 border rounded-lg shadow-md' />

            {product.reviews ? (product.reviews.map((review) => (
              <div key={review._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="text-gray-800 font-semibold">{review.name}</p>
                <p className="text-yellow-500">{Array(review.rating).fill('⭐')}</p>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))) : (
              <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         No Related Products
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;