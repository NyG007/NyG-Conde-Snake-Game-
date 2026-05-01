const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// get high score from local storage

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score ${highScore}`;

// Pass a random between 1 and 30 as food position

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30 ) + 1;
    foodY = Math.floor(Math.random() * 30 ) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over!! Press OK to replay...");
    location.reload();
}

// Change velocity value based on key press 

const changeDirection =e => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityY != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityY != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Change DIrection on each key click

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.CDATA_SECTION_NODE.key})));

const initGame = () => {
    if (gameOver) return handleGameOver();
    let html = `<div class"food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // When snake eat food
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); // Add food to snake body array
        score++;
        highScore = score >= highScore ? score : highScore; // if score > high score => high score = score
        
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
}