// fetchData.js

const axios = require('axios');
const fs = require('fs').promises;

async function fetchData() {
  try {
    const response = await axios.get("https://v6.exchangerate-api.com/v6/4d9567d4b96a9de02b1b0316/latest/INR");
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
