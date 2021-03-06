/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let i = 0; i < HEIGHT; i++){
    board.push([]);
  }
  return board.map(function(x){
    for(let i = 0; i < WIDTH; i++){
      x.push(null);
    }
    return board;
  })
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");
  // TODO: add comment for this code
  // Create a top row that when player has click on the top row cell, the board will show which spot taht player have taken.
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // TODO: add comment for this code
  //Insert cell into top row depends on width and give each cell id from 0 to width
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  //Insert board table into html and gives each cell an id that depends on height and width
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  let spotIndex = board.findIndex((y) => y[x] !== null);
  if(spotIndex === -1){// if empty index will return -1
    return HEIGHT - 1;
  }
  else if(spotIndex === 0){ // if filled index will return 0
    return null;
  }
  return spotIndex - 1;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let div = document.createElement(`div`);
  let spot = document.getElementById(`${y}-${x}`); // cannot use queryselector document.querySelector(`#${y}-${x}`)
  div.classList.add(`piece`,`p${currPlayer}`);
  spot.append(div);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert (msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  //check again to avoid player continue playing after winning
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // get x from ID of clicked cell
  let x = +evt.target.id; //what is this + means

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(board.every((y) => y.every((x) => x !== null))){
    alert (`Tie!`);
  }


  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if(currPlayer === 1){
    currPlayer = 2;
  }
  else{
    currPlayer = 1;
  }

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    //Check if array is valid in the board array with player number.
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  //for every column, array
  for (let y = 0; y < HEIGHT; y++) {
    //for every row cell, nested array
    for (let x = 0; x < WIDTH; x++) {
      //create a new array to check for horizontal from that spot
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //check for vertical
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //check for diagonal through right
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      //check for diagonal through left
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //if any of them is valid in board array, that player win
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
