import React, { useState } from 'react';
import './App.css';
import { Game } from "@nothing-but-js/api";

function App() {

  const [game, setGame] = useState<Game>({
    playerScore: 0,
    dealerScore: 0
  });

  function handleHit() {
    fetch('/api/game/hit',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(game)
    }).then(response => response.json())
        .then(receivedGame => setGame(receivedGame))
  }

  function handleStand() {
    fetch('/api/game/stand', {
      method: "POST",
      headers:{
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(game)
    }).then(response => response.json())
        .then(receivedGame => setGame(receivedGame))
  }

  return (
      <div className="App">
        <div id="score">
          <h1>
            Dealer: {game.dealerScore > 0 ? game.dealerScore : "?"}
          </h1>
          <h1>
            Player: {game.playerScore}
          </h1>
        </div>
        <div>
          <button onClick={handleStand}>
            stand
          </button>
          <button onClick={handleHit}>
            hit
          </button>
        </div>
      </div>
  );
}

export default App;
