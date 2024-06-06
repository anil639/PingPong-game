// script.js
const gameArea = document.getElementById("gameArea");
const leftPaddle = document.getElementById("leftPaddle");
const rightPaddle = document.getElementById("rightPaddle");
const ball = document.getElementById("ball");
const leftScoreElement = document.getElementById("leftScore");
const rightScoreElement = document.getElementById("rightScore");

let ballX = ball.offsetLeft;
let ballY = ball.offsetTop;
let ballDX = 2;
let ballDY = 2;

let leftPaddleY = leftPaddle.offsetTop;
let rightPaddleY = rightPaddle.offsetTop;

let leftScore = 0;
let rightScore = 0;

const paddleSpeed = 20;

document.addEventListener("keydown", (e) => {
  if (e.key === "w" && leftPaddleY > 0) {
    leftPaddleY -= paddleSpeed;
  }
  if (
    e.key === "s" &&
    leftPaddleY < gameArea.offsetHeight - leftPaddle.offsetHeight
  ) {
    leftPaddleY += paddleSpeed;
  }
  if (e.key === "ArrowUp" && rightPaddleY > 0) {
    rightPaddleY -= paddleSpeed;
  }
  if (
    e.key === "ArrowDown" &&
    rightPaddleY < gameArea.offsetHeight - rightPaddle.offsetHeight
  ) {
    rightPaddleY += paddleSpeed;
  }

  leftPaddle.style.top = leftPaddleY + "px";
  rightPaddle.style.top = rightPaddleY + "px";
});

function updateBall() {
  ballX += ballDX;
  ballY += ballDY;

  // Ball collision with top and bottom walls
  if (ballY <= 0 || ballY >= gameArea.offsetHeight - ball.offsetHeight) {
    ballDY *= -1;
  }

  // Ball collision with paddles
  if (
    ballX <= leftPaddle.offsetWidth &&
    ballY >= leftPaddleY &&
    ballY <= leftPaddleY + leftPaddle.offsetHeight
  ) {
    ballDX *= -1;
    leftScore += 1; // Increment left score
    console.log("Left player hit the ball. Score: " + leftScore);
  }
  if (
    ballX >=
      gameArea.offsetWidth - rightPaddle.offsetWidth - ball.offsetWidth &&
    ballY >= rightPaddleY &&
    ballY <= rightPaddleY + rightPaddle.offsetHeight
  ) {
    ballDX *= -1;
    rightScore += 1; // Increment right score
    console.log("Right player hit the ball. Score: " + rightScore);
  }

  // Ball out of bounds (left or right)
  if (ballX < 0 || ballX > gameArea.offsetWidth - ball.offsetWidth) {
    resetBall();
  }

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  leftScoreElement.textContent = leftScore;
  rightScoreElement.textContent = rightScore;
}

function resetBall() {
  ballX = gameArea.offsetWidth / 2 - ball.offsetWidth / 2;
  ballY = gameArea.offsetHeight / 2 - ball.offsetHeight / 2;
  ballDX = 2 * (Math.random() > 0.5 ? 1 : -1);
  ballDY = 2 * (Math.random() > 0.5 ? 1 : -1);
  console.log("Ball reset. New position: (" + ballX + ", " + ballY + ")");
}

function gameLoop() {
  updateBall();
  requestAnimationFrame(gameLoop);
}

gameLoop();
