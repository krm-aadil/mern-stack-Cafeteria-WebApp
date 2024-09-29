import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Importing icons from React Icons

const AdminFoodList = () => {
  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState(null); // Track the food being edited
  const [editData, setEditData] = useState({ name: '', price: '', category: '', sizes: '', image: null });
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of food items
    const fetchFoods = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/food');
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchFoods();
  }, []);

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditFileChange = (e) => {
    setEditData({ ...editData, image: e.target.files[0] });
  };

  const handleUpdate = async (foodId) => {
    const formData = new FormData();
    formData.append('name', editData.name);
    formData.append('price', editData.price);
    formData.append('category', editData.category);
    formData.append('sizes', editData.sizes); // Comma-separated sizes
    if (editData.image) {
      formData.append('image', editData.image); // Append image only if updated
    }

    try {
      const response = await fetch(`http://localhost:5000/api/food/update/${foodId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        alert('Food updated successfully!');
        setEditingFood(null); // Close edit form
        navigate(0); // Reload page to reflect changes
      } else {
        alert('Failed to update food item');
      }
    } catch (error) {
      console.error('Error updating food item:', error);
      alert('Error updating food item');
    }
  };

  const handleDelete = async (foodId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/food/delete/${foodId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Food item deleted successfully!');
        setFoods(foods.filter((food) => food._id !== foodId));
      } else {
        alert('Failed to delete food item');
      }
    } catch (error) {
      console.error('Error deleting food item:', error);
      alert('Error deleting food item');
    }
  };

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-red-50">
      <Sidebar /> {/* Sidebar Component */}
      
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-red-600 mb-6">Manage Food Items</h2>

        {/* Search bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by food name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Table to display food items */}
        <table className="min-w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-red-600 text-white">
              <th className="px-4 py-4 text-left">Image</th>
              <th className="px-4 py-4 text-left">Name</th>
              <th className="px-4 py-4 text-left">Price</th>
              <th className="px-4 py-4 text-left">Category</th>
              <th className="px-4 py-4 text-left">Sizes</th>
              <th className="px-4 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFoods.map((food) => (
              <tr key={food._id} className="border-b hover:bg-red-100 transition">
                <td className="px-4 py-4">
                  <img
                    src={`http://localhost:5000${food.image}`} // Prepend localhost for image
                    alt={food.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-4">{food.name}</td>
                <td className="px-4 py-4">${food.price}</td>
                <td className="px-4 py-4">{food.category}</td>
                <td className="px-4 py-4">{food.sizes.join(', ')}</td>
                <td className="px-4 py-4 text-right">
                  <button
                    onClick={() => {
                      setEditingFood(food._id);
                      setEditData({ name: food.name, price: food.price, category: food.category, sizes: food.sizes.join(',') });
                    }}
                    className="inline-flex items-center bg-black text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-800 transition"
                  >
                    <FiEdit className="w-5 h-5 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                  >
                    <FiTrash2 className="w-5 h-5 mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit form (shown when editing a food item) */}
        {editingFood && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-red-600">Edit Food Item</h3>
            <div>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                className="block w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Food Name"
              />
              <input
                type="number"
                name="price"
                value={editData.price}
                onChange={handleEditChange}
                className="block w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Price"
              />
              <input
                type="text"
                name="category"
                value={editData.category}
                onChange={handleEditChange}
                className="block w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Category"
              />
              <input
                type="text"
                name="sizes"
                value={editData.sizes}
                onChange={handleEditChange}
                className="block w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Sizes (comma separated)"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleEditFileChange}
                className="block w-full p-3 border border-gray-300 rounded-lg mb-3"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => handleUpdate(editingFood)}
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditingFood(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFoodList;
