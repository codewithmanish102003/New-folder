import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "../../app/features/auth/authThunk";
import { User, LogOut, Star, Bell, Box } from "lucide-react";

export default function UserDropdown({ setIsDropdownOpen }) {
    const dropdownRef = useRef(null);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const username = useSelector((state) => state.auth.username);
    const role = useSelector((state) => state.auth.role);
    const dispatch = useDispatch();

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
    };

    return (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg" ref={dropdownRef}>
            <ul className="py-2">
                {!isLoggedIn && (
                    <div className="w-full flex px-4 py-2">
                        <div className="w-1/2 flex justify-center items-center hover:bg-purple-500 rounded">
                            <Link to="/login">Login</Link>
                        </div>
                        <div className="w-1/2 flex justify-center items-center hover:bg-purple-500 rounded">
                            <Link to="/register">SignUp</Link>
                        </div>
                    </div>
                )}
                {isLoggedIn && role === "owner" && (
                    <Link to="/owner" className="w-full">
                        <DropdownItem icon={<User />} text="Profile" />
                    </Link>
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
        <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-purple-500 cursor-pointer">
            {icon && <span className="w-5 h-5 mr-3">{icon}</span>}
            {text}
        </li>
    );
}