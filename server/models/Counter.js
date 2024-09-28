const mongoose = require('mongoose');

// Define a Counter schema for tracking the order number
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
