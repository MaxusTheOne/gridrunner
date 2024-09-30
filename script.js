"use strict";

window.addEventListener("load", start);
// ****** Variables ******
// #region variables
const rows = 20;
const cols = 20;


// ****** CONTROLLER ******
// #region controller

function start() {
  console.log(`Javascript kører`);

  // create the board
  initModel(rows, cols);
  createBoard(rows, cols);

  // start ticking
  setInterval(tick, 100);
  document.addEventListener("keydown", function(event) {
    switch (event.key) {
      case "w":
        if (direction !== "down") nextDirection = "up";
      
        break;
      case "s":
        if (direction !== "up") nextDirection = "down";

        break;
      case "a":
        if (direction !== "right") nextDirection = "left";
        
        break;
      case "d":
        if (direction !== "left") nextDirection = "right";

        break;
    }
  });

  spawnFood();

}

function tick() {
  

  // TODO: Do stuff
  queue.forEach((bodyPart, index) => {
    writeToCell(bodyPart.row, bodyPart.col, 0);
  });
  

  // move player
  
  movePlayer();
  
  
  
  queue.forEach((bodyPart, index) => {
    writeToCell(bodyPart.row, bodyPart.col, 1);
  });
  checkForFood();
  checkForBody();
  
  // display the model in full
  displayBoard();
}

function movePlayer() {
  const newHead = {
    row: queue[queue.length-1].row,
    col: queue[queue.length-1].col
  };
  direction = nextDirection;

  switch (direction) {
    case "right":
      newHead.col++;
      if (newHead.col >= cols) {
        newHead.col = 0;

      }
      break;
    case "left":
      newHead.col--;
      if (newHead.col < 0) {
        newHead.col = cols - 1;
      }
      break;
    case "up":
      newHead.row--;
      if (newHead.row < 0) {
        newHead.row = rows - 1;
      }
      break;
    case "down":
      newHead.row++;
      if (newHead.row >= rows) {
        newHead.row = 0;
      }
      break;
  
    default:
      break;
  }
  queue.push(newHead);
  if (!food > 0){
    queue.shift();
  } else food--;
  
  
}

function checkForFood() {
  if (queue[queue.length-1].row === foodLocation.row && queue[queue.length-1].col === foodLocation.col) {
    writeToCell(foodLocation.row, foodLocation.col, 1);

    food++;
    spawnFood();
  }
}

function checkForBody(){
  for (let i = 0; i < queue.length-1; i++) {
    if (queue[queue.length-1].row === queue[i].row && queue[queue.length-1].col === queue[i].col) {
      queue = [{ row: 5, col: 5 }];
      food = 2;
      clearBoard();
      spawnFood();
      break;
    }
  }
}

// #endregion controller

// ****** MODEL ******
// #region model


let queue = [
  { row: 5, col: 5 }
]

let food = 2;
let foodLocation = { row: 0, col: 0 };
  
let direction = "right";
let nextDirection = "right";

const model = [

];

function initModel(row, col){
  for (let i = 0; i < row; i++) {
    model.push([]);
    for (let j = 0; j < col; j++) {
      model[i].push(0);
    }
  }
}

function clearBoard() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      writeToCell(i, j, 0);
    }
  }
}

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}

function playerMove(row, col) {
}

function spawnFood() {
  foodLocation.row = Math.floor(Math.random() * rows);
  foodLocation.col = Math.floor(Math.random() * cols);
  if (readFromCell(foodLocation.row, foodLocation.col) === 1) {
    spawnFood();
    return;
  }
  writeToCell(foodLocation.row, foodLocation.col, 2);
}



// #endregion model

// ****** VIEW ******
// #region view

function createBoard(row, col) {
  const grid = document.querySelector("#grid");
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      grid.appendChild(cell);
    }
  }
}

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = row * cols + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          cells[index].classList.remove("goal");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}



// #endregion view