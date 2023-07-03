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
    { teamName: 'dallas cowboys', code: 'dal', name: 'dallas-cowboys', backgroundColor: '#0b0c45', labelFontColor: '#000000' },
    { teamName: 'new york giants', code: 'nyg', name: 'new-york-giants', backgroundColor: '#030457', labelFontColor: '#FFFFFF' },
    { teamName: 'philadelphia eagles', code: 'phi', name: 'philadelphia-eagles', backgroundColor: '#012927', labelFontColor: '#FFFFFF' },
    { teamName: 'washington commanders', code: 'wsh', name: 'washington-commanders', backgroundColor: '#4a0101', labelFontColor: '#FFFFFF' },
    { teamName: 'detroit lions', code: 'det', name: 'detroit-lions', backgroundColor: '#035aa1', labelFontColor: '#000000' },
    { teamName: 'green bay packers', code: 'gb', name: 'green-bay-packers', backgroundColor: '#012b04', labelFontColor: '#FFFFFF' },
    { teamName: 'minnesota vikings', code: 'min', name: 'minnesota-vikings', backgroundColor: '#36056e', labelFontColor: '#FFFFFF' },
    { teamName: 'atlanta falcons', code: 'atl', name: 'atlanta-vikings', backgroundColor: '#700a04', labelFontColor: '#FFFFFF' },
    { teamName: 'carolina pathers', code: 'car', name: 'carolina-panthers', backgroundColor: '#0473db', labelFontColor: '#000000' },
    { teamName: 'new orleans saints', code: 'no', name: 'new-orleans-saints', backgroundColor: '#856d2d', labelFontColor: '#000000' },
    { teamName: 'tampa bay buccaneers', code: 'tb', name: 'tampa-bay-buccaneers', backgroundColor: '#700602', labelFontColor: '#FFFFFF' },
    { teamName: 'arizona cardinals', code: 'az', name: 'arizona-cardinals', backgroundColor: '#610502', labelFontColor: '#FFFFFF' },
    { teamName: 'los angelas rams', code: 'lar', name: 'los-angelas-rams', backgroundColor: '#142380', labelFontColor: '#FFFFFF' },
    { teamName: 'san francisco 49ers', code: 'sf', name: 'san-francisco-49ers', backgroundColor: '#8a0406', labelFontColor: '#FFFFFF' },
    { teamName: 'seattle seahawks', code: 'sea', name: 'seattle-seahawks', backgroundColor: '#16781c', labelFontColor: '#000000' },








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
