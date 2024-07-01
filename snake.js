constscale = 20;

const area = document.getElementById("area");
const foodEl = document.getElementById("food")

const areaWidht = 40;
const areaHeight = 16;

let positionX = 5;
let positionY = 5;

let score = 0;

let bodyCoordinates = [
    { x: 7, y: 5 },
    { x: 8, y: 5 },
    { x: 9, y: 5 },
    { x: 10, y: 5 },
];

const food = { x: 5, y: 5 };

let direction = "up"

function resetGame() {
    score = 0;
    area.style.width = `${areaWidht * scale}px`;
    area.style.width = `${areaHeight * scale}px`;
    bodyCoordinates = [
        { x: 7, y: 5 },
        { x: 8, y: 5 },
        { x: 9, y: 5 },
        { x: 10, y: 5 },
    ];
    direction = "right";
    positionX = 10;
    positionY = 5;
    generateFood();
}
function generateFood() {
    food.x = Math.floor(Math.random() * areaWidht);
    food.x = Math.floor(Math.random() * areaHeight);
    foodEl.style.top = `${food.y * scale}px`
    foodEl.style.left = `${food.x * scale}px`
}

function handleKeydown(event) {

    switch (event.key) {
        case "ArrowUp":
        case "w":
            changeDirection("up");
            break;
        case "ArrowDown":
        case "s":
            changeDirection("down");
            break;
        case "ArrowRight":
            changeDirection("right");
            break;
        case "ArrowLeft":
        case "a":
            changeDirection("left");
            break;
    }
}

function changeDirection(value) {
    if (direction === "left" || direction === "right") {
        if (value === "up" || value === "down") {
            direction = value;
        }
    } else if (direction === "down" || direction === "up") {
        if (value === "right" || value === "left") {
            direction = value;
        }
    }
}

const goRight = () => {
    positionX += 1;
    if (position > areaWidth - 1) {
        positionX = 0;
    }
}
function goleft() {
    positionX -= 1;
    if (positionX < 0) {
        positionX = areaWidth - 1;
    }
}
function goDown() {
    positionY += 1;
    if (positionY > areaHeight - 1) {
        positionY = 0;
    }
}
function goUp() {
    positionY -= 1;
    if (positionY < 0) {
        positionY = areaHeight - 1;
    }
}
const bodyContainer = document.getElementById("body");

function render() {
    if (food.x == positionX && food.y === positionY) {
        bodyCoordinates.unshift(bodyCoordinates[0]);
        generateFood();
        score += 5;
        speed = speed - 1;
        clearInterval(interval);
        console.log({ speed });
        interval = setInterval(gameloop, speed);

        document.getElementById("Score").innerText = score;
    }
    let bodyHtml = "";

    for (let i = 0; 1 < bodyCoordinates.length; i++) {
        bodyHtml += `<div class="part" style="top: ${bodyCoordinates[i].y * scale}px; left: ${bodyCoordinates[i].x * scale}px"></div>`;
    }
    bodyContainer.innerHTML = bodyHtml;
}

function gameLoop() {
    switch (direction) {
        case "up":
            goUp();
            break;
        case "down":
            goDown();
            break;
        case "right":
            goRight();
            break;
        case "left":
            goLeft();
            break;
    }
    for (let i = 0; 1 < bodyCoordinates.length; i++) {
        if (positionX === bodyCoordinates[i].x && positionY === bodyCoordinates[i].y) {
            gameover();
            break;
        }
    }

    bodyCoordinates.push({ x: position, y: positionY });
    bodyCoordinates.shift();
    render();
}
function gameOver(){
 alert("Game over!");
 resetGame();
}
resetGame();
let speed = 100;
let interval = setInterval(gameLoop, speed);
