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
function setScore(score) {
  const scoreNow = document.querySelector(".now .score-value");
  scoreNow.textContent = score;
}

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
    moveTile2("up");
  } else if (event.key === "ArrowDown") {
    moveTile2("down");
  } else if (event.key === "ArrowLeft") {
    moveTile2("left");
  } else if (event.key === "ArrowRight") {
    moveTile2("right");
  }
});
// 타일 이동(새로 짜는중)
const moveTile2 = (direction) => {
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
      checkCanMoveTiles() === false ? gameOver() : null;
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
      checkCanMoveTiles() === false ? gameOver() : null;
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
      checkCanMoveTiles() === false ? gameOver() : null;
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
      checkCanMoveTiles() === false ? gameOver() : null;
    }
  }
  // 베스트 점수 반영
  localStorage.setItem("bestScore", score);
  // 현재 점수가 베스트 점수보다 크다면 현재 점수를 베스트 점수에 반영
  if (document.querySelector(".best .score-value").textContent < score) {
    setBestScore(score);
  }
};
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

function gameOver() {
  gameOverBox.style.visibility = "inherit";
}
// 타일 이동(구버전)
// const moveTile = (direction) => {
//   const tileElements = document.querySelectorAll(".tile");
//   // console.log(tileElements);
//   // 위로 이동
//   if (direction === "up") {
//     console.log("실행됨");
//     for (let i = 4; i < tileElements.length; i++) {
//       const tile = tileElements[i];
//       const topTile = tileElements[i - 4];
//       const topTilehasOtherClasses = [...topTile.classList].some(
//         (cls) => cls !== "tile"
//       );
//       const tilehasOtherClasses = [...tile.classList].some(
//         (cls) => cls !== "tile"
//       );
//       // topTile과 tile이 같은 숫자인 경우 합쳐줌
//       if (topTile.classList.contains(tile.classList[1])) {
//         console.log("합쳐짐");
//         const tileValue = topTile.classList[1].replace(/\D/g, "");
//         const newValue = tileValue * 2;
//         topTile.classList.remove(tile.classList[1]);
//         topTile.classList.add(`tile-${newValue}`);
//         topTile.textContent = `${newValue}`;
//         tile.classList.remove(tile.classList[1]);
//         tile.textContent = "";
//         scoreCnt += newValue;
//         scoreNow(scoreCnt);
//       }
//       // topTile이 빈타일인경우
//       if (!topTilehasOtherClasses) {
//         console.log("빈타일이였음");
//         topTile.textContent = tile.textContent;
//         topTile.classList.remove(topTile.classList[1]);
//         if (tilehasOtherClasses) {
//           topTile.classList.add(tile.classList[1]);
//         }
//         tile.textContent = "";
//         tile.classList.remove(tile.classList[1]);
//         // i -= 5;
//       }
//     }
//   }

//   // 아래로 이동
//   if (direction === "down") {
//     for (let i = tileElements.length - 5; i >= 0; i--) {
//       const tile = tileElements[i];
//       const bottomTile = tileElements[i + 4];
//       if (!bottomTile) continue;

//       if (!bottomTile.classList.contains("tile")) {
//         bottomTile.appendChild(tile);
//         i += 5;
//       } else if (bottomTile.classList.contains(tile.classList[1])) {
//         const tileValue = bottomTile.classList[1].replace(/\D/g, "");
//         const newValue = tileValue * 2;
//         bottomTile.classList.remove(tile.classList[1]);
//         bottomTile.classList.add(`tile-${newValue}`);
//         bottomTile.textContent = `${newValue}`;
//         tile.classList.remove(tile.classList[1]);
//         tile.textContent = "";
//       }
//     }
//   }
//   // 왼쪽으로 이동
//   if (direction === "left") {
//     for (let i = 1; i < tileElements.length; i++) {
//       const tile = tileElements[i];
//       const leftTile = tileElements[i - 1];
//       if (i % 4 === 0) continue;

//       if (!leftTile.classList.contains("tile")) {
//         leftTile.appendChild(tile);
//         i -= 2;
//       } else if (leftTile.classList.contains(tile.classList[1])) {
//         leftTile.classList.remove(tile.classList[1]);
//         const tileValue = leftTile.classList[1].replace(/\D/g, "");
//         const newValue = tileValue * 2;
//         leftTile.classList.add(`tile-${newValue}`);
//         tile.remove();
//       }
//     }
//   }
//   // 오른쪽으로 이동
//   if (direction === "right") {
//     for (let i = tileElements.length - 2; i >= 0; i--) {
//       const tile = tileElements[i];
//       const rightTile = tileElements[i + 1];
//       if ((i + 1) % 4 === 0) continue;

//       if (!rightTile.classList.contains("tile")) {
//         rightTile.appendChild(tile);
//         i += 2;
//       } else if (rightTile.classList.contains(tile.classList[1])) {
//         rightTile.classList.remove(tile.classList[1]);
//         const tileValue = rightTile.classList[1].replace(/\D/g, "");
//         const newValue = tileValue * 2;
//         rightTile.classList.add(`tile-${newValue}`);
//         tile.remove();
//       }
//     }
//   }

//   //     // 게임 종료 체크
//   //     const checkGameOver = () => {
//   //       const tileElements = document.querySelectorAll(".tile");

//   //       for (let i = 0; i < tileElements.length; i++) {
//   //         const tile = tileElements[i];
//   //         if (
//   //           tile.classList.contains("tile-2048") ||
//   //           (i % 4 !== 3 &&
//   //             tile.classList.contains(tileElements[i + 1].classList[1])) ||
//   //           (i < 12 && tile.classList.contains(tileElements[i + 4].classList[1]))
//   //         ) {
//   //           return false;
//   //         }
//   //       }

//   //       return true;
//   //     };

//   //     // 게임 종료
//   //     const endGame = () => {
//   //       alert("게임 종료!");
//   //     };

//   //     // 게임 상태 체크
//   //     setInterval(() => {
//   //       if (checkGameOver()) {
//   //         endGame();
//   //       }
//   //     }, 1000);
//   randomTile();
// };
// const scoreNow = (scoreCnt) => {
//   const score = document.querySelector(".now .score-value");
//   score.textContent = scoreCnt;
// };
