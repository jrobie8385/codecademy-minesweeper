module.exports = class Board {
  constructor (numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  get playerBoard () {
    return this._playerBoard;
  }
  flipTile (rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== " ") {
      console.log("This tile has already been flipped!");
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === "B") {
      this._playerBoard[rowIndex][columnIndex] = "B";
      return;
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  } //this is similar to a "void" function in c++ as it does NOT return anything.
  getNumberOfNeighborBombs (rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === "B") {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }
  hasSafeTiles () {
    return this._numberOfTiles !== this._numberOfBombs; // this is truthy, so we dont' need ana "if" statement to check it.
  }
  print () {
    console.log(this._playerBoard.map(row => row.join(" | ")).join("\n"));
  }
  static generatePlayerBoard (numberOfRows, numberOfColumns) {
    const board = [];
    for (let r = 0; r < numberOfRows; r++) {
      let row = [];
      for (let c = 0; c < numberOfColumns; c++) {
        row.push(" ");
      }
      board.push(row);
    }
    return board;
  } // this "generatePlayerBoard" allows the code previously written in the constructor to function properly.
  static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];
    for (let r = 0; r < numberOfRows; r++) {
      let row = [];
      for (let c = 0; c < numberOfColumns; c++) {
        row.push(null);
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      const randomRowIndex = Math.floor(Math.random()*numberOfRows);
      const randomColumnIndex = Math.floor(Math.random()*numberOfRows);
      if (board[randomRowIndex][randomColumnIndex] !== "B") {
      board[randomRowIndex][randomColumnIndex] = "B";
      numberOfBombsPlaced++;
    }
    }
    return board;
  }
}
