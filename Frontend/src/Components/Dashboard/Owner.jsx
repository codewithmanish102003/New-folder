import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Owner_Profile from '../Owner/Owner_Profile';

const Owner = () => {
  const location = useLocation();
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (location.state && location.state.success) {
      setSuccess(location.state.success);
      const timer = setTimeout(() => {
        setSuccess("");
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [location.state]);
  return (
    <div>
      {success && (
        <div className="bg-purple-100 border border-purple-400 text-purple-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      <Owner_Profile />
    </div>

  )
}

export default Owner
