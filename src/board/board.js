import Marker from '../marker/marker.js';

class Board {
  constructor() {
    this.size = 8;
    this.board = new Array(this.size).fill().map(row => new Array(this.size).fill(""));
  }

  // populate new board
  populate() {
    for (let i = 0; i < this.size; i++) {
      let offset = i % 2 === 0 ? 1 : 0;

      for (let j = 0 + offset; j < this.size; j += 2) {
        let color;
        if (i < 3) {
          color = 'Red';
        } else if (i > 4) {
          color = 'Black';
        }

        if (i !== 3 && i !== 4) {
          this.board[i][j] = new Marker(color, [i, j]);
        }
      }
    }
  }

  getMovePieces(color, board) {
    const moves = {};
    let canJump = false;

    // iterate through board. For each marker belonging of the color, get it's current moves.
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const cell = board[i][j];

        if (cell && cell.color === color) {
          const cellMoveData = cell.canMove(board);

          if (cellMoveData.canMove) {
            const posStr = `${i},${j}`;
            moves[posStr] = cellMoveData;

            if (cellMoveData.canJump) canJump = true;
          }

        }
      }
    }
    // Check if any of the markers can jump. If so, filter moves to only these tiles
    // If none can jump, then just return all moves
    if (canJump) {
      Object.keys(moves).forEach(key => {
        this.resolveJumpOptions(moves, key);
      });
    }

    return moves;
  }

  resolveJumpOptions(moves, key) {
    if (!moves[key].canJump) {
      delete moves[key];
    } else {
      const markerMoves = moves[key].moves;
      const pos = moves[key].pos;
      moves[key].moves = markerMoves.filter(move => (
        Math.abs(move[0] - pos[0]) > 1 || Math.abs(move[2] - pos[1]) > 1
      ));
    }
  }
}

export default Board;
