import React, { useEffect, useState } from 'react';
import './App.css';
import { Game } from "@nothing-but-js/api";

function App() {

  const [game, setGame] = useState<Game>({
    playerScore: 0,
    dealerScore: 0
  });

  return (
      <div className="App">

      </div>
  );
}

export default App;
