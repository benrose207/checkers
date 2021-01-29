import React, { useState } from 'react';
import './styles/reset.css';
import './styles/index.css';
import Game from './game/game.jsx';
import PlayerContext from './context';

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("Red");

  function updateCurrentPlayer() {
    const nextPlayer = currentPlayer === 'Red' ? 'Black' : 'Red';
    setCurrentPlayer(nextPlayer);
  }

  return (
    <PlayerContext.Provider value={{ currentPlayer, updateCurrentPlayer }}>
      <Game />
    </PlayerContext.Provider>
  );
}

export default App;
