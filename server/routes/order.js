const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const adminAuth = require('../middleware/adminAuth'); // Middleware to check if the user is admin

// Get all orders (for admin)
router.get('/admin/orders', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Update order status (for admin)
router.put('/admin/orders/:id/status', adminAuth, async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

module.exports = router;
