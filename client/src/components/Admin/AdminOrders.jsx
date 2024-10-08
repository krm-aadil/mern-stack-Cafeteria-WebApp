import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders when the component is mounted
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/admin/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the admin token here
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Failed to fetch orders.');
      }
    };

    fetchOrders();
  }, []);

  // Handle status update for an order
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the admin token here
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update the local state to reflect the status change
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order))
        );
        alert('Order status updated successfully');
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('An error occurred while updating the status');
    }
  };

  return (
    <div className="min-h-screen flex bg-red-50">
      <Sidebar /> {/* Sidebar Component */}
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Admin - Manage Orders</h1>

        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow-lg rounded-md">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Order Number</th>
                  <th className="px-6 py-4 text-left">Customer</th>
                  <th className="px-6 py-4 text-left">Items</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t">
                    {/* Display the generated order number */}
                    <td className="px-6 py-4">#{order.orderNumber}</td>
                    <td className="px-6 py-4">{order.user.name}</td>
                    <td className="px-6 py-4">
                      {order.selectedFoods.map((food, index) => (
                        <p key={index} className="text-sm">
                          {food.name} - {food.quantity} {food.size}
                        </p>
                      ))}
                    </td>
                    <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="border p-2 rounded-md w-full"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Paid">Paid</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
                        onClick={() => handleStatusChange(order._id, order.status)}
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center mt-6 text-red-600">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
