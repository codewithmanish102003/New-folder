import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search, ShoppingCart, User, X, ShoppingBag, LucideLogIn, ChevronDown, HomeIcon } from 'lucide-react';
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "../../app/features/auth/authThunk";
import UserDropdown from "./UserDropdown";

const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const firstname = useSelector((state) => state.auth.firstname);
    const role = useSelector((state) => state.auth.role);

    const dispatch = useDispatch();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(logoutThunk());
    };

    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="shadow-lg bg-white justify-around font-['helvetica_now_display'] fixed w-full z-10">
            <div className="max-w-full px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16 gap-4">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <div className="hidden sm:block">
                                <h3 className="text-xl text-purple-700">💫wayCollections</h3>
                            </div>
                           {(role === 'user') && 
                           <div className="sm:hidden">
                           <h3 className="text-xl">💫</h3>
                       </div>} 
                       {(role === 'owner') && 
                           <div className="sm:hidden">
                           <h3 className="text-xl text-purple-700">💫wayCollections</h3>
                       </div>} 
                            
                        </Link>
                    </div>

                    {/* Search Bar */}
                    {
                    role !== 'owner' && (
                            <>
                                <div className="flex-1 max-w-xl hidden sm:block">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-purple-500" />
                                        <input
                                            type="text"
                                            placeholder="Search for Products, Brands and More"
                                            className="pl-8 bg-[#F0F5FF] border-none h-9 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </>
                        )
                    }

                    {/* Mobile menu button */}
                    <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">

                        {role !== 'owner' && (
                            <>
                                <div className="relative pl-8">
                                    <Search className="absolute pl-1 top-2.5 h-4 w-4 text-purple-600" />
                                    <input
                                        type="text"
                                        placeholder="Search for Products, Brands and More"
                                        className="pl-6 bg-[#F0F5FF] border-none h-9 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <Link to="/" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                                    <HomeIcon className="h-4 w-4 text-purple-600" />
                                </Link>
                                <Link to="/profile" className="text-gray-900 hover:text-purple-600  px-3 py-2 rounded-md text-base font-medium flex items-center gap-2">
                                    <User className="h-4 w-4 text-purple-600" />
                                </Link>
                                <Link to="/cart" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                                    <ShoppingCart className="h-4 w-4 text-purple-600 " />
                                </Link>
                            </>
                        )}


                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white cursor-pointer"
                        >
                            {isOpen ? <X className="h-6 w-6 text-purple-600" /> : <Menu className="h-6 w-6 text-purple-600" />}
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex sm:items-center sm:gap-4">
                        {role !== 'owner' && (
                            <>
                                <Link to="/" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                                    <HomeIcon className="h-4 w-4 text-purple-500" />
                                    Home
                                </Link>
                                <Link to="/products" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                                    <ShoppingBag className="h-4 w-4 text-purple-500" />
                                    Product
                                </Link>
                                <Link to="/cart" className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                                    <ShoppingCart className="h-4 w-4 text-purple-500" />
                                    Cart
                                </Link>
                            </>
                        )}
                        <div
                            className="relative"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            ref={dropdownRef}
                        >
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center font-medium bg-white border rounded-lg shadow-sm hover:text-purple-600 px-3 py-2 cursor-pointer"
                            >
                                <User className="h-4 w-4 mr-2 text-purple-500" />
                                {isLoggedIn ? firstname : "Profile"}
                                <ChevronDown className="w-4 h-4 ml-2 text-purple-500" />
                            </button>
                            {isDropdownOpen && <UserDropdown setIsDropdownOpen={setIsDropdownOpen} />}
                        </div>
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="text-red-500 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="text-gray-900 hover:bg-purple-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                                <LucideLogIn className="h-4 w-4" />
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <div className="pb-4">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-purple-500" />
                                <input
                                    type="text"
                                    placeholder="Search for Products, Brands and More"
                                    className="pl-8 bg-[#F0F5FF] border-none h-9 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        {role !== 'owner' && (
                            <>
                                <Link to="/" className="text-gray-900 hover:bg-purple-600 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center gap-2">
                                    <HomeIcon className="h-4 w-4 " />
                                    Home
                                </Link>
                                <Link to="/products" className="text-gray-900 hover:bg-purple-600 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center gap-2">
                                    <ShoppingBag className="h-4 w-4 " />
                                    Product
                                </Link>
                            </>
                        )}
                        <Link to={role === 'owner' ? "/owner" : "/profile"} className="text-gray-900 hover:bg-purple-600 hover:text-white  px-3 py-2 rounded-md text-base font-medium flex items-center gap-2">
                            <User className="h-4 w-4 " />
                            Profile
                        </Link>
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="w-full text-left text-gray-900 hover:bg-purple-600 hover:text-white px-3 py-2 rounded-md text-base font-mediummflex flex items-center gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="text-gray-900 hover:bg-purple-600 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center gap-2">
                                <LucideLogIn className="h-4 w-4" />
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavigationBar;