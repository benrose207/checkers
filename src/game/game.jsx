import React, { useState } from 'react';
import Board from '../board/board.jsx';
import BoardClass from '../board/board.js';
import GameDetails from './game_details';

const Game = () => {
  const [score, setScore] = useState({ red: 0, black: 0 });
  const newBoard = new BoardClass()
  newBoard.populate();

  const updateScore = (color) => {
    const key = color.toLowerCase();
    setScore({ ...score, [key]: score[key] + 1 });
  } 

  return (
    <main>
      <GameDetails score={score} />
      <Board boardClass={newBoard} updateScore={updateScore}/>
    </main>
  );
};

export default Game;
