import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopBar from './TopBar'; // Import the reusable TopBar component

const DiningForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedFoods: initialSelectedFoods } = location.state || { selectedFoods: [] };
  const [diningDate, setDiningDate] = useState('');
  const [diningTime, setDiningTime] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [selectedFoods, setSelectedFoods] = useState(initialSelectedFoods);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Handle removing a food item from the list
  const handleRemoveFood = (indexToRemove) => {
    const updatedFoods = selectedFoods.filter((_, index) => index !== indexToRemove);
    setSelectedFoods(updatedFoods);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Log the token to ensure it is being retrieved
  
    if (!token) {
      alert('Please log in to place an order.');
      return;
    }
  
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
          Authorization: `Bearer ${token}`, // Make sure the token is included here
        },
        body: JSON.stringify(orderData),
      });
  
      if (response.ok) {
        setOrderSuccess(true);
        setTimeout(() => {
          navigate('/profile');
        }, 3000); // Redirect after 3 seconds
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
    <>
      {/* Use the TopBar component */}
      <TopBar selectedFoods={selectedFoods} />

      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Confirm Your Order</h2>

        {orderSuccess ? (
          <div className="text-green-500 font-semibold text-center">
            Your order has been placed successfully! Redirecting...
          </div>
        ) : (
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
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
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
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
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
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            <h3 className="text-xl font-semibold text-red-600 mb-2">Selected Foods:</h3>
            <ul className="list-disc list-inside mb-4">
              {selectedFoods.length > 0 ? (
                selectedFoods.map((food, index) => (
                  <li key={index} className="text-gray-700 flex justify-between items-center mb-2">
                    <span>
                      {food.name} - {food.quantity} {food.size}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFood(index)}
                      className="text-red-500 font-semibold hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No foods selected.</p>
              )}
            </ul>

            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition-all"
              disabled={selectedFoods.length === 0} // Disable if no foods are selected
            >
              Confirm Order
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default DiningForm;
