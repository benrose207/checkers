import React from 'react';
import BoardClass from './board.js';
import Marker from '../marker/marker.jsx';

const Board = () => {
  const board = new BoardClass();
  board.populate();

  return (
    <div>
      {board.board.map(row => (
        row.map((cell, idx) => (
          cell ? <Marker key={idx} marker={cell} board={board.board}/> : <div>" "</div>
        ))
      ))}
    </div>
  );
};

export default Board;
