// Simple Snake Game Implementation
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const GRID_SIZE = 20;
const TILE_COUNT = canvas.width / GRID_SIZE;

// Game state
let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let score = 0;
let gameRunning = false;
let gameLoop = null;
let gamePaused = false;

// DOM elements
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const finalScoreElement = document.getElementById('final-score');
const gameOverElement = document.getElementById('game-over');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const restartBtn = document.getElementById('restart-btn');
const speedSelect = document.getElementById('speed');

// Initialize high score
let highScore = localStorage.getItem('snakeHighScore') || 0;
highScoreElement.textContent = highScore;

function generateFood() {
    food = {
        x: Math.floor(Math.random() * TILE_COUNT),
        y: Math.floor(Math.random() * TILE_COUNT)
    };
    
    // Make sure food doesn't spawn on snake
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
}

function drawGame() {
    // Clear canvas
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    ctx.fillStyle = '#48bb78';
    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            ctx.fillStyle = '#38a169'; // Head color
        } else {
            ctx.fillStyle = '#48bb78'; // Body color
        }
        ctx.fillRect(snake[i].x * GRID_SIZE, snake[i].y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
    }
    
    // Draw food
    ctx.fillStyle = '#e53e3e';
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE - 2, GRID_SIZE - 2);
    
    // Draw grid
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= TILE_COUNT; i++) {
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * GRID_SIZE);
        ctx.lineTo(canvas.width, i * GRID_SIZE);
        ctx.stroke();
    }
}

function updateGame() {
    if (!gameRunning || gamePaused || (dx === 0 && dy === 0)) return;
    
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    
    // Check wall collision
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        gameOver();
        return;
    }
    
    // Check self collision (but not with the head itself)
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }
    
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

function gameOver() {
    gameRunning = false;
    clearInterval(gameLoop);
    
    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.textContent = highScore;
    }
    
    // Show game over screen
    finalScoreElement.textContent = score;
    gameOverElement.classList.remove('hidden');
    
    // Reset button states
    startBtn.textContent = 'Start Game';
    startBtn.disabled = false;
    pauseBtn.textContent = 'Pause';
}

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        startBtn.textContent = 'Press Arrow Key to Start';
        startBtn.disabled = true;
        gameOverElement.classList.add('hidden');
    }
}

function resetGame() {
    gameRunning = false;
    clearInterval(gameLoop);
    
    snake = [{x: 10, y: 10}];
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    
    generateFood();
    drawGame();
    
    gameOverElement.classList.add('hidden');
    startBtn.textContent = 'Start Game';
    startBtn.disabled = false;
    pauseBtn.textContent = 'Pause';
}

function runGameLoop() {
    updateGame();
    drawGame();
}

// Event listeners
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
restartBtn.addEventListener('click', () => {
    resetGame();
    startGame();
});

pauseBtn.addEventListener('click', () => {
    if (gameRunning) {
        if (gameLoop) {
            clearInterval(gameLoop);
            gameLoop = null;
            pauseBtn.textContent = 'Resume';
        } else {
            if (dx !== 0 || dy !== 0) {
                gameLoop = setInterval(runGameLoop, parseInt(speedSelect.value));
                pauseBtn.textContent = 'Pause';
            }
        }
    }
});

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    
    const key = e.code;
    
    // Start game loop on first direction key press
    if ((dx === 0 && dy === 0) && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(key)) {
        startBtn.textContent = 'Running...';
        gameLoop = setInterval(runGameLoop, parseInt(speedSelect.value));
    }
    
    // Prevent reverse direction
    switch(key) {
        case 'ArrowUp':
        case 'KeyW':
            if (dy !== 1) {
                dx = 0;
                dy = -1;
            }
            break;
        case 'ArrowDown':
        case 'KeyS':
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
        case 'ArrowLeft':
        case 'KeyA':
            if (dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;
        case 'ArrowRight':
        case 'KeyD':
            if (dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
        case 'Space':
            e.preventDefault();
            pauseBtn.click();
            break;
    }
});

// Prevent arrow keys from scrolling
window.addEventListener('keydown', (e) => {
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
    }
});

// Speed control
speedSelect.addEventListener('change', () => {
    if (gameLoop) {
        clearInterval(gameLoop);
        gameLoop = setInterval(runGameLoop, parseInt(speedSelect.value));
    }
});

// Initialize game
generateFood();
drawGame();