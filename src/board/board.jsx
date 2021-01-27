import React from 'react';
import BoardClass from './board.js';
import Cell from '../marker/cell';

const Board = ({ currentPlayer }) => {
  const board = new BoardClass();
  board.populate();
  const movePieces = board.getMovePieces(currentPlayer);

  return (
    <div>
      {board.board.map((row, idx1) => (
        row.map((cell, idx2) => (
          <Cell
            key={idx2}
            cell={cell}
            canMove={!!movePieces[`${idx1},${idx2}`]}
          />
        ))
      ))}
    </div>
  );
};

export default Board;
