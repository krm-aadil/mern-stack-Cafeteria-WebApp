import React from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const TopBar = ({ selectedFoods }) => {
  const navigate = useNavigate();

  const handleUserProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="flex items-center justify-between p-4 bg-red-600 text-white">
      <div className="flex items-center">
        <Link to="/order">
        <img
          src="https://static.vecteezy.com/system/resources/previews/028/597/164/original/restaurant-3d-rendering-icon-illustration-free-png.png"
          alt="Cafeteria Logo"
          className="w-12 h-12 mr-4"
        />
        </Link>
       
        <h1 className="text-3xl font-bold">Cafeteria</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* User icon with order count */}
        <div className="relative cursor-pointer" onClick={handleUserProfile}>
          <FiUser className="text-xl" />
          {selectedFoods?.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
              {selectedFoods.length}
            </span>
          )}
        </div>
        {/* Logout button */}
        <Link to="/">
          <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800">
            <FiLogOut className="text-xl" />
            <span>Logout</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
