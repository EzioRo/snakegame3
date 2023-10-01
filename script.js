document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');
    const snakeBody = [ { x: 10, y: 10 } ];
    let food = getRandomPosition();
    let direction = 'right';

    function getRandomPosition() {
        return {
            x: Math.floor(Math.random() * 15) * 20,
            y: Math.floor(Math.random() * 15) * 20
        };
    }

    function draw() {
        gameContainer.innerHTML = '';
        snakeBody.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = segment.y / 20 + 1;
            snakeElement.style.gridColumnStart = segment.x / 20 + 1;
            snakeElement.classList.add('snake');
            gameContainer.appendChild(snakeElement);
        });

        const foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y / 20 + 1;
        foodElement.style.gridColumnStart = food.x / 20 + 1;
        foodElement.classList.add('food');
        gameContainer.appendChild(foodElement);
    }

    function move() {
        const head = { ...snakeBody[0] };
        switch (direction) {
            case 'up':
                head.y -= 20;
                break;
            case 'down':
                head.y += 20;
                break;
            case 'left':
                head.x -= 20;
                break;
            case 'right':
                head.x += 20;
                break;
        }
        snakeBody.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            food = getRandomPosition();
        } else {
            snakeBody.pop();
        }
    }

    function checkCollision() {
        if (
            snakeBody[0].x < 0 ||
            snakeBody[0].x >= 300 ||
            snakeBody[0].y < 0 ||
            snakeBody[0].y >= 300
        ) {
            clearInterval(gameInterval);
            alert('Game Over! Your score: ' + snakeBody.length);
        }

        for (let i = 1; i < snakeBody.length; i++) {
            if (snakeBody[i].x === snakeBody[0].x && snakeBody[i].y === snakeBody[0].y) {
                clearInterval(gameInterval);
                alert('Game Over! Your score: ' + snakeBody.length);
            }
        }
    }

    function changeDirection(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    }

    document.addEventListener('keydown', changeDirection);
    const gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, 200);
});
