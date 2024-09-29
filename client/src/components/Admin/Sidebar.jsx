import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  // Function to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen bg-red-600 text-white w-64 flex flex-col justify-between">
      {/* Top Section with Admin Icon */}
      <div>
        <div className="p-6 flex flex-col items-center">
          {/* Admin Icon with White Border */}
          <img 
            src="https://cdn3d.iconscout.com/3d/premium/thumb/admin-3d-icon-download-in-png-blend-fbx-gltf-file-formats--user-profile-dashboard-avatar-pack-people-icons-8772657.png" 
            alt="Admin Icon" 
            className="w-24 h-24 mb-4 rounded-full shadow-lg border-4 border-white"
          />
          <div className="text-2xl font-bold text-center">Admin Panel</div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-10 space-y-4 flex flex-col items-start">
          <Link
            to="/admin"
            className={`px-4 py-2 w-full text-left rounded-lg hover:bg-red-700 ${isActive('/admin') ? 'bg-white text-red-600 font-bold' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/add-food"
            className={`px-4 py-2 w-full text-left rounded-lg hover:bg-red-700 ${isActive('/admin/add-food') ? 'bg-white text-red-600 font-bold' : ''}`}
          >
            Add Food
          </Link>
          <Link
            to="/admin/orders"
            className={`px-4 py-2 w-full text-left rounded-lg hover:bg-red-700 ${isActive('/admin/orders') ? 'bg-white text-red-600 font-bold' : ''}`}
          >
            View Orders
          </Link>
          <Link
            to="/admin/food"
            className={`px-4 py-2 w-full text-left rounded-lg hover:bg-red-700 ${isActive('/admin/food') ? 'bg-white text-red-600 font-bold' : ''}`}
          >
            Manage Food Items
          </Link>
        </nav>
      </div>

      {/* Bottom Section - Sign Out */}
      <div className="mb-6">
        <Link 
          to="/" 
          className="px-4 py-2 w-full text-left bg-black hover:bg-gray-800 text-white flex justify-center items-center rounded-lg"
        >
          <span className="text-lg font-bold">Sign Out</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
