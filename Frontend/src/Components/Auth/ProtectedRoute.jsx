import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = localStorage.getItem('token');
  console.log(`isAuthenticated: ${isLoggedIn ? 'true' : 'false'}`);
  console.log(`token: ${token}`);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
             <h2 className="text-2xl font-semibold text-gray-600">Your must be loggedIn first..</h2>
             <p className="text-gray-500">Please Login or Signup to get started!</p>
             <div className='flex justify-center items-center gap-4'>
             <Link to="/login"
               className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
             >
               Login
             </Link>
             <Link to="/register"
               className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
             >
               SignUp
             </Link>
             </div>
             
           </div>
    );
  }

  return children;
};

export default ProtectedRoute;