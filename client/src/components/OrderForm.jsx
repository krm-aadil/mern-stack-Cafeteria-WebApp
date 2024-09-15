import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function OrderForm() {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/food');
        const data = await response.json();
        setFoodItems(data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };
    fetchFoodItems();
  }, []);

  const handleSelectSize = (foodId, size) => {
    setSelectedSize({ ...selectedSize, [foodId]: size });
  };

  const handleSelectQuantity = (foodId, quantity) => {
    setSelectedQuantity({ ...selectedQuantity, [foodId]: quantity });
  };

  const handleAddFood = (foodItem) => {
    const foodSize = selectedSize[foodItem._id] || 'Medium';
    const foodQuantity = selectedQuantity[foodItem._id] || 1;

    setSelectedFoods([...selectedFoods, { ...foodItem, size: foodSize, quantity: foodQuantity }]);
  };

  const handleOrder = () => {
    navigate('/dining-details', { state: { selectedFoods } });
  };

  return (
    <>
      <Link to="/">
        <button className="bg-red-500 text-white px-4 py-2 rounded-md absolute right-0 top-1">
          Logout
        </button>
      </Link>
      <div className="container mx-auto p-4">
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold mt-4">Order Food</h1>
        </header>
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Available Food Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {foodItems.length > 0 ? (
              foodItems.map((foodItem) => (
                <div key={foodItem._id} className="border p-4 rounded-md shadow-md">
                  <img src={`http://localhost:5000${foodItem.image}`} alt={foodItem.name} className="w-full h-32 object-cover mb-4" />
                  <h3 className="text-lg font-semibold">{foodItem.name}</h3>
                  <p className="text-sm text-gray-600">${foodItem.price}</p>
                  <div className="mt-2">
                    <label className="mr-2">Quantity:</label>
                    <select className="border p-2 rounded-md" onChange={(e) => handleSelectQuantity(foodItem._id, e.target.value)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div className="mt-2">
                    <label className="mr-2">Size:</label>
                    <select className="border p-2 rounded-md" onChange={(e) => handleSelectSize(foodItem._id, e.target.value)}>
                      {foodItem.sizes.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => handleAddFood(foodItem)}>
                    Add to Order
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center">No food items available</p>
            )}
          </div>
        </section>

        <div className="text-center my-8">
          <button className="bg-green-500 text-white px-6 py-3 rounded-md" onClick={handleOrder}>
            Proceed to Dining Details
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderForm;
