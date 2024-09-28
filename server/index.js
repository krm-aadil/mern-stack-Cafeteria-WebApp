const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const cron = require('node-cron'); // Import node-cron for scheduled jobs
const fs = require('fs');
const Order = require('./models/Order'); // Import Order model
const authRoutes = require('./routes/auth'); // Import auth routes
const foodRoutes = require('./routes/food'); // Import food routes for handling food items
const orderRoutes = require('./routes/order'); // Add this line

const dashboardRoutes = require('./routes/dashboard'); //dashboard

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//dashboard routes
app.use('/api/dashboard', dashboardRoutes);

// Routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/food', foodRoutes); // Food routes (for adding food items)
app.use('/api/orders', orderRoutes); // Order routes

// Serve static files from the 'uploads' directory for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Example: Scheduled report generation every minute for testing
// cron.schedule('* * * * *', async () => {
  // Example: Scheduled daily report generation at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    // Directory for reports
    const reportDir = path.join(__dirname, 'reports');

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir);
    }

    const salesData = await Order.aggregate([
      { $unwind: "$selectedFoods" }, // Unwind selectedFoods to calculate per item
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

    // Generate the file name based on the current date and time
    const filePath = path.join(reportDir, `daily-sales-${new Date().toISOString().split('T')[0]}-${new Date().getMinutes()}.json`);

    // Write the report to a file
    fs.writeFileSync(filePath, JSON.stringify(salesData, null, 2));

    console.log(`Sales report generated and saved to ${filePath}`);
  } catch (error) {
    console.error('Error generating sales report:', error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
