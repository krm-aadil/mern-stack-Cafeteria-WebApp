const mongoose = require('mongoose');
const Food = require('./models/Food'); // Import your Food model


// Enhanced processQuery function
async function processQuery(query) {
    // Convert query to lowercase for easier matching
    const lowerCaseQuery = query.toLowerCase();
  
    // Check for specific predefined queries
    if (lowerCaseQuery.includes("what's your name") || lowerCaseQuery.includes("your name")) {
      return "My name is Aadil's Corporate Cafeteria Assistant.";
    }
  
    if (lowerCaseQuery.includes("lecturer") || lowerCaseQuery.includes("who is the lecturer")) {
      return "The lecturer is Mr. Sampath Thrimavithan.";
    }
  
    if (lowerCaseQuery.includes("what food is available") || lowerCaseQuery.includes("available food")) {
      // Fetch food items from the database
      const foods = await Food.find({});
      if (foods.length > 0) {
        return foods.map(food => `${food.name} - $${food.price}`).join(', ');
      } else {
        return "No food items available right now.";
      }
    }
  
    if (lowerCaseQuery.includes("best selling food") || lowerCaseQuery.includes("most popular food")) {
      // Assuming we want to show the most expensive (as best-selling example)
      const bestSellingFood = await Food.find({}).sort({ price: -1 }).limit(1);
      if (bestSellingFood.length > 0) {
        return `Our most popular item is ${bestSellingFood[0].name} for $${bestSellingFood[0].price}.`;
      } else {
        return "No best-selling food at the moment.";
      }
    }
  
    // Handle queries about specific food items by name
    const foods = await Food.find({}); // Fetch all food items
    for (let food of foods) {
      // Check if the food name is mentioned in the query
      if (lowerCaseQuery.includes(food.name.toLowerCase())) {
        return `The ${food.name} is a ${food.category} item priced at $${food.price}.`;
      }
    }
  
    // Fallback for queries that don't match
    return "Sorry, I didn't understand that. Can you ask differently?";
  }
  
  module.exports = { processQuery };