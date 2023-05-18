// O, X 선택
let suePlayer = '';
let sueComputer = '';

window.onload = function () {
    let oButton = document.querySelector('.sue-main-o');
    let xButton = document.querySelector('.sue-main-x');

    let sueHomeScreen = document.querySelector('#sue-home-screen');
    let sueGameScreen = document.querySelector('#sue-game-screen');

    oButton.addEventListener('click', function() {
        suePlayer = 'O';
        sueComputer = 'X';

        sueHomeScreen.style.display = 'none';
        sueGameScreen.style.display = 'block';

        sueStartGame();
    })

    xButton.addEventListener('click', function() {
        suePlayer = 'X';
        sueComputer = 'O';

        sueHomeScreen.style.display = 'none';
        sueGameScreen.style.display = 'block';

        sueStartGame();
    })
}

// 게임 화면
const sueCells = document.querySelectorAll('.sue-cell');
let sueStartCells = ["", "", "", "", "", "", "", "", ""];
let sueCurrentPlayer = "O"; // O를 선택하면 항상 게임 먼저 시작하기 
let sueRunning = false;
let sueGameEnded = false;

// 셀 선택시 
function cellClickHandler() {
    if (!sueRunning || sueGameEnded) return;

    const cell = this;
    const index = parseInt(cell.dataset.cellIndex);

    if (sueStartCells[index] === "") {
        sueStartCells[index] = sueCurrentPlayer;
        cell.textContent = sueCurrentPlayer;

        if (sueGameWin()) {
            sueGameEnded = true;
            sueCells.forEach(cell => {
                cell.removeEventListener('click', cellClickHandler);
            });
            return;
        }

        sueCurrentPlayer = sueCurrentPlayer === "O" ? "X" : "O";
    }
}

// 이긴 사람 확인하기
const sueGameWin = () => {
    const sueWinConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 가로
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 세로
        [0, 4, 8], [2, 4, 6] // 대각선
    ];

    // 게임에서 이겼을 경우
    for (const condition of sueWinConditions) {
        const [a, b, c] = condition;
        if (
            sueStartCells[a] !== "" &&
            sueStartCells[a] === sueStartCells[b] &&
            sueStartCells[a] === sueStartCells[c]
        ) {
            return true; // 둘 중 한 명이라도 게임에서 이겼을 경우
        }
    }
    return false; // 아무도 게임에서 이기지 않았을 경우
}

function sueStartGame() {
    sueStartCells = ["", "", "", "", "", "", "", "", ""];
    sueCurrentPlayer = "O";
    sueRunning = true;
    sueGameEnded = false;
    console.log("Current player: " + sueCurrentPlayer);

    sueCells.forEach(cell => {
        cell.addEventListener('click', cellClickHandler);
    });
}

