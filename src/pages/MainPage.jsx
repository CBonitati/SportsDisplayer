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
          <table className="table">
            <thead>
              <tr>
                <th>Team</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {gameData.map((game, index) => (
                <tr key={index}>
                  <td>{game.teamName}</td>
                  <td>{game.date}</td>
                  <td>{game.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
