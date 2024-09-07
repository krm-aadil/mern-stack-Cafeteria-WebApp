import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function OrderForm() {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const navigate = useNavigate();

  const handleOrder = () => {
    // Navigate to the dining details page, passing the selected foods as state
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
      
        <img src="/sample-images/waiter-with-food-tray.jpg" alt="Cafeteria" className="mx-auto w-full h-48 object-cover" />
        <h1 className="text-4xl font-bold mt-4">Company Name</h1>
      </header>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <input type="text" placeholder="Search..." className="border p-2 rounded-md" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Search</button>
        </div>
        <div>
          <label className="mr-2">Filter:</label>
          <select className="border p-2 rounded-md">
            <option>All</option>
            <option>Top Picks</option>
            <option>Recently Added</option>
            <option>Main Meals</option>
            <option>Beverages</option>
          </select>
        </div>
      </div>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">Today's Top Picks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Example Food Card */}
          <div className="border p-4 rounded-md shadow-md">
            <img
              src="sample-images/hoppers.jpg"
              alt="Food Name"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Food Name</h3>
            <p className="text-sm text-gray-600">$Price</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select className="border p-2 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">Size:</label>
              <select className="border p-2 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          <div className="border p-4 rounded-md shadow-md">
            <img
              src="sample-images/hoppers.jpg"
              alt="Food Name"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Food Name</h3>
            <p className="text-sm text-gray-600">$Price</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select className="border p-2 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">Size:</label>
              <select className="border p-2 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          <div className="border p-4 rounded-md shadow-md">
            <img
              src="sample-images/hoppers.jpg"
              alt="Food Name"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Food Name</h3>
            <p className="text-sm text-gray-600">$Price</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select className="border p-2 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">Size:</label>
              <select className="border p-2 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          <div className="border p-4 rounded-md shadow-md">
            <img
              src="sample-images/hoppers.jpg"
              alt="Food Name"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Food Name</h3>
            <p className="text-sm text-gray-600">$Price</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select className="border p-2 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">Size:</label>
              <select className="border p-2 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          {/* Repeat food cards for top picks */}
        </div>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">Recently Added Foods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Example Food Card */}
          <div className="border p-4 rounded-md shadow-md">
          <img
              src="sample-images/kottu.jpg"
              alt="Food Name"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Food Name</h3>
            <p className="text-sm text-gray-600">$Price</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select className="border p-2 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">Size:</label>
              <select className="border p-2 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          <div className="border p-4 rounded-md shadow-md">
          <img
              src="sample-images/kottu.jpg"
              alt="Food Name"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Food Name</h3>
            <p className="text-sm text-gray-600">$Price</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select className="border p-2 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">Size:</label>
              <select className="border p-2 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          <div className="border p-4 rounded-md shadow-md">
          <img
              src="sample-images/kottu.jpg"
              alt="Food Name"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Food Name</h3>
            <p className="text-sm text-gray-600">$Price</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select className="border p-2 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">Size:</label>
              <select className="border p-2 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          <div className="border p-4 rounded-md shadow-md">
          <img
              src="sample-images/kottu.jpg"
              alt="Food Name"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Food Name</h3>
            <p className="text-sm text-gray-600">$Price</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select className="border p-2 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">Size:</label>
              <select className="border p-2 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          {/* Repeat food cards for recently added foods */}
        </div>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">Main Meals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Example Food Card */}
          <div className="border p-4 rounded-md shadow-md">
          <img
              src="sample-images/rice.jpg"
              alt="Food Name"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Food Name</h3>
            <p className="text-sm text-gray-600">$Price</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select className="border p-2 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">Size:</label>
              <select className="border p-2 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          <div className="border p-4 rounded-md shadow-md">
          <img
              src="sample-images/rice.jpg"
              alt="Food Name"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Food Name</h3>
            <p className="text-sm text-gray-600">$Price</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select className="border p-2 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">Size:</label>
              <select className="border p-2 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          <div className="border p-4 rounded-md shadow-md">
          <img
              src="sample-images/rice.jpg"
              alt="Food Name"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Food Name</h3>
            <p className="text-sm text-gray-600">$Price</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select className="border p-2 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">Size:</label>
              <select className="border p-2 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          <div className="border p-4 rounded-md shadow-md">
          <img
              src="sample-images/rice.jpg"
              alt="Food Name"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Food Name</h3>
            <p className="text-sm text-gray-600">$Price</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select className="border p-2 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">Size:</label>
              <select className="border p-2 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          {/* Repeat food cards for main meals */}
        </div>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">Beverages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Example Food Card */}
          <div className="border p-4 rounded-md shadow-md">
          <img
              src="sample-images/milkshake.jpg"
              alt="Food Name"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Beverage Name</h3>
            <p className="text-sm text-gray-600">$Price</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select className="border p-2 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">Size:</label>
              <select className="border p-2 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          <div className="border p-4 rounded-md shadow-md">
          <img
              src="sample-images/milkshake.jpg"
              alt="Food Name"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Beverage Name</h3>
            <p className="text-sm text-gray-600">$Price</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select className="border p-2 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">Size:</label>
              <select className="border p-2 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          <div className="border p-4 rounded-md shadow-md">
          <img
              src="sample-images/milkshake.jpg"
              alt="Food Name"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Beverage Name</h3>
            <p className="text-sm text-gray-600">$Price</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select className="border p-2 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">Size:</label>
              <select className="border p-2 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          <div className="border p-4 rounded-md shadow-md">
          <img
              src="sample-images/milkshake.jpg"
              alt="Food Name"
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">Beverage Name</h3>
            <p className="text-sm text-gray-600">$Price</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select className="border p-2 rounded-md">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">Size:</label>
              <select className="border p-2 rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
          {/* Repeat food cards for beverages */}
        </div>
      </section>

      <div className="text-center my-8">
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-md"
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
