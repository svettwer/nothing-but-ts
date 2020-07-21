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

  function handleNewGame() {
    setGame({dealerScore: 0, playerScore: 0});
  }

  function renderPlayerInterface() {
    function gameIsOver(gameToCheck: Game) {
      return gameToCheck.dealerScore > 0 || gameToCheck.playerScore >= 21;
    }

    if(!gameIsOver(game)){
      return(
          <div>
            <button onClick={handleStand}>
              stand
            </button>
            <button onClick={handleHit}>
              hit
            </button>
          </div>
      );
    }else{
      let message;
      let messageStyle;
      if(game.playerScore > 21 || (game.playerScore < game.dealerScore && game.dealerScore < 21)){
        message = "YOU LOSE!";
        messageStyle = {color: "red"}
      }else if(game.dealerScore > 21 || game.playerScore > game.dealerScore){
        message = "YOU WIN!";
        messageStyle = {color: "green"}
      }
      return (
          <div>
            <h1 style={messageStyle}>{message}</h1>
            <button onClick={handleNewGame}>New game!</button>
          </div>);
    }
  }

  function getMarkup(score: number) {
    if(score > 21){
      return {color: "red"};
    }
    return {};
  }

  return (
      <div className="App">
        <div id="score">
          <h1 style={getMarkup(game.dealerScore)}>
            Dealer: {game.dealerScore > 0 ? game.dealerScore : "?"}
          </h1>
          <h1 style={getMarkup(game.playerScore)}>
            Player: {game.playerScore}
          </h1>
        </div>
        {renderPlayerInterface()}
      </div>
  );
}

export default App;
