const gridSize = 15;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 1;
let dy = 0;
let gameStarted = false;

function drawSnake() {
    const gameContainer = document.querySelector('.game-container');
    gameContainer.innerHTML = '';
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.classList.add('snake');
        gameContainer.appendChild(snakeElement);
    });
}

function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add('food');
    const gameContainer = document.querySelector('.game-container');
    gameContainer.appendChild(foodElement);
}

function moveSnake() {
    if (!gameStarted) {
        return;
    }
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    food = { x: x, y: y };
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        gameOver();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    alert('Game Over! Your score: ' + (snake.length - 1));
    snake = [{ x: 10, y: 10 }];
    dx = 1;
    dy = 0;
    generateFood();
    gameStarted = false;
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (dy !== 1) {
                dx = 0;
                dy = -1;
            }
            break;
        case 'ArrowDown':
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
        case 'ArrowLeft':
            if (dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;
        case 'ArrowRight':
            if (dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
    }
    if (!gameStarted) {
        gameStarted = true;
    }
});

function gameLoop() {
    moveSnake();
    checkCollision();
    drawSnake();
    drawFood();
}

generateFood();
setInterval(gameLoop, 100);
