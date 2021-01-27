import React, { useState } from 'react';
import BoardClass from './board.js';
import Cell from '../marker/cell';

const Board = ({ currentPlayer }) => {
  const [selected, setSelected] = useState({ cell: null, message: ''});

  const board = new BoardClass();
  board.populate();
  const movePieces = board.getMovePieces(currentPlayer);
  
  function handleClick(e) {
    let targetEl;

    if (e.target.classList.contains('cell')) {
      targetEl = e.target;
    } else if (e.target.classList.contains('marker')) {
      targetEl = e.target.parentNode;
    } else {
      return;
    }

    const pos = targetEl.dataset.pos.split(',');
    const [x, y] = pos;
    const cell = board.board[x][y];

    if (!cell || cell.color !== currentPlayer) {
      setSelected({
        cell: null,
        message: 'Please click on a cell with a valid marker',
      });
    } else if (!movePieces[pos]) {
      setSelected({
        cell: null,
        message: 'This piece cannot be moved',
      });
    } else {
      setSelected({
        cell: movePieces[pos],
        message: '',
      });
    }
  }

  return (
    <>
      <p>{`${currentPlayer}'s turn. ${selected.message}`}</p>
      <div className="board" onClick={handleClick}>
        {board.board.map((row, idx1) => (
          row.map((cell, idx2) => (
            <Cell
              key={idx2}
              cell={cell}
              canMove={!!movePieces[`${idx1},${idx2}`]}
              selected={selected.cell}
              pos={`${idx1},${idx2}`}
            />
          ))
        ))}
      </div>
    </>
  );
};

export default Board;
