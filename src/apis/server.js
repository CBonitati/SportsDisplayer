const getNFLData = require('./getNFLData');
const cors = require('cors');
const express = require('express');


const app = express();
app.use(cors());



// Define API endpoint for all NFL teams
app.get('/api/nfl-data/:teamName', async (req, res) => {
  const { teamName } = req.params;

  try {
    const data = await getNFLData(teamName);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
app.listen(3005, () => {
  console.log('Server is running on port 3005');
});