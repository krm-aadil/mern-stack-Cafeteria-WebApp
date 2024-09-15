const express = require('express');
const Order = require('../models/Order'); // Order model
const auth = require('../middleware/auth'); // Authentication middleware
const router = express.Router();

// Place an order
router.post('/place', auth, async (req, res) => {
  const { diningDate, diningTime, additionalNotes, selectedFoods } = req.body;

  if (!diningDate || !diningTime || !selectedFoods || selectedFoods.some(food => !food.size)) {
    return res.status(400).json({ message: 'Please fill out all required fields, including size.' });
  }

  try {
    const newOrder = new Order({
      user: req.user.userId, // Use the authenticated user's ID
      diningDate,
      diningTime,
      additionalNotes,
      selectedFoods,
      status: 'Pending',
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

module.exports = router;
