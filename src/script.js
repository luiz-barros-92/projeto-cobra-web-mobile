window.onload = function() { 
    document.getElementById("ano").innerHTML = new Date().getFullYear(); 
  }

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const blockSize = 10;
const gameSpeed = 100;

let snake = [
  {x: 200, y: 200},
  {x: 190, y: 200},
  {x: 180, y: 200},
];

let direction = "right";

let food = {
  x: Math.floor (Math.random() * (canvasWidth / blockSize - 2)) * blockSize + blockSize,
  y: Math.floor (Math.random() * (canvasHeight / blockSize - 2)) * blockSize + blockSize
}

let score = 0;

function drawSnake() {
  snake.forEach((block, index) => {
    ctx.fillStyle = "#223521";
    ctx.fillRect(block.x, block.y, blockSize, blockSize);    
  });  
}

function drawFood() {
  ctx.fillStyle = "#223521";
  ctx.fillRect(food.x, food.y, blockSize, blockSize);
}

function foodEat() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    food.x = Math.floor (Math.random() * (canvasWidth / blockSize - 2)) * blockSize + blockSize;
    food.y = Math.floor (Math.random() * (canvasHeight / blockSize - 2)) * blockSize + blockSize;

    score++;
    document.getElementById('score').value = `${score}`;    

    return true;
  }
  return false;
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
      direction = "up";
      break;
    case "ArrowDown":
    case "s":
      direction = "down";
      break;
    case "ArrowLeft":
    case "a":
      direction = "left";
      break;
    case "ArrowRight":
    case "d":
      direction = "right";
      break;
  }
});

function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };

  switch (direction) {
    case "up":
        head.y -= blockSize;
        break;
    case "down":
        head.y += blockSize;
        break;
    case "left":
        head.x -= blockSize;
        break;
    case "right":
        head.x += blockSize;
        break;
  }

  snake.unshift(head);

  if (!foodEat()) {
    snake.pop();
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  moveSnake();

  drawSnake();

  drawFood();

  setTimeout(gameLoop, gameSpeed);
}

gameLoop();