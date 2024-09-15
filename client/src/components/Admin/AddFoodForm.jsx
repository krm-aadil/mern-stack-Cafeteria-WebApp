import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddFoodForm() {
  const [foodData, setFoodData] = useState({
    name: '',
    price: '',
    category: '',
    sizes: [],
  });
  const [imageFile, setImageFile] = useState(null); // State to store the image file
  const [sizesInput, setSizesInput] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFoodData({
      ...foodData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSizesChange = (e) => {
    setSizesInput(e.target.value);
  };

  const handleAddSize = () => {
    if (sizesInput) {
      setFoodData({
        ...foodData,
        sizes: [...foodData.sizes, sizesInput],
      });
      setSizesInput(''); // Reset size input
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data for file upload
    const formData = new FormData();
    formData.append('name', foodData.name);
    formData.append('price', foodData.price);
    formData.append('category', foodData.category);
    formData.append('sizes', foodData.sizes.join(',')); // Convert sizes array to a comma-separated string
    formData.append('image', imageFile); // Append the image file

    try {
      const response = await fetch('http://localhost:5000/api/food/add', {
        method: 'POST',
        body: formData, // Send form data
      });

      if (response.ok) {
        alert('Food item added successfully!');
        navigate('/admin'); // Redirect to Admin Dashboard
      } else {
        alert('Failed to add food item');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the food item');
    }
  };

  return (
    <div className="flex">
      <div className="w-64">
        {/* Sidebar can be added here */}
      </div>
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Add New Food Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium text-gray-700">Food Name</label>
            <input
              type="text"
              name="name"
              value={foodData.name}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={foodData.price}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={foodData.category}
              onChange={handleChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Category</option>
              <option value="Main Meals">Main Meals</option>
              <option value="Beverages">Beverages</option>
              <option value="Snacks">Snacks</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sizes</label>
            <div className="flex space-x-2 mt-1">
              <input
                type="text"
                value={sizesInput}
                onChange={handleSizesChange}
                placeholder="e.g., Small"
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={handleAddSize}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
            </div>
            {foodData.sizes.length > 0 && (
              <ul className="mt-2 space-y-1">
                {foodData.sizes.map((size, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {size}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-green-500 text-white font-semibold py-2 rounded-md"
          >
            Add Food Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFoodForm;
