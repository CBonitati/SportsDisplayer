const cors = require('cors');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());

const teams = [
    { teamName: 'buffalo bills', code: 'buf', name: 'buffalo-bills', backgroundColor: '#1613e8', labelFontColor: '#ffffff' },
    { teamName: 'miami-dolphins', code: 'mia', name: 'miami-dolphins', backgroundColor: '#02e7f7', labelFontColor: '#000000' },
    { teamName: 'new england patriots', code: 'ne', name: 'new-england-patriots', backgroundColor: '#0c0c2e', labelFontColor: '#ffffff' },
    { teamName: 'new york jets', code: 'nyj', name: 'new-york-jets', backgroundColor: '#07330d', labelFontColor: '#ffffff' },
    { teamName: 'baltimore ravens', code: 'bal', name: 'baltimore-ravens', backgroundColor: '#23054d', labelFontColor: '#ffffff' },
    { teamName: 'cincinnati bengals', code: 'cin', name: 'cincinnati-bengals', backgroundColor: '#b83c07', labelFontColor: '#000000' },
    { teamName: 'cleveland browns', code: 'cle', name: 'cleveland-browns', backgroundColor: '#d14408', labelFontColor: '#000000' },
    { teamName: 'pittsburgh steelers', code: 'pit', name: 'pittsburgh-steelers', backgroundColor: '#fad902', labelFontColor: '#000000' },
    { teamName: 'houstan texans', code: 'hou', name: 'houston-texans', backgroundColor: '#04062e', labelFontColor: '#ffffff' },
    { teamName: 'indianapolis colts', code: 'ind', name: 'indianapolis-colts', backgroundColor: '##fcfcfc', labelFontColor: '#000000' },
    { teamName: 'jacksonville jaguars', code: 'jax', name: 'jacksonville-jaguars', backgroundColor: '03536e', labelFontColor: '#000000' },
    { teamName: 'tennessee titans', code: 'ten', name: 'tennessee-titans', backgroundColor: '#2597f5', labelFontColor: '#ffffff' },
    { teamName: 'denver broncos', code: 'den', name: 'denver-broncos', backgroundColor: "#db5807", labelFontColor: '#000000' },
    { teamName: 'kansas city chiefs', code: 'kc', name: 'kansas-city-chiefs', backgroundColor: '#d90711', labelFontColor: '#000000' },
    { teamName: 'las vegas raiders', code: 'lv', name: 'las-vegas-raiders', backgroundColor: '#000000', labelFontColor: '#ffffff' },
    { teamName: 'los angeles chargers', code: 'lac', name: 'los-angeles-chargers', backgroundColor: '#d90711', labelFontColor: '#ffffff' },
    
  ];

// Function to retrieve Buffalo Bills game data
const getNFLData = (name) => {


  const team = teams.find((team) => team.name === name.toLowerCase());

  const url = `https://www.espn.com/nfl/team/_/name/${team.code}/${team.name}`;

  console.log(url)

  return axios
    .get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      const teamsData = [];
      $('span.Schedule__Team').each((index, element) => {
        const teamName = $(element).text().trim();
        teamsData[index] = { teamName };
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

      const combinedData = teamsData.map((team, index) => ({
        teamName: team.teamName,
        date: schedules[index].date,
        time: schedules[index].time,
      }));

      return {
        gameData: combinedData,
        backgroundColor: team.backgroundColor,
        labelFontColor: team.labelFontColor,
      };

    })
    .catch(error => {
      console.error(error);
      throw new Error('An error occurred while fetching NFL game data.');
    });
};

module.exports = getNFLData;
