const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const endButton = document.getElementById("endButton");
const restartButton = document.getElementById("restartButton");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const gameOverDisplay = document.getElementById("gameOver");

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let highScore = 0;
let gameInterval;

const snakeImage = new Image();
snakeImage.src = 'snake.png'; // Ganti dengan nama file gambar ular Anda

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw border
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Outer border
    ctx.clearRect(2, 2, canvas.width - 4, canvas.height - 4); // Inner area
    
    // Draw snake
    snake.forEach((segment) => {
        ctx.drawImage(snakeImage, segment.x * 20 + 2, segment.y * 20 + 2, 18, 18);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 20 + 2, food.y * 20 + 2, 18, 18);
    
    // Move snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    // Check for Game Over
    if (isGameOver(head)) {
        endGame();
        return;
    }

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        if (score > highScore) {
            highScore = score;
            highScoreDisplay.textContent = highScore;
        }
        generateFood();
    } else {
        snake.pop(); // remove the last segment
    }
    
    snake.unshift(head); // add new head
}

function isGameOver(head) {
    // Check wall collisions
    if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20) {
        return true;
    }
    // Check self-collisions
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function endGame() {
    clearInterval(gameInterval);
    gameOverDisplay.style.display = 'block';
    startButton.style.display = 'none'; // Hide start button
    endButton.style.display = 'none'; // Hide end button
    restartButton.style.display = 'block'; // Show restart button
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    if (keyPressed === 37 && direction.x === 0) { // Left
        direction = { x: -1, y: 0 };
    } else if (keyPressed === 38 && direction.y === 0) { // Up
        direction = { x: 0, y: -1 };
    } else if (keyPressed === 39 && direction.x === 0) { // Right
        direction = { x: 1, y: 0 };
    } else if (keyPressed === 40 && direction.y === 0) { // Down
        direction = { x: 0, y: 1 };
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 20));
    food.y = Math.floor(Math.random() * (canvas.height / 20));
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    gameOverDisplay.style.display = 'none'; // Hide Game Over message
    startButton.style.display = 'none'; // Hide start button
    endButton.style.display = 'block'; // Show end button
    restartButton.style.display = 'none'; // Hide restart button
    clearInterval(gameInterval);
    gameInterval = setInterval(draw, 150); // Ubah kecepatan di sini
}

function restartGame() {
    startGame(); // Restart the game
}

startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
restartButton.addEventListener("click", restartGame);
document.addEventListener("keydown", changeDirection);