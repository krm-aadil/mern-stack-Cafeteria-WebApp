const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  sizes: [{ type: String, required: true }],
  image: { type: String, required: true }, // Stores the image file path
  createdAt: { type: Date, default: Date.now },
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
