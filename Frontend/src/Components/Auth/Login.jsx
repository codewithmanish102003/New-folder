import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginThunk } from "../../app/features/auth/authThunk";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const successMessage = location.state?.success;

  useEffect(() => {
    if (success || error || successMessage) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
        location.state = null;
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const response = await dispatch(loginThunk(formData)).unwrap();
      console.log("Login successful:", response);
      console.log("Data submission successful")
      setSuccess(response.message);
      if (response.role === "owner") {
        navigate("/owner", { state: { success: response.message } });
      } else {
        navigate("/", { state: { success: response.message } });
      }
    } catch (error) {
      setError(error || "Login failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Welcome to <span className="text-purple-500">Starway Collections</span>
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 relative overflow-hidden">
          {successMessage && (
            <div className="bg-purple-100 border border-purple-400 text-purple-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          {success && (
            <div className="bg-purple-100 border border-purple-400 text-purple-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{success}</span>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900">Login to your account</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full justify-center rounded-full border border-transparent bg-purple-500 py-2 px-4 text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Login
              </button>
            </form>
            <div className="mt-4 text-center">
              <button className="text-sm text-purple-500 hover:text-purple-600 cursor-pointer">
                Need an account?<Link to="/register" className="hover:underline text-purple-700"> Register</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;