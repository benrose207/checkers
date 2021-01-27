import Marker from '../marker/marker.js';

class Board {
  constructor() {
    this.size = 8;
    this.board = new Array(this.size).fill().map(row => new Array(this.size));
  }

  // populate new board
  populate() {
    for (let i = 0; i < this.size; i++) {
      let offset = i % 2 === 0 ? 1 : 0;

      for (let j = 0 + offset; j < this.size; j += 2) {
        let color;
        if (i < 3) {
          color = 'r';
        } else if (i > 4) {
          color = 'b';
        }

        if (i !== 3 && i !== 4) {
          this.board[i][j] = new Marker(color, [i, j]);
        }
      }
    }
  }

  //getMoves(color)
  // Need to determine all possible moves for the current player. Then determine what their
  // choices actually are, depending on if any pieces can jump others.

  // iterate through board. For each marker belonging of the color, get it's current moves.
  // Populate an array of these potential moves
  // Then go through possible moves, filter as needed. 
}

export default Board;
