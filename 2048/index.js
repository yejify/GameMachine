const board = document.querySelector(".game-container");
const cells = [];
const numArr = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let score = 0;
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    const cell = document.createElement("div");
    cell.classList.add("tile");
    cells.push(cell);
    board.appendChild(cell);
  }
}

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
}

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
    cells[i].innerHTML = numArr[i] != 0 ? numArr[i] : "";
    const classList = Array.from(cells[i].classList);
    if (numArr[i] !== 0) {
      cells[i].classList.add(`tile-${numArr[i]}`);
    } else if (numArr[i] == 0) {
      cells[i].innerHTML = "";
      classList.forEach((cls) => {
        if (cls !== "tile") {
          cells[i].classList.remove(cls);
        }
      });
    }
    console.log(classList);
    if (classList.length > 2) {
      /**
       * ! tile과 타일의 숫자와 해당하는 tile-num 을 제외하고 삭제하기
       */
      for (let i = 2; i < classList.length; i++) {
        cells[i].classList.remove(classList[i]);
      }
    }
  }
}
//   const tiles = document.querySelectorAll(".tile");
//   const tile = tiles[Math.floor(Math.random() * 16)];
//   // tile 클래스 이외에 다른 클래스가 있는지 검사
//   const hasOtherClasses = [...tile.classList].some((cls) => cls !== "tile");
//   // const randomCell = cells[randomNumber];
//   // 해당 셀에 이미 타일 있다면 (.tile 이외의 클래스를 가진 타일이라면)
//   if (hasOtherClasses) {
//     return randomTile(); // 다른 타일 선택
//   } else {
//     // const randomNumber2 = Math.random() < 0.9 ? 2 : 4;
//     tile.classList.add(`tile-${randomNumber2}`);
//     tile.textContent = randomNumber2;
//     // randomCell.appendChild(tile);
//   }
// }

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
      console.log("종료인지 체크하기");
    }
  } else if (direction === "down") {
    for (let i = 11; i > 7; i--) {
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
      console.log("종료 체크");
    }
  } else if (direction === "left") {
    for (let i = 13; i > 0; i -= 4) {
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
      console.log("종료 확인");
    }
  } else if (direction === "right") {
    for (let i = 14; i > 0; i -= 4) {
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
      console.log("종료 확인");
    }
  }
};
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
