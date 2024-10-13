// routes/dashboard.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Food = require('../models/Food');

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

// Get total orders per day
router.get('/total-orders-per-day', async (req, res) => {
  try {
    const ordersData = await Order.aggregate([
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" }, // Group by day of the month
          totalOrders: { $sum: 1 }, // Count the number of orders per day
        }
      },
      { $sort: { _id: 1 } } // Sort by day in ascending order
    ]);

    res.json(ordersData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders data', error: error.message });
  }
});

// Get revenue per week
router.get('/revenue-per-week', async (req, res) => {
  try {
    const revenueData = await Order.aggregate([
      { $unwind: "$selectedFoods" }, // Unwind selectedFoods to get individual food items
      {
        $group: {
          _id: { $week: "$createdAt" }, // Group by week
          totalRevenue: { $sum: { $multiply: ["$selectedFoods.quantity", "$selectedFoods.price"] } } // Calculate total revenue
        }
      },
      { $sort: { _id: 1 } } // Sort by week in ascending order
    ]);

    res.json(revenueData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching revenue data', error: error.message });
  }
});

router.get('/popular-foods', async (req, res) => {
  try {
    const popularFoods = await Order.aggregate([
      { $unwind: "$selectedFoods" },
      {
        $group: {
          _id: "$selectedFoods.name",  // Group by food name
          count: { $sum: "$selectedFoods.quantity" }, // Sum quantity ordered
        }
      },
      { $sort: { count: -1 } }, // Sort by quantity in descending order
      { $limit: 5 } // Limit to top 5 items
    ]);

    // Retrieve image data from the Food model
    const popularFoodsWithImages = await Promise.all(
      popularFoods.map(async (food) => {
        const foodDetails = await Food.findOne({ name: food._id });
        if (foodDetails) {
          return { ...food, image: foodDetails.image }; // Add image from the Food model
        }
        return { ...food, image: '' }; // Fallback if no image is found
      })
    );

    res.json(popularFoodsWithImages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching popular foods', error: error.message });
  }
});



// Get order status distribution
router.get('/order-status-distribution', async (req, res) => {
  try {
    const statusData = await Order.aggregate([
      {
        $group: {
          _id: "$status", // Group by order status
          count: { $sum: 1 } // Count the number of orders for each status
        }
      },
      { $sort: { count: -1 } } // Sort by count in descending order
    ]);

    res.json(statusData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order status distribution', error: error.message });
  }
});



// Get top customers by spending
router.get('/top-customers', async (req, res) => {
  try {
    const topCustomers = await Order.aggregate([
      { $unwind: "$selectedFoods" }, // Unwind selectedFoods to get individual food items
      {
        $group: {
          _id: "$user", // Group by user
          totalSpent: { $sum: { $multiply: ["$selectedFoods.quantity", "$selectedFoods.price"] } } // Calculate total spending per user
        }
      },
      { $sort: { totalSpent: -1 } }, // Sort by spending in descending order
      { $limit: 5 } // Limit to top 5 customers
    ]);

    res.json(topCustomers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top customers', error: error.message });
  }
});


// Get average order value
router.get('/average-order-value', async (req, res) => {
  try {
    const avgOrderValueData = await Order.aggregate([
      { $unwind: "$selectedFoods" }, // Unwind selectedFoods to get individual food items
      {
        $group: {
          _id: "$_id", // Group by each order to calculate per-order total
          orderValue: { $sum: { $multiply: ["$selectedFoods.quantity", "$selectedFoods.price"] } } // Calculate total order value
        }
      },
      {
        $group: {
          _id: null, // Group all orders together to calculate the average
          averageOrderValue: { $avg: "$orderValue" } // Calculate average order value
        }
      }
    ]);

    res.json(avgOrderValueData.length > 0 ? avgOrderValueData[0] : { averageOrderValue: 0 });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching average order value', error: error.message });
  }
});


// Get customer order frequency
router.get('/customer-order-frequency', async (req, res) => {
  try {
    const customerFrequencyData = await Order.aggregate([
      {
        $group: {
          _id: "$user", // Group by user
          orderCount: { $sum: 1 } // Count the number of orders placed by each customer
        }
      },
      { $sort: { orderCount: -1 } }, // Sort by order count in descending order
      { $limit: 10 } // Limit to top 10 frequent customers (adjust as necessary)
    ]);

    res.json(customerFrequencyData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer order frequency', error: error.message });
  }
});


// Get peak order time (hour of day)
router.get('/peak-order-time', async (req, res) => {
  try {
    const peakTimeData = await Order.aggregate([
      {
        $group: {
          _id: { $hour: "$createdAt" }, // Group by the hour of the day (0-23)
          orderCount: { $sum: 1 } // Count the number of orders placed in each hour
        }
      },
      { $sort: { orderCount: -1 } }, // Sort by order count in descending order
      { $limit: 1 } // Get the hour with the most orders
    ]);

    res.json(peakTimeData.length > 0 ? peakTimeData[0] : { _id: null, orderCount: 0 });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching peak order time', error: error.message });
  }
});


// Get most popular day (day with the most orders)
router.get('/most-popular-food', async (req, res) => {
  try {
    const popularFood = await Order.aggregate([
      { $unwind: "$selectedFoods" }, // Unwind selectedFoods to get individual food items
      {
        $group: {
          _id: "$selectedFoods.name", // Group by food name
          count: { $sum: "$selectedFoods.quantity" } // Sum the quantity ordered
        }
      },
      { $sort: { count: -1 } }, // Sort by quantity in descending order
      { $limit: 1 } // Limit to the most popular item
    ]);

    if (popularFood.length > 0) {
      const foodDetails = await require('../models/Food').findOne({ name: popularFood[0]._id }); // Get the food details including the image
      res.json({ ...foodDetails.toJSON(), count: popularFood[0].count });
    } else {
      res.json({});
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching most popular food', error: error.message });
  }
});


// Get least sold food item
router.get('/least-sold-food', async (req, res) => {
  try {
    const leastSoldFood = await Order.aggregate([
      { $unwind: "$selectedFoods" }, // Unwind selectedFoods to get individual food items
      {
        $group: {
          _id: "$selectedFoods.name", // Group by food name
          count: { $sum: "$selectedFoods.quantity" } // Sum the quantity ordered
        }
      },
      { $sort: { count: 1 } }, // Sort by quantity in ascending order
      { $limit: 1 } // Limit to the least sold item
    ]);

    if (leastSoldFood.length > 0) {
      const foodDetails = await Food.findOne({ name: leastSoldFood[0]._id }); // Fetch food details including image
      res.json({ ...foodDetails.toJSON(), count: leastSoldFood[0].count });
    } else {
      res.json({ message: "No least sold food found" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching least sold food', error: error.message });
  }
});


// Get user count
router.get('/users/count', async (req, res) => {
  try {
    const userCount = await User.countDocuments(); // Fetch total user count
    res.json({ count: userCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user count', error: error.message });
  }
});


// Get most popular food item
router.get('/most-popular-food', async (req, res) => {
  try {
    const popularFood = await Order.aggregate([
      { $unwind: "$selectedFoods" }, // Unwind selectedFoods to get individual food items
      {
        $group: {
          _id: "$selectedFoods.name", // Group by food name
          count: { $sum: "$selectedFoods.quantity" } // Sum the quantity ordered
        }
      },
      { $sort: { count: -1 } }, // Sort by quantity in descending order
      { $limit: 1 } // Limit to the most popular item
    ]);

    if (popularFood.length > 0) {
      const foodDetails = await Food.findOne({ name: popularFood[0]._id }); // Fetch food details including image
      res.json({ ...foodDetails.toJSON(), count: popularFood[0].count });
    } else {
      res.json({ message: "No popular food found" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching most popular food', error: error.message });
  }
});

module.exports = router;
