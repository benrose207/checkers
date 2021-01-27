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

  getMoves(currentBoard) {
    let moves = [];
    let canJump = false;
  
    let directions;
    if (this.king) {
      directions = [[1, -1], [-1, -1], [1, 1], [-1, 1]];
    } else if (this.color === 'Red') {
      directions = [[1, 1], [1, -1]];
    } else {
      directions = [[-1, -1], [-1, 1]];
    }
  
    for (const direction of directions) {
      const [x, y] = this.pos;
      let [newX, newY] = [x + direction[0], y + direction[1]];
      if (!this.validPos(newX, newY)) continue;
      const moveSpace = currentBoard[newX][newY]
  
      if (!moveSpace) {
        moves.push(`${newX},${newY}`);
      } else if (moveSpace.color !== this.color) {
        newX += direction[0];
        newY += direction[1];

        if (!currentBoard[newX][newY]) {
          moves.push([`${newX},${newY}`]);
          canJump = true;
        }
      }
    }

    return { moves, canJump };
  }

  canMove(currentBoard) {
    const { moves, canJump } = this.getMoves(currentBoard);

    return {
      moves,
      canJump,
      pos: this.pos,
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
