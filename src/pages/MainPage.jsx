import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/makePage.css";

function MainPage() {
    

  const [gameData, setGameData] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:3001/api/games")
      .then(response => {
        console.log(response.data)
        const data = response.data;
        setGameData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  return (
    <div>

      <div className="box-container">
        <div className="box box1">
            {gameData.length > 0 ? (
            gameData.map((game, index) => (
            <div key={index}>
              <table>
                <tr>Team: {game.teamName}</tr>
                <tr>Date: {game.date}</tr>
                <tr>Time: {game.time}</tr>
              </table>
            </div>
    ))
  ) : (
    <p>No games found.</p>
  )}
        </div>
        <div className="box box2">
            
        </div>
        <div className="box box3">
            
        </div>
        <div className="box box4">
            
        </div>
      </div>
    </div>
  );
}

export default MainPage;
