import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser } from 'react-icons/fi'; // Import icons

function OrderForm() {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState({});
  const [showPopup, setShowPopup] = useState(false); // State for popup notification
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

    // Show popup message
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false); // Hide popup after 2 seconds
    }, 2000);
  };

  const handleOrder = () => {
    navigate('/dining-details', { state: { selectedFoods } });
  };

  const handleUserProfile = () => {
    navigate('/profile');
  };

  return (
    <>
      {/* Top bar with logo, name, and logout */}
      <div className="flex items-center justify-between p-4 bg-red-600 text-white">
        <div className="flex items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/028/597/164/original/restaurant-3d-rendering-icon-illustration-free-png.png"
            alt="Cafeteria Logo"
            className="w-12 h-12 mr-4"
          />
          <h1 className="text-3xl font-bold">Cafeteria</h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* User icon with order count */}
          <div className="relative cursor-pointer" onClick={handleUserProfile}>
            <FiUser className="text-xl" />
            {selectedFoods.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                {selectedFoods.length}
              </span>
            )}
          </div>
          {/* Logout button */}
          <Link to="/">
            <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800">
              <FiLogOut className="text-xl" />
              <span>Logout</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Hero section */}
      <div className="bg-black py-12">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between lg:space-x-8">
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold text-red-600 leading-tight mb-4">
              Satisfy Your Cravings 
            </h1>
            <p className="text-lg text-white mb-6">
              Choose from a variety of delicious meals, snacks, and beverages <br /> that are perfect for your busy workday.
            </p>
            <button className="bg-red-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-700 transition-all">
              Order Now
            </button>
          </div>
          <div className="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
            <img
              src="https://static.vecteezy.com/system/resources/previews/036/110/064/original/ai-generated-cute-3d-chef-free-png.png"
              alt="Chef"
              className="w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-full shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed top-16 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md z-50">
          Item added to order!
        </div>
      )}

      <div className="container mx-auto p-4 bg-white ">
        <header className="text-center my-8">
          <h2 className="text-4xl font-bold text-red-600">Order Food</h2>
        </header>
        <section className="my-8">
          <h3 className="text-2xl font-bold mb-4">Available Food Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems.length > 0 ? (
              foodItems.map((foodItem) => (
                <div
                  key={foodItem._id}
                  className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={`http://localhost:5000${foodItem.image}`}
                    alt={foodItem.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{foodItem.name}</h3>
                  <p className="text-gray-600">${foodItem.price}</p>
                  <div className="mt-2">
                    <label className="mr-2 text-gray-700">Quantity:</label>
                    <select
                      className="border p-2 rounded-full"
                      onChange={(e) => handleSelectQuantity(foodItem._id, e.target.value)}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div className="mt-2">
                    <label className="mr-2 text-gray-700">Size:</label>
                    <select
                      className="border p-2 rounded-full"
                      onChange={(e) => handleSelectSize(foodItem._id, e.target.value)}
                    >
                      {foodItem.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="mt-4 bg-black text-white px-4 py-2 rounded-full hover:bg-green-600 transition-all"
                    onClick={() => handleAddFood(foodItem)}
                  >
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
          <button
            className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-all"
            onClick={handleOrder}
          >
            Proceed to Dining Details
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderForm;
