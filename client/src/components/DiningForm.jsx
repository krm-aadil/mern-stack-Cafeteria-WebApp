import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const DiningForm = ({ handleSubmit }) => {
  const location = useLocation();
  const { selectedFoods } = location.state || { selectedFoods: [] };  // Default to empty array

  const [diningDate, setDiningDate] = useState('');
  const [diningTime, setDiningTime] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ diningDate, diningTime, additionalNotes, selectedFoods });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="diningDate">
            Dining Date
          </label>
          <input
            type="date"
            id="diningDate"
            value={diningDate}
            onChange={(e) => setDiningDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default DiningForm;
