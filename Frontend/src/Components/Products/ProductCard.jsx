import { Star, StarHalf } from "lucide-react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToCartThunk } from "../../app/features/cart/cartThunk"
import { useSelector } from "react-redux"
import {toast} from "react-toastify"

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}

const ProductCard = ({ product }) => {

  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error("You must be logged in");
    }else{
    try {
      await dispatch(addToCartThunk(product));
      toast.success("Product added to cart successfully");
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  }
  };
  const discount = (product.discount / 100) * product.price
  const discountedPrice = product.price - discount

  return (
    <>
    <div className="flex flex-col sm:flex-row w-full max-w- rounded-lg overflow-hidden border border-gray-200 shadow-md bg-white">
      {/* Image container - full width on mobile, 1/4 on tablet+ */}
      <div className="w-full sm:w-1/3 md:w-1/4 relative border-b sm:border-b-0 sm:border-r border-gray-200 flex items-center justify-center p-4">
        {product.image ? (
          <img
            src={`data:image/jpeg;base64,${product.image}`}
            alt={product.name}
            className="w-full max-h-60 lg:max-h-40 sm:max-h-full object-contain"
          />
        ) : (
          <div className="w-full aspect-square max-h-48 sm:max-h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
            No Image Available
          </div>
        )}
      </div>

      {/* Content container */}
      <div className="flex flex-col w-full sm:w-2/3 md:w-3/4 p-4">
        <div className="flex-grow">
          {/* Product name */}
          <h3 className="font-bold text-lg mb-2">{product.name}</h3>

          {/* Price information */}
          <p className="text-base mb-3">
            {product.discount > 0 ? (
              <span className="flex flex-wrap items-center gap-2">
                <span className="line-through text-gray-500">{formatCurrency(product.price)}</span>
                <span className="font-bold text-primary">{formatCurrency(discountedPrice)}</span>
                <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">{product.discount}% OFF</span>
              </span>
            ) : (
              <span className="font-bold">{formatCurrency(product.price)}</span>
            )}
          </p>
          {/* Ratings */}
          <div className="flex items-center gap-1 mb-4">
            <strong className="text-sm mr-1">Ratings:</strong>
            <Star size={16} className="text-yellow-500" />
            <Star size={16} className="text-yellow-500" />
            <Star size={16} className="text-yellow-500" />
            <StarHalf size={16} className="text-yellow-500" />
          </div>
        </div>

        {/* Add to cart button */}
        <div className="mt-auto flex gap-4 ">
          <button
            className="w-full sm:w-auto bg-purple-500  text-white font-bold px-6 py-3  hover:bg-purple-600 transition-colors rounded "
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
          <Link to={`/products/${product._id}`}
            className="w-full sm:w-auto bg-purple-500  text-white font-bold px-6 py-3  hover:bg-purple-600 transition-colors rounded "
          >
           See Details
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductCard

