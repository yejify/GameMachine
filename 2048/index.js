const board = document.querySelector(".game-container");
const cells = [];
const numArr = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
const gameOverBox = document.querySelector(".gameOverBox");
let score = 0;
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    const cell = document.createElement("div");
    cell.classList.add("tile");
    cells.push(cell);
    board.appendChild(cell);
  }
}
// 새게임 버튼
const newGameBtn = document.querySelector(".btn-new");
newGameBtn.addEventListener("click", () => {
  gameInit();
});
// 게임 오버 후 새게임 버튼
const restartBtn = document.querySelector(".gameOverBox button");
restartBtn.addEventListener("click", () => {
  gameOverBox.style.visibility = "hidden";
  gameInit();
});
// 게임 초기화
function gameInit() {
  for (let i = 0; i < 16; i++) {
    cells[i].textContent = "";
    numArr[i] = 0;
  }
  const score = document.querySelector(".now .score-value");
  score.textContent = 0;
  randomTile();
  randomTile();
  setBestScore();
}
// 게임 종료 시 현재 점수를 보여주는 함수
// 타일 생성
function randomTile() {
  let createTile = false;
  const randomNumber2 = Math.random() < 0.9 ? 2 : 4;
  while (createTile == false) {
    let randomNum = Math.floor(Math.random() * 16);
    if (numArr[randomNum] == 0) {
      numArr[randomNum] = randomNumber2;
      createTile = true;
    }
  }
  setTile();
}
// 화면에 반영
function setTile() {
  for (let i = 0; i < 16; i++) {
    // numArr를 cells에 반영
    cells[i].innerHTML = numArr[i] != 0 ? numArr[i] : "";
    const cellClassList = Array.from(cells[i].classList);
    // cells에 클래스 추가
    if (numArr[i] !== 0) {
      cells[i].classList.add(`tile-${numArr[i]}`);
    } else if (numArr[i] == 0) {
      cells[i].innerHTML = "";
      cellClassList.forEach((cls) => {
        if (cls !== "tile") {
          cells[i].classList.remove(cls);
        }
      });
    }
    // 셀의 클래스리스트의 길이가 3 이상인 경우, 필요없는 클래스 삭제
    if (cellClassList.length > 2) {
      for (let k = 1; k < cellClassList.length - 1; k++) {
        cells[i].classList.remove(cellClassList[k]);
      }
    }
  }
}
// 현재 점수
function setScore(score) {
  const scoreNow = document.querySelector(".now .score-value");
  scoreNow.textContent = score;
}
// 최고 점수
function setBestScore(score) {
  const scoreBest = document.querySelector(".best .score-value");
  let scoreBestVal = localStorage["bestScore"];
  scoreBest.textContent = scoreBestVal;
}
// 게임 시작
gameInit();

// 키보드 이벤트
document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === "ArrowUp") {
    moveTile("up");
  } else if (event.key === "ArrowDown") {
    moveTile("down");
  } else if (event.key === "ArrowLeft") {
    moveTile("left");
  } else if (event.key === "ArrowRight") {
    moveTile("right");
  }
});
// 타일 이동
const moveTile = (direction) => {
  let isMoved = false;
  let access = false;
  let k;
  if (direction === "up") {
    for (let i = 7; i > 3; i--) {
      access = false;
      for (let j = i; j < i + 9; j += 4) {
        if (numArr[j] !== 0) {
          k = j;
          while (k >= i && (numArr[k - 4] == numArr[k] || numArr[k - 4] == 0)) {
            if (numArr[k - 4] == numArr[k] && access == false) {
              numArr[k - 4] += numArr[k];
              numArr[k] = 0;
              isMoved = true;
              access = true;
              score += numArr[k - 4];
              setScore(score);
            } else if (numArr[k - 4] == numArr[k] && access == true) {
              access == false;
            } else if (numArr[k - 4] == 0) {
              numArr[k - 4] = numArr[k];
              numArr[k] = 0;
              isMoved = true;
            }
            k -= 4;
          }
        }
      }
    }
    setTile();
    if (isMoved) {
      randomTile();
    } else {
      checkCanMoveTiles() === false ? gameOver(score) : null;
    }
  } else if (direction === "down") {
    for (let i = 11; i > 7; i--) {
      access = false;
      for (let j = i; j >= 0; j -= 4) {
        if (numArr[j] != 0) {
          k = j;
          while (k < 12 && (numArr[k + 4] == numArr[k] || numArr[k + 4] == 0)) {
            if (numArr[k + 4] == numArr[k] && access == false) {
              numArr[k + 4] += numArr[k];
              numArr[k] = 0;
              isMoved = true;
              access = true;
              score += numArr[k + 4];
              setScore(score);
            } else if (numArr[k + 4] == numArr[k] && access == true) {
              access == false;
            } else if (numArr[k + 4] == 0) {
              numArr[k + 4] = numArr[k];
              numArr[k] = 0;
              isMoved = true;
            }
            k += 4;
          }
        }
      }
    }
    setTile();
    if (isMoved) {
      randomTile();
    } else {
      checkCanMoveTiles() === false ? gameOver(score) : null;
    }
  } else if (direction === "left") {
    for (let i = 13; i > 0; i -= 4) {
      access = false;
      for (let j = i; j <= i + 2; j++) {
        if (numArr[j] != 0) {
          k = j;
          while (
            k > i - (i % 4) &&
            (numArr[k - 1] == numArr[k] || numArr[k - 1] == 0)
          ) {
            if (numArr[k - 1] == numArr[k] && access == false) {
              numArr[k - 1] += numArr[k];
              numArr[k] = 0;
              isMoved = true;
              access = true;
              score += numArr[k - 1];
              setScore(score);
            } else if (numArr[k - 1] == numArr[k] && access == true) {
              access == false;
            } else if (numArr[k - 1] == 0) {
              numArr[k - 1] = numArr[k];
              numArr[k] = 0;
              isMoved = true;
            }
            k--;
          }
        }
      }
    }
    setTile();
    if (isMoved) {
      randomTile();
    } else {
      checkCanMoveTiles() === false ? gameOver(score) : null;
    }
  } else if (direction === "right") {
    for (let i = 14; i > 0; i -= 4) {
      access = false;
      for (let j = i; j >= i - 2; j--) {
        if (numArr[j] != 0) {
          k = j;
          while (
            k < i + 1 &&
            (numArr[k + 1] == numArr[k] || numArr[k + 1] == 0)
          ) {
            if (numArr[k + 1] == numArr[k] && access == false) {
              numArr[k + 1] += numArr[k];
              numArr[k] = 0;
              isMoved = true;
              access = true;
              score += numArr[k + 1];
              setScore(score);
            } else if (numArr[k + 1] == numArr[k] && access == true) {
              access == false;
            } else if (numArr[k + 1] == 0) {
              numArr[k + 1] = numArr[k];
              numArr[k] = 0;
              isMoved = true;
            }
            k++;
          }
        }
      }
    }
    setTile();
    if (isMoved) {
      randomTile();
    } else {
      checkCanMoveTiles() === false ? gameOver(score) : null;
    }
  }
  // 현재 점수 > 베스트 점수, 현재 점수를 베스트 점수에 반영
  if (document.querySelector(".best .score-value").textContent < score) {
    localStorage.setItem("bestScore", score);
    setBestScore(score);
  }
};
// 인접한 타일 확인하기
function getAdjacentTiles(index) {
  const adjacentTiles = [];

  const topIndex = index - 4;
  const bottomIndex = index + 4;
  const leftIndex = index % 4 === 0 ? -1 : index - 1;
  const rightIndex = (index + 1) % 4 === 0 ? -1 : index + 1;

  if (topIndex >= 0) {
    adjacentTiles.push(numArr[topIndex]);
  }
  if (bottomIndex < numArr.length) {
    adjacentTiles.push(numArr[bottomIndex]);
  }
  if (leftIndex >= 0) {
    adjacentTiles.push(numArr[leftIndex]);
  }
  if (rightIndex < numArr.length) {
    adjacentTiles.push(numArr[rightIndex]);
  }

  return adjacentTiles;
}
function checkCanMoveTiles() {
  for (let i = 0; i < numArr.length; i++) {
    const currentTile = numArr[i];

    // 현재 타일이 비어있는 경우 스킵
    if (currentTile === 0) {
      continue;
    }

    // 상하좌우에 인접한 타일 확인
    const adjacentTiles = getAdjacentTiles(i);

    // 이동 가능한 타일이 있는지 확인
    for (const adjacentTile of adjacentTiles) {
      if (adjacentTile === 0 || adjacentTile === currentTile) {
        return true; // 이동 가능한 타일이 있음
      }
    }
  }

  return false; // 이동 가능한 타일이 없음
}

function gameOver(score) {
  const gameOverScore = document.querySelector(".gameOver-bestScore");
  gameOverScore.textContent = score;
  gameOverBox.style.visibility = "inherit";
}
