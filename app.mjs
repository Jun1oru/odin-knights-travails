class KnightBoard {
  constructor() {
    this.movesBoard = this.generateMovesBoard();
    this.board = this.generateBoard();
  }

  generateMovesBoard() {
    const array = [];
    for (let i = 0; i < 8; i++) {
      array[i] = [];
      for (let j = 0; j < 8; j++) {
        array[i][j] = 8 * i + j;
      }
    }
    return array;
  }

  findMoves(position) {
    const moves = [];
    const column = Math.floor(position / 8);
    const row = position % 8;

    // Left
    if (column - 2 >= 0) {
      // down
      if (row + 1 < 8) {
        moves.push(this.movesBoard[column - 2][row + 1]);
      }
      // up
      if (row - 1 >= 0) {
        moves.push(this.movesBoard[column - 2][row - 1]);
      }
    }
    // Right
    if (column + 2 < 8) {
      // down
      if (row + 1 < 8) {
        moves.push(this.movesBoard[column + 2][row + 1]);
      }
      // up
      if (row - 1 >= 0) {
        moves.push(this.movesBoard[column + 2][row - 1]);
      }
    }
    // Up
    if (row - 2 >= 0) {
      // left
      if (column - 1 >= 0) {
        moves.push(this.movesBoard[column - 1][row - 2]);
      }
      // right
      if (column + 1 < 8) {
        moves.push(this.movesBoard[column + 1][row - 2]);
      }
    }
    // Down
    if (row + 2 < 8) {
      // left
      if (column - 1 >= 0) {
        moves.push(this.movesBoard[column - 1][row + 2]);
      }
      if (column + 1 < 8) {
        moves.push(this.movesBoard[column + 1][row + 2]);
      }
    }

    return moves;
  }

  generateBoard() {
    const array = [];
    for (let i = 0; i < 64; i++) {
      array[i] = this.findMoves(i);
    }

    return array;
  }

  knightMoves(startPosition, endPosition) {
    const start = startPosition[0] * 8 + startPosition[1];
    const end = endPosition[0] * 8 + endPosition[1];

    const path = this.findPath(this.board, start, end);

    const coordinates = this.convertPath(path);

    let string = `You made it in ${
      coordinates.length - 1
    } moves! Here's your path:`;
    coordinates.forEach(
      (coordinate) => (string = string.concat(`\n[${coordinate}]`))
    );

    console.log(string);
  }

  convertPath(path) {
    return path.map((position) => [
      Math.floor(position / 8),
      position % 8,
    ]);
  }

  findPath(graph, startPosition, endPosition) {
    const queue = [];
    const visitedArray = [];

    queue.push([startPosition]);

    while (queue.length > 0) {
      let path = queue.shift();

      let position = path[path.length - 1];
      if (position === endPosition) {
        return path;
      }

      graph[position].forEach((neighbour) => {
        if (!visitedArray.includes(neighbour)) {
          let newPath = path.slice();
          newPath.push(neighbour);
          queue.push(newPath);
        }
      });

      visitedArray.push(position);
    }
  }
}

const myBoard = new KnightBoard();
myBoard.knightMoves([0, 0], [7, 7]);
