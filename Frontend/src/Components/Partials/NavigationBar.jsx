import { ChevronDown, HomeIcon, List, LogOut, LucideLogIn, Menu, Search, ShoppingBag, ShoppingCart, User, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutThunk } from "../../app/features/auth/authThunk";
import UserDropdown from "./UserDropdown";

const categories = [
  { name: "Men", path: "/products?cat=men" },
  { name: "Women", path: "/products?cat=women" },
  { name: "Kids", path: "/products?cat=kids" },
  { name: "Accessories", path: "/products?cat=accessories" },
];

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const catDropdownRef = useRef(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const firstname = useSelector((state) => state.auth.firstname);
  const role = useSelector((state) => state.auth.role);
  const cart = useSelector((state) => state.cart.cart) || [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Hamburger menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // User dropdown
  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);

  // Categories dropdown
  const handleCatMouseEnter = () => setIsCatDropdownOpen(true);
  const handleCatMouseLeave = () => setIsCatDropdownOpen(false);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (catDropdownRef.current && !catDropdownRef.current.contains(event.target)) {
        setIsCatDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutThunk());
    toast.success("Logout successful");
    navigate("/");
  };

  // Helper for active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-purple-700">💫wayCollections</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-6 flex-1 ml-8">
            <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isActive("/") ? "text-purple-600 font-bold" : "text-gray-700 hover:text-purple-600"}`}> <HomeIcon className="h-4 w-4" /> Home </Link>
            <Link to="/products" className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${isActive("/products") ? "text-purple-600 font-bold" : "text-gray-700 hover:text-purple-600"}`}> <ShoppingBag className="h-4 w-4" /> Products </Link>
            {/* Categories Dropdown */}
            <div className="relative" onMouseEnter={handleCatMouseEnter} onMouseLeave={handleCatMouseLeave} ref={catDropdownRef}>
              <button className={`flex items-center px-3 py-2 rounded-md text-sm font-medium gap-2 ${isCatDropdownOpen ? "text-purple-600 font-bold" : "text-gray-700 hover:text-purple-600"}`}> <List className="h-4 w-4" /> Categories <ChevronDown className="w-4 h-4" /> </button>
              {isCatDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                  {categories.map((cat) => (
                    <Link key={cat.name} to={cat.path} className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700">{cat.name}</Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/about" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/about") ? "text-purple-600 font-bold" : "text-gray-700 hover:text-purple-600"}`}>About</Link>
            <Link to="/contact-us" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive("/contact-us") ? "text-purple-600 font-bold" : "text-gray-700 hover:text-purple-600"}`}>Contact</Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-purple-500" />
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              />
            </div>
          </div>

          {/* Cart & User */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative group">
              <ShoppingCart className="h-5 w-5 text-gray-700 group-hover:text-purple-600" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full px-1.5 py-0.5">{cart.length}</span>
              )}
            </Link>
            {/* User/Profile Dropdown */}
            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={dropdownRef}>
              <button className="flex items-center font-medium bg-white border rounded-lg shadow-sm hover:text-purple-600 px-3 py-2 cursor-pointer">
                <User className="h-5 w-5 mr-2 text-purple-500" />
                {isLoggedIn ? firstname : "Account"}
                <ChevronDown className="w-4 h-4 ml-2 text-purple-500" />
              </button>
              {isDropdownOpen && <UserDropdown setIsDropdownOpen={setIsDropdownOpen} />}
            </div>
          </div>

          {/* Hamburger for mobile */}
          <div className="flex md:hidden items-center ml-1">
            <button onClick={toggleMenu} className="p-2 rounded-md text-gray-700 hover:text-purple-600 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="flex flex-col gap-2 p-4">
            <Link to="/" className={`py-2 px-3 rounded ${isActive("/") ? "text-purple-600 font-bold" : "text-gray-700 hover:text-purple-600"}`}>Home</Link>
            <Link to="/products" className={`py-2 px-3 rounded ${isActive("/products") ? "text-purple-600 font-bold" : "text-gray-700 hover:text-purple-600"}`}>Products</Link>
            <div className="relative" onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}>
              <button className="flex items-center py-2 px-3 rounded text-gray-700 hover:text-purple-600 w-full">
                Categories <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {isCatDropdownOpen && (
                <div className="mt-1 ml-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                  {categories.map((cat) => (
                    <Link key={cat.name} to={cat.path} className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700">{cat.name}</Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/about" className={`py-2 px-3 rounded ${isActive("/about") ? "text-purple-600 font-bold" : "text-gray-700 hover:text-purple-600"}`}>About</Link>
            <Link to="/contact-us" className={`py-2 px-3 rounded ${isActive("/contact-us") ? "text-purple-600 font-bold" : "text-gray-700 hover:text-purple-600"}`}>Contact</Link>
            <Link to="/cart" className="flex items-center gap-2 py-2 px-3 rounded text-gray-700 hover:text-purple-600">
              <ShoppingCart className="h-5 w-5" /> Cart {cart.length > 0 && <span className="ml-1 bg-purple-600 text-white text-xs rounded-full px-1.5 py-0.5">{cart.length}</span>}
            </Link>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="flex items-center gap-2 py-2 px-3 rounded text-red-500 hover:text-purple-600">
                <LogOut className="h-5 w-5" /> Logout
              </button>
            ) : (
              <Link to="/login" className="flex items-center gap-2 py-2 px-3 rounded text-gray-700 hover:text-purple-600">
                <LucideLogIn className="h-5 w-5" /> Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;