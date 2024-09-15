import React, { useEffect, useState } from 'react';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="border p-4 mb-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
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
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders placed yet.</p>
      )}
    </div>
  );
};

export default UserOrders;
