const express = require('express');
const Food = require('../models/Food'); // Import Food model
const upload = require('../middleware/upload'); // Multer middleware for file upload
const router = express.Router();

// Add a new food item with image upload
router.post('/add', upload.single('image'), async (req, res) => {
  const { name, price, category, sizes } = req.body;

  try {
    // Debugging: Log incoming request
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    // Save the file path for the uploaded image
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const newFood = new Food({
      name,
      price,
      category,
      sizes: sizes.split(','), // Assuming sizes are sent as a comma-separated string
      image: imagePath, // Save the image path
    });

    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    console.error('Error:', error.message); // Log the error message for debugging
    res.status(500).json({ message: 'Failed to add food item' });
  }
});

// routes/food.js
router.get('/', async (req, res) => {
  try {
    const foodItems = await Food.find(); // Fetch all food items from the database
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch food items' });
  }
});


module.exports = router;
