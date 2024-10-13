// routes/chat.js
const express = require('express');
const { processQuery } = require('../chatbot'); // Import the chatbot logic
const router = express.Router();

// Chatbot endpoint
router.post('/ask', async (req, res) => {
  const { query } = req.body; // Get the user's query from the request
  try {
    const response = await processQuery(query); // Process the query with Hugging Face
    res.json({ answer: response }); // Send the answer back to the frontend
  } catch (error) {
    console.error('Error processing query:', error);
    res.status(500).json({ message: 'Failed to process query' });
  }
});

module.exports = router;
