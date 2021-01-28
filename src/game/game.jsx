import React, { useState } from 'react';
import Board from '../board/board.jsx';
import BoardClass from '../board/board.js';

const Game = () => {
  const [currentPlayer, setCurrentPlayer] = useState('Red');
  const newBoard = new BoardClass()
  newBoard.populate();

  return (
    <main>
      <Board currentPlayer={currentPlayer} boardClass={newBoard}/>
    </main>
  );
};

export default Game;
