// routes/dashboard.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get orders per day
router.get('/orders-per-day', async (req, res) => {
  try {
    const ordersData = await Order.aggregate([
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          totalOrders: { $sum: 1 },
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(ordersData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders data', error: error.message });
  }
});


//revenue per week
router.get('/revenue-per-week', async (req, res) => {
    try {
      const revenueData = await Order.aggregate([
        { $unwind: "$selectedFoods" },
        {
          $group: {
            _id: { $week: "$createdAt" },
            totalRevenue: { $sum: { $multiply: ["$selectedFoods.quantity", "$selectedFoods.price"] } },
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      res.json(revenueData);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching revenue data', error: error.message });
    }
  });


  //popular food
  router.get('/popular-foods', async (req, res) => {
    try {
      const popularFoods = await Order.aggregate([
        { $unwind: "$selectedFoods" },
        {
          $group: {
            _id: "$selectedFoods.name",
            count: { $sum: "$selectedFoods.quantity" }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 5 } // Top 5 foods
      ]);
  
      res.json(popularFoods);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching popular foods', error: error.message });
    }
  });


module.exports = router;
