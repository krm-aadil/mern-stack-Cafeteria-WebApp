import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="h-screen bg-gray-800 text-white w-64 flex flex-col">
      <div className="p-6 text-2xl font-bold text-center">Admin Panel</div>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link to="/admin" className="px-4 py-2 hover:bg-gray-700">
          Dashboard
        </Link>
        <Link to="/admin/add-food" className="px-4 py-2 hover:bg-gray-700">
          Add Food
        </Link>
        <Link to="/admin/orders" className="px-4 py-2 hover:bg-gray-700">
          View Orders
        </Link>
        <Link to="/" className="px-4 py-2 hover:bg-gray-700">
          Logout
        </Link>
        <Link to={"/admin/food"} className="px-4 py-2 hover:bg-gray-700">
          Manage Food Items
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
