import React, { useState } from "react";
import axios from "axios";
import "../css/makePage.css";
import Box from "../components/BoxComponent";
import ScoreTables from "../components/TableComponent";

function MainPage() {
    


  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [gameData, setGameData] = useState([]);
  const [labelFontColor, setLabelFontColor] = useState("");

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const fetchGameData = () => {
    if (!selectedTeam) {
      return; // If selectedTeam is empty, return without making the API call
    }

    axios
      .get(`http://localhost:3005/api/nfl-data/${encodeURIComponent(selectedTeam)}`)
      .then((response) => {
        console.log(response.data);
        const { backgroundColor, gameData, labelFontColor } = response.data;
        setSelectedColor(backgroundColor);
        setLabelFontColor(labelFontColor);
        setGameData(gameData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSelectClick = () => {
    fetchGameData();
  };


  return (
    <div>

      <div className="label-container">
        <label className="main-label">Score Displayer</label>
      </div>

      <div className="box-container">
          
          <div>
            <input
              placeholder="Enter NFL Team"
              value={selectedTeam}
              onChange={handleTeamChange}
              className="nflInput"
            />
            <button onClick={handleSelectClick}>Select</button>
            <Box color={selectedColor}>
              {selectedTeam.length > 0 ? (
                <ScoreTables teamName={selectedTeam} data={gameData} labelColor={selectedColor} labelFontColor={labelFontColor}/>
              ) : (
                <p>No games found for Box 1 or Data not loaded properly</p>
              )}
            </Box>
          </div>

          <div>
            <input
              placeholder="Enter NHL Team" 
            />
            <button>Select</button>
            <Box>
              <p>No games found for Box 1 or Data not loaded properly</p>
            </Box>
          </div>
          <div>
            <input
              placeholder="Enter NBA Team"
            />
            <button>Select</button>
            <Box>
              <p>No games found for Box 1 or Data not loaded properly</p>
            </Box>
          </div>
          
      </div>


    </div>
  );
}

export default MainPage;
