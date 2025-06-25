import { Bell, Box, LogOut, Star, User } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutThunk } from "../../app/features/auth/authThunk";

export default function UserDropdown({ setIsDropdownOpen }) {
    const dropdownRef = useRef(null);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsDropdownOpen]);

    const handleLogout = () => {
        dispatch(logoutThunk());
        toast.success("Logout successful");
        navigate("/");
    };

    
    return (
        <div className="absolute right-0 mt-2 w-50 bg-white border rounded-lg shadow-lg" ref={dropdownRef}>
            <ul className="p-0 m-0">
                {!isLoggedIn && (
                    <div className="w-full flex px-4 py-2">
                        <div className="w-1/2 flex justify-center items-center hover:border-t-2 rounded">
                            <Link to="/login">Login</Link>
                        </div>
                        <div className="w-1/2 flex justify-center items-center hover:border-t-2 rounded">
                            <Link to="/register">SignUp</Link>
                        </div>
                    </div>
                )}
                {isLoggedIn && role === "user" && (
                    <>
                    <Link to="/profile">
                        <DropdownItem icon={<User />} text="Profile" />
                    </Link>
                    <Link to="/orders">
                    <DropdownItem icon={<Box />} text="Orders" />
                    </Link>
                    </>
                )}
                <DropdownItem icon={<Star className="text-yellow-500" />} text="SuperCoin Zone" />              
                <DropdownItem icon={<Bell />} text="Notifications" />
                {isLoggedIn && (
                    <button onClick={handleLogout} type="button" className="w-full">
                        <DropdownItem icon={<LogOut className="text-red-500" />} text="Logout" />
                    </button>
                )}
            </ul>
        </div>
    );
}

// Reusable Dropdown Item Component
function DropdownItem({ icon, text }) {
    return (
        <li className="flex items-center px-4 py-2 text-gray-700 hover:border-t-2 hover:border-b-2 cursor-pointer">
            {icon && <span className="w-5 h-5 mr-3">{icon}</span>}
            {text}
        </li>
    );
}