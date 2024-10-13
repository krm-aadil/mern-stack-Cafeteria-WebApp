import React, { useState, useEffect } from 'react';
import TopBar from './TopBar'; // Import the TopBar component
import { Link } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';

function UserProfile() {
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const [userOrders, setUserOrders] = useState([]); // State to store user's orders
  const [filteredOrders, setFilteredOrders] = useState([]); // State to store filtered orders
  const [statusFilter, setStatusFilter] = useState('Pending'); // Default filter is set to Pending
  const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

  useEffect(() => {
    // Fetch user details and orders when the component is mounted
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        setUserDetails(data.user);
        setUserOrders(data.orders); // Assuming the API returns both user and orders in one call
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserProfile();
  }, [token]);

  useEffect(() => {
    // Filter orders based on the selected status
    setFilteredOrders(userOrders.filter(order => order.status === statusFilter));
  }, [userOrders, statusFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'Paid':
        return 'bg-green-100 text-green-700';
      case 'Completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return '';
    }
  };

  return (
    <>
      {/* Use the TopBar component */}
      <TopBar selectedFoods={[]} /> {/* Pass an empty array for selectedFoods in this context */}

      {/* User Profile and Order Statuses */}
      <div className="container mx-auto p-8">
        {/* User Profile Header */}
        <div className="flex items-center justify-between bg-red-600 text-white p-6 rounded-lg mb-8 shadow-lg">
          <div className="flex items-center">
            <img
              src="https://getillustrations.b-cdn.net//photos/pack/3d-avatar-male_lg.png"
              alt="User Avatar"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <h1 className="text-3xl font-bold">User Profile</h1>
              {userDetails && (
                <>
                  <p>{userDetails.name}</p>
                  <p>{userDetails.email}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Filter Orders */}
        <div className="mb-6">
          <label className="block text-lg font-bold mb-2 text-gray-700">Filter by Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Paid">Paid</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Order Statuses Table */}
        <h2 className="text-2xl font-bold mb-4 text-red-600">Order Statuses</h2>
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Order Number</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Items</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="px-4 py-2">#{order.orderNumber}</td>
                    <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <span className={`px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {order.selectedFoods.map((food, index) => (
                        <p key={index}>{food.name} - {food.quantity} {food.size}</p>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No orders found for "{statusFilter}" status.</p>
        )}
      </div>

      {/* Floating Chatbot Button */}
      <Link to="/chat">
  <button
    className="fixed bottom-8 right-8 bg-red-600 text-white px-6 py-3 rounded-full hover:bg-gray-800 shadow-lg transition-all flex items-center space-x-3"
  >
    <FaComments className="text-xl" />
    <span className="font-semibold">Chatbot</span>
  </button>
</Link>
    </>
  );
}

export default UserProfile;
