"use strict";

import Queue from "./queue.js";

window.addEventListener("load", start);
// ****** Constants ******
// #region Constants
const rows = 30;
const cols = 30;
const startFood = 12;


// ****** CONTROLLER ******
// #region controller
let autoPlay = false;
let score = 0;
function start() {
  console.log(`Javascript kører`);

  // create the board
  initModel(rows, cols);
  createBoard(rows, cols);

  // start ticking
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
        case " ":
          autoPlay = !autoPlay;
          }
        });
          
  setInterval(tick, 20);
  spawnFood();

}

function tick() {
  
  let frontBack = [pQueue.head(), pQueue.tail()];

  
  
  for (let i = 0; i < pQueue.size(); i++) {
    writeToCell(pQueue.get(i).row, pQueue.get(i).col, 0);
  }
  
  

  // move player
  movePlayer();
  
  
  
  for (let i = 0; i < pQueue.size(); i++) {
    writeToCell(pQueue.get(i).row, pQueue.get(i).col, 1);
  }
  if (autoPlay) {
    movePlayerAuto(0);
  }
  checkForFood();
  checkForBody();
  
  // display the model in full
  displayBoard();
}

function movePlayer() {
  const newHead = {
    row: pQueue.tail().row,
    col: pQueue.tail().col
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
  
  
  pQueue.enqueue(newHead);
  if (!food > 0){
    pQueue.dequeue();
     
  } else food--;
  
  
}

function movePlayerAuto(attempts) {
  // if (attempts >= 1) console.log("Tried moving the player to: ", nextDirection, attempts);
  
  if (attempts > 3) return;

  const tail = pQueue.tail();
  let row = tail.row;
  let col = tail.col;

  switch (nextDirection) {
    case "right":
      if (col + 1 >= cols) col = 0;
      if (model[row][col + 1] === 1) {
        nextDirection = "down";
        movePlayerAuto(attempts + 1);
      }
      break;
    case "down":
      if (row + 1 >= rows) row = 0;
      if (model[row + 1][col] === 1) {
        nextDirection = "left";
        movePlayerAuto(attempts + 1);
      }
      break;
    case "left":
      if (col - 1 < 0) col = cols - 1;
      if (model[row][col - 1] === 1) {
        nextDirection = "up";
        movePlayerAuto(attempts + 1);
      }
      break;
    case "up":
      if (row - 1 < 0) row = rows - 1;
      if (model[row - 1][col] === 1) {
        nextDirection = "right";
        movePlayerAuto(attempts + 1);
      }
      break;

    default:
      break;

  }
  if (attempts < 1) movePlayerAutoToFood();
}

function movePlayerAutoToFood() {
  
  const tail = pQueue.tail();
  const row = tail.row;
  const col = tail.col;

  if (foodLocation.row == row) {
    if (foodLocation.col > col && nextDirection !== "left" && nextDirection !== "right") {
      nextDirection = "right";
      console.log("Moving right for food");
    } else if (foodLocation.col < col && nextDirection !== "right" && nextDirection !== "left") {
      nextDirection = "left";
      console.log("Moving left for food");
    }
  } else if (foodLocation.col == col) {
    if (foodLocation.row > row && nextDirection !== "up" && nextDirection !== "down") {
      nextDirection = "down";
      console.log("Moving down for food");
    } else if (foodLocation.row < row && nextDirection !== "down" && nextDirection !== "up") {
      nextDirection = "up";
      console.log("Moving up for food");
    }
  }
  movePlayerAuto(1);
}

function checkForFood() {
  if (pQueue.tail().row === foodLocation.row && pQueue.tail().col === foodLocation.col) {
    writeToCell(foodLocation.row, foodLocation.col, 1);
    score++;
    food++;
    spawnFood();
  }
}

// idk how to get pQueue[i] without breaking the intended functionality 
function checkForBody(){
  for (let i = 0; i < pQueue.size() -1; i++) {
    if (pQueue.tail().row === pQueue.get(i).row && pQueue.tail().col === pQueue.get(i).col) {
      resetGame();
      break;
    }
  }
}

function resetGame() {
  pQueue.reset(randomizePlayerStart());
  food = startFood;
  clearBoard();
  spawnFood();
  setHighscore(score);
  score = 0;
}

// #endregion controller

// ****** MODEL ******
// #region model

let pQueue = new Queue();
pQueue.enqueue(randomizePlayerStart());


let food = startFood;
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

function randomizePlayerStart() {
  const row = Math.floor(Math.random() * rows);
  const col = Math.floor(Math.random() * cols);
  return { row, col };
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

function setHighscore(score) {
  const highscore = document.querySelector("#highScore");
  if (score > highscore.textContent){
  highscore.textContent = score;
}
}


function logBoard() {
  console.log(model);
}
window.logBoard = logBoard;



// #endregion view