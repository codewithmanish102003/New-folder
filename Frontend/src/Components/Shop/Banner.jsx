import { ShoppingBag, Glasses, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-[700px] md:h-[600px]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Banner Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-center md:justify-between pb-16 md:pb-0">
        <div className="text-white max-w-2xl text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Discover Your Perfect Style
          </h1>
          <p className="text-lg md:text-xl mb-6 md:mb-8">
            Explore our curated collection of premium bags, designer glasses, and seasonal essentials.
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center md:justify-start">
            <button className="bg-white text-purple-600 px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all">
              Shop Now
            </button>
            <button className="border-2 border-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all">
              <Link to="/products">
              View Collections
              </Link>
            </button>
          </div>
        </div>
        {/* <div className='ml-20 mt-0'>
            <img src="\529a37a2-4db1-4213-afb8-d18294c695e9.png" alt="" />
          </div> */}
      </div>

      {/* Features Section */}
      <div className="absolute w-full bottom-0 left-0 right-0 bg-white py-6 md:py-8 ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-4">
              <ShoppingBag className="w-6 md:w-8 h-6 md:h-8 text-purple-600" />
              <div>
                <h3 className="font-semibold text-sm md:text-base">Premium Bags</h3>
                <p className="text-gray-600 text-xs md:text-sm">Handcrafted with care</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Glasses className="w-6 md:w-8 h-6 md:h-8 text-purple-600" />
              <div>
                <h3 className="font-semibold text-sm md:text-base">Designer Glasses</h3>
                <p className="text-gray-600 text-xs md:text-sm">Stylish & comfortable</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Sun className="w-6 md:w-8 h-6 md:h-8 text-purple-600" />
              <div>
                <h3 className="font-semibold text-sm md:text-base">Seasonal Collection</h3>
                <p className="text-gray-600 text-xs md:text-sm">Updated regularly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;