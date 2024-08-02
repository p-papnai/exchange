// fetchData.js

const axios = require('axios');
const fs = require('fs').promises;
require('dotenv').config();


async function fetchData() {
  try {

     const apiKey = process.env.KEY; // Get the API key from environment variables

  if (!apiKey) {
    console.error('API_KEY is not defined in the environment variables');
    return;
  }

    
    const response = await axios.get("https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR");
    const data = response.data;
    
    // Save data to a local file (or database, as per your requirement)
    await fs.writeFile('/tmp/currencyData.json', JSON.stringify(data, null, 2));
    
    console.log('Data fetched and saved successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

module.exports = fetchData;
