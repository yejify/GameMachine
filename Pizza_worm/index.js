const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const blockSize = 10;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const scoreEl = document.querySelector('.score');

const upBtn = document.querySelector('.btn-up');
const downBtn = document.querySelector('.btn-down');
const leftBtn = document.querySelector('.btn-left');
const rightBtn = document.querySelector('.btn-right');
const startBtn = document.querySelector('.btnstart');

let worm = [
    { x: 20, y: 20 }
];
let pizza = { x: 100, y: 100 };
let direction = 'right';
let score = 0;
let gameSpeed = 2;

//////////////////////
function pizzaLocation() {
    pizza.x = Math.floor(Math.random() * canvas.width / 10) * 10;
    pizza.y = Math.floor(Math.random() * canvas.height / 10) * 10;
}

function collapseWall() {
    const head = worm[0];

    if (head.x === -1 && head.y >= 0 && head.y <= canvasHeight / 10) {
        console.log(head.x, head.y)
        // direction = null
        alert(`게임 오버! score : ${score}`)
        resetGame();
    }
    else if (head.y === -1 && head.x >= 0 && head.x <= canvasWidth / 10) {
        console.log(head.x, head.y)
        alert(`게임 오버! score : ${score}`)
        // direciton = null
        resetGame();
    }
    else if (head.x === canvasWidth / 10 && head.y >= 0 && head.y <= canvasHeight / 10) {
        console.log(head.x, head.y)
        // direction = null
        alert(`게임 오버! score : ${score}`)
        resetGame();
    }
    else if (head.y === canvasHeight / 10 && head.x >= 0 && head.x <= canvasWidth / 10) {
        console.log(head.x, head.y)
        // direction = null
        alert(`게임 오버! score : ${score}`)
        resetGame();
    }
}
// 지렁이 머리와 몸이 닿은 경우
function wormHeadTailCrush() {
    for (let i = 2; i < worm.length; i++) {
        if (worm[0].x === worm[i - 1].x && worm[0].y === worm[i - 1].y) {
            alert(`게임 오버! score : ${score}`)
            resetGame();
        }
    }
}

function drawBlock(x, y) {
    // ctx.clearRect(0,0, canvasWidth, canvasHeight);
    // ctx.beginPath();
    ctx.fillStyle = "green"
    ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

function drawWorm() {
    worm.forEach(segment => {
        drawBlock(segment.x, segment.y);
    });
}

function moveWorm() {
    const head = { x: worm[0].x, y: worm[0].y };

    if (direction === 'right') head.x++;
    if (direction === 'left') head.x--;
    if (direction === 'up') head.y--;
    if (direction === 'down') head.y++;

    worm.unshift(head);
    worm.pop();
    collapseWall();
    wormHeadTailCrush();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = "red";
    ctx.fillRect(pizza.x, pizza.y, 10, 10);
    // ctx.arc(pizza.x, pizza.y, 10, 0, 2*Math.PI);
    // ctx.stroke()

    moveWorm();
    drawWorm();
    const head = worm[0];
    console.log(pizza.x, pizza.y)
    console.log(worm[0].x, worm[0].y)
    if (head.x * 10 === pizza.x && head.y * 10 === pizza.y) {
        score += 10
        scoreEl.innerHTML = score
        worm.push({ x: head.x, y: head.y })
        pizzaLocation();
        gameSpeed += 0.5;
    }

    setTimeout(gameLoop, 200 / gameSpeed);
}

document.addEventListener('keydown', function (event) {
    const key = event.keyCode;

    if (key === 37 && direction !== 'right') direction = 'left';
    if (key === 38 && direction !== 'down') direction = 'up';
    if (key === 39 && direction !== 'left') direction = 'right';
    if (key === 40 && direction !== 'up') direction = 'down';
});
// 버튼을 눌러서 지렁이 제어 코드
upBtn.addEventListener("click", () => {
    if (direction !== 'down')
        direction = 'up'
});

downBtn.addEventListener("click", () => {
    if (direction !== 'up')
        direction = 'down'
})

leftBtn.addEventListener("click", () => {
    if (direction !== 'right')
        direction = 'left'
})

rightBtn.addEventListener("click", () => {
    if (direction !== 'left')
        direction = 'right'
})

startBtn.addEventListener("click", () => {
    gameLoop();
})

function resetGame() {
    worm = [{ x: 20, y: 20 }];
    direction = "right";
    pizza = { x: 100, y: 100 };
    score = 0;
    scoreEl.innerHTML = score;
    gameSpeed = 2;
    console.log(gameSpeed)
}
