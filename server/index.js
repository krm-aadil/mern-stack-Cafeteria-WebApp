const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth'); // Import auth routes
const foodRoutes = require('./routes/food'); // Import food routes for handling food items
const upload = require('./middleware/upload'); // Import Multer config for file upload
const orderRoutes = require('./routes/order'); // Add this line

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

// Routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/food', foodRoutes); // Food routes (for adding food items)
app.use('/api/orders', orderRoutes); // Order routes




// Serve static files from the 'uploads' directory for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
