const express = require('express');
const fetchData = require('./fetchData');
const fs = require('fs').promises;
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3000;

let cachedData = null; // To store the fetched data in memory

// Schedule task to fetch data every day at 5 PM IST
cron.schedule('0 17 * * *', async () => {
  console.log('Running cron job to fetch data...');
  try {
    const data = await fetchData();
    cachedData = data; // Update cached data
    // Optionally, you can save the data to a database or use any other storage mechanism
  } catch (error) {
    console.error('Error in cron job:', error.message);
  }
});

// Endpoint to serve the fetched data
app.get('/currencyData', async (req, res) => {
  try {
    // If cachedData is null (first time or after server restart), fetch fresh data
    if (!cachedData) {
      cachedData = await fetchData();
    }
    res.json(cachedData);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
