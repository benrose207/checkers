import React, { useEffect, useState, useContext } from 'react';
import Cell from '../marker/cell';
import PlayerContext from '../context';

const initialSelectedState = { cell: null, message: '' };

const Board = ({ boardClass, updateScore, score }) => {
  const { currentPlayer, updateCurrentPlayer } = useContext(PlayerContext);
  const [board, setBoard] = useState(boardClass.board);
  const [movePieces, setMovePieces] = useState({})
  const [selected, setSelected] = useState(initialSelectedState);

  useEffect(() => {
    setMovePieces(boardClass.getMovePieces(currentPlayer, board));
  }, [boardClass, currentPlayer, board]);
  
  useEffect(() => {
    if (Object.keys(movePieces).length === 0 && (score.red > 0 || score.black > 0)) {
      setSelected({
        cell: null,
        message: `${currentPlayer === 'Red' ? 'Black' : 'Red'} wins!`
      })
    }
  }, [currentPlayer, movePieces, score]);

  function isMoveSpace(targetEl, prevPos) {
    const isHighlighted = targetEl.firstChild.classList.contains('highlight');
    const isNotCurrentSelection = `${selected.cell.pos}` !== prevPos.join(',');

    return isHighlighted && isNotCurrentSelection;
  }

  function updateSelection(cell, pos) {
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

  function move(prevX, prevY, x, y) {
    const marker = board[prevX][prevY];
    
    marker.pos = [x, y];
    board[x][y] = marker;
    board[prevX][prevY] = '';

    const jumped = isJump(prevX, prevY, x, y);

    if (jumped) handleJump(prevX, prevY, x, y);

    setBoard([...board]);
    setSelected(initialSelectedState);

    const canJumpAgain = marker.getMoves(board).canJump;
    if (jumped && canJumpAgain) {
      setMovePieces(boardClass.getMovePieces(currentPlayer, board));
      return;
    }

    if (marker.color === 'Red' && x === 7) marker.makeKing();
    if (marker.color === 'Black' && x === 0) marker.makeKing();

    updateCurrentPlayer();
  }

  function isJump(prevX, prevY, x, y) {
    return Math.abs(prevX - x) > 1 || Math.abs(prevY - y) > 1;
  }

  function handleJump(prevX, prevY, x, y) {
    const jumpedX = (prevX + x) / 2;
    const jumpedY = (prevY + y) / 2;
    board[jumpedX][jumpedY] = '';
    updateScore(currentPlayer);
  }
  
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
    const [x, y] = pos.map(idx => parseInt(idx));
    const cell = board[x][y];

    // if targetEl has class of highlight && is not the selected pos
    if (selected.cell && isMoveSpace(targetEl, pos)) {
      // execute 'move' function, taking in new pos, then return.
      const [prevX, prevY] = selected.cell.pos;
      move(prevX, prevY, x, y);
      return
    }

    // Else perform selection update
    updateSelection(cell, pos);
  }

  return (
    <>
      <div className="game-message">
        <p>{`${currentPlayer}'s turn`}</p>
        <p>{selected.message}</p>
      </div>
      <div className="board" onClick={handleClick}>
        {board.map((row, idx1) => (
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
