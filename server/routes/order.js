const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Middleware for authentication
const adminAuth = require('../middleware/adminAuth'); // Middleware to check if the user is an admin
const Order = require('../models/Order'); // Order model

// Place a new order
router.post('/place', authMiddleware, async (req, res) => {
  try {
    const { diningDate, diningTime, additionalNotes, selectedFoods } = req.body;
    const userId = req.user.userId; // Changed to req.user.userId

    // Log the received data to help identify what's missing
    console.log('Received data:', { userId, diningDate, diningTime, additionalNotes, selectedFoods });

    // Validate required fields
    if (!userId) {
      return res.status(400).json({ message: 'Missing user ID' });
    }
    if (!diningDate) {
      return res.status(400).json({ message: 'Missing dining date' });
    }
    if (!diningTime) {
      return res.status(400).json({ message: 'Missing dining time' });
    }
    if (!selectedFoods || selectedFoods.length === 0) {
      return res.status(400).json({ message: 'Missing selected foods' });
    }

    // Create the new order
    const newOrder = new Order({
      user: userId, // Use the userId from the decoded token
      selectedFoods,
      diningDate,
      diningTime,
      additionalNotes,
    });

    // Save the new order to the database
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
});


// Fetch all orders (Admin access only)
router.get('/admin/orders', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// Update order status (Admin access only)
router.put('/admin/orders/:orderId/status', adminAuth, async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    // Update the status of the order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
});


// Route to get daily sales report
router.get('/sales/daily', adminAuth, async (req, res) => {
  try {
    const salesData = await Order.aggregate([
      { $unwind: "$selectedFoods" }, // Unwind the selectedFoods array to calculate per item
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },
          totalSales: { $sum: { $multiply: ["$selectedFoods.quantity", "$selectedFoods.price"] } },
          orderCount: { $sum: 1 },
        }
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 }
      }
    ]);

    res.status(200).json(salesData);
  } catch (error) {
    console.error('Error generating daily sales report:', error);
    res.status(500).json({ message: 'Error generating daily sales report' });
  }
});

module.exports = router;
