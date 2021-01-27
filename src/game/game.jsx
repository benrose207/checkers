import React, { useState } from 'react';
import Board from '../board/board.jsx';

const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState('r');

  return (
    <main>
      <Board currentPlayer={currentPlayer}/>
    </main>
  );
};

export default Game;
