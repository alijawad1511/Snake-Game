// Game Constants
let direction = { x: 0, y: 0 };
const foodSound = new Audio('../music/food.mp3');
const gameoverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const scoreDiv = document.getElementById('score');
scoreDiv.innerHTML = 0;
var score = 0;
var speed = 20;
let lastPaintTime = 0;

// Snake Body Array
let snakeBody = [{ x: 20, y: 20 }];

// Food
let foodPosition = {
    x: 8,
    y: 8
};


// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPaintTime = ctime;

    gameEngine();
}

function isCollided(snakeBody) {

    if (snakeBody[0].x >= 40 || snakeBody[0].x <= 1 || snakeBody[0].y >= 40 || snakeBody[0].y <= 1)
    {
        return true;
    }

    for (let i = 2; i < snakeBody.length; i++) {
        if (snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y) {
            return true;
        }
    }

    return false;
}


function gameEngine() {

    // @@@{ Part 1 : Update Snake Body/Array }@@@
    if (isCollided(snakeBody)) {
        let promise = gameoverSound.play();
        promise.then(() => {
            console.log('Play');
        }).catch((err) => {
            console.log(err);
        })
        direction = { x: 0, y: 0 };
        alert('Game Over!');
        snakeBody = [{ x: 20, y: 20 }];
        score = 0;
    }

    // When Snake Eat Food, Regenerate Food
    if (snakeBody[0].x === foodPosition.x && snakeBody[0].y === foodPosition.y) {
        // foodSound.play();
        score += 2;
        scoreDiv.innerHTML = score;
        console.log(score);
        snakeBody.unshift({ x: snakeBody[0].x + direction.x, y: snakeBody[0].y + direction.y });    // unshift() add an element at start of array
        let max = 38, min = 2;  // Food between these coordinates
        foodPosition = { x: Math.floor(Math.random() * (max - min)) + min, y: Math.floor(Math.random() * (max - min)) + min };
    }


    // Snake Movement
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }
    snakeBody[0].x += direction.x;
    snakeBody[0].y += direction.y;


    // @@@{ Part 2 : Display Snake and Food }@@@

    // Display Snake
    board.innerHTML = "";   // Clean previous frame before print next frame
    snakeBody.forEach((element, index) => {
        bodyPart = document.createElement('div');

        // Set Class for Head
        if (index === 0) {
            bodyPart.classList.add('head');
        } else {
            bodyPart.classList.add('snakeBody');
        }

        bodyPart.style.gridRowStart = element.y;
        bodyPart.style.gridColumnStart = element.x;
        board.appendChild(bodyPart);
    });


    // Display Food
    food = document.createElement('div');
    food.classList.add('food');
    food.style.gridRowStart = foodPosition.y;
    food.style.gridColumnStart = foodPosition.x;
    board.appendChild(food);
}




// Main Logic Starting
window.requestAnimationFrame(main);

window.addEventListener('keydown', (e) => {


    switch (e.key) {
        case "ArrowUp":
            // Make sure not to move in opposite direction of current movement
            if (!(direction.x === 0 && direction.y === 1)) {
                // moveSound.play();
                direction.x = 0;
                direction.y = -1;
            }

            break;

        case "ArrowDown":
            if (!(direction.x === 0 && direction.y === -1)) {
                // moveSound.play();
                direction.x = 0;
                direction.y = 1;
            }

            break;

        case "ArrowLeft":
            if (!(direction.x === 1 && direction.y === 0)) {
                // moveSound.play();
                direction.x = -1;
                direction.y = 0;
            }

            break;

        case "ArrowRight":
            if (!(direction.x === -1 && direction.y === 0)) {
                // moveSound.play();
                direction.x = 1;
                direction.y = 0;
            }

            break;

        default:
            break;
    }
})
