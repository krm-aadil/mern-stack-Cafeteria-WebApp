import React, { useEffect, useState } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/admin', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/admin/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(orders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order)));
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="border p-4 mb-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
              <p>User: {order.user.name} ({order.user.email})</p>
              <p>Status: {order.status}</p>
              <p>Dining Date: {new Date(order.diningDate).toLocaleDateString()}</p>
              <p>Dining Time: {order.diningTime}</p>
              <p>Additional Notes: {order.additionalNotes}</p>
              <h4 className="font-semibold">Foods:</h4>
              <ul className="list-disc list-inside">
                {order.selectedFoods.map((food, index) => (
                  <li key={index}>
                    {food.name} - {food.quantity} {food.size}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <select
                  value={order.status}
                  onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                  className="border p-2 rounded-md"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Paid">Paid</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default AdminOrders;
