const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  selectedFoods: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      size: { type: String, required: true },
    },
  ],
  diningDate: { type: String, required: true },
  diningTime: { type: String, required: true },
  additionalNotes: { type: String },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  orderNumber: { type: String, unique: true },
});

// Pre-save middleware to generate a unique order number
orderSchema.pre('save', async function (next) {
  const order = this;

  if (!order.isNew) {
    return next();
  }

  try {
    // Generate a unique order number based on the current timestamp and a random number
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number
    order.orderNumber = `${timestamp}${randomNum}`; // Create unique orderNumber

    next();
  } catch (err) {
    console.error('Error generating order number:', err);
    next(err); // Pass the error to the next middleware
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
