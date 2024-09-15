import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const DiningForm = () => {
  const location = useLocation();
  const { selectedFoods } = location.state || { selectedFoods: [] };
  const [diningDate, setDiningDate] = useState('');
  const [diningTime, setDiningTime] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      diningDate,
      diningTime,
      additionalNotes,
      selectedFoods,
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the token here
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Order placed successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to place order: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="diningDate">
            Dining Date
          </label>
          <input
            type="date"
            id="diningDate"
            value={diningDate}
            onChange={(e) => setDiningDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="diningTime">
            Dining Time
          </label>
          <input
            type="time"
            id="diningTime"
            value={diningTime}
            onChange={(e) => setDiningTime(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="additionalNotes">
            Additional Notes
          </label>
          <textarea
            id="additionalNotes"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Any special requests?"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <h3 className="text-xl font-semibold mb-2">Selected Foods:</h3>
        <ul className="list-disc list-inside mb-4">
          {selectedFoods.map((food, index) => (
            <li key={index} className="text-gray-700">
              {food.name} - {food.quantity} {food.size}
            </li>
          ))}
        </ul>

        <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default DiningForm;
