
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());

// Define API endpoint for game data
app.get('/api/games', (req, res) => {
  const url = 'https://www.espn.com/nfl/team/_/name/buf/buffalo-bills';

  axios
    .get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      const teams = [];
      $('span.Schedule__Team').each((index, element) => {
        const teamName = $(element).text().trim();
        teams[index] = { teamName };
      });

      const schedules = [];
      $('span.Schedule__Time:nth-child(1)').each((index, element) => {
        const spanDate = $(element).text().trim();
        const schedule = schedules[index] || {};
        schedule.date = spanDate;
        schedules[index] = schedule;
      });

      $('span.Schedule__Time:nth-child(2)').each((index, element) => {
        const spanTime = $(element).text().trim();
        const schedule = schedules[index] || {};
        schedule.time = spanTime;
        schedules[index] = schedule;
      });

      const combinedData = teams.map((team, index) => ({
        teamName: team.teamName,
        date: schedules[index].date,
        time: schedules[index].time,
      }));

      //console.log(combinedData)
      res.json(combinedData);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching game data.' });
    });
});


// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
