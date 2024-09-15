const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const router = express.Router();

// Example protected route
router.get('/dashboard', adminAuth, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!' });
});

module.exports = router;
