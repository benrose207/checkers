class Marker {
  constructor(color, pos) {
    this.color = color;
    this.king = false;
    this.pos = pos;
  }

  //make king
  makeKing() {
    this.king = true;
  }

  canMove(currentBoard) {
    // depending on color and king status, determine if piece can move at all
    // Also will need to return cells this piece could move to
    // Need to see if it can jump anyone
    let moves = [];

    let directions;
    if (this.king) {
      directions = [[1, -1], [-1, -1], [1, 1], [-1, 1]];
    } else if (this.color === 'r') {
      directions = [[1, 1], [1, -1]];
    } else {
      directions = [[-1, -1], [-1, 1]];
    }

    for (const direction of directions) {
      const [x, y] = this.pos;
      const [newX, newY] = [x + direction[0], y + direction[1]];
      if (!this.validPos(newX, newY)) continue;
      debugger
      if (!currentBoard[newX][newY]) {
        moves.push([newX, newY]);
      }
    }

    return {
      moves,
      canMove: moves.length > 0,
    }
  }
  
  validPos(x, y) {
    return (x >= 0 && x < 8 && y >= 0 && y < 8);
  }

  move(pos) {
    this.pos = pos;
  }
}

export default Marker;
