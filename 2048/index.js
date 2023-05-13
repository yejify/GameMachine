const board = document.querySelector(".game-container");
const cells = [];
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    const cell = document.createElement("div");
    cell.classList.add("tile");
    cells.push(cell);
    board.appendChild(cell);
  }
}
console.log(cells);
// 타일 생성
function randomTile() {
  const tile = document.querySelector(".tile");
  // tile 클래스 이외에 다른 클래스가 있는지 검사
  const hasOtherClasses = [...tile.classList].some((cls) => cls !== "tile");
  const randomNumber = Math.floor(Math.random() * 16);
  const randomCell = cells[randomNumber];
  // 해당 셀에 이미 타일 있다면
  if (hasOtherClasses) {
    return randomTile();
  } else {
    const randomNumber2 = Math.random() < 0.9 ? 2 : 4;
    tile.classList.add("tile", `tile-${randomNumber2}`);
    tile.textContent = randomNumber2;
    randomCell.appendChild(tile);
  }
}

// 게임 시작
randomTile();
randomTile();

// 타일 이동
const moveTile = (direction) => {
  const tileElements = document.querySelectorAll(".tile");

  // 위로 이동
  if (direction === "up") {
    for (let i = 4; i < tileElements.length; i++) {
      const tile = tileElements[i];
      const topTile = tileElements[i - 4];
      if (!topTile) continue;

      if (!topTile.classList.contains("tile")) {
        topTile.appendChild(tile);
        i -= 5;
      } else if (topTile.classList.contains(tile.classList[1])) {
        topTile.classList.remove(tile.classList[1]);
        const tileValue = parseInt(topTile.classList[1]);
        const newValue = tileValue * 2;
        topTile.classList.add(`tile-${newValue}`);
        tile.remove();
      }
    }
  }

  // 아래로 이동
  if (direction === "down") {
    for (let i = tileElements.length - 5; i >= 0; i--) {
      const tile = tileElements[i];
      const bottomTile = tileElements[i + 4];
      if (!bottomTile) continue;

      if (!bottomTile.classList.contains("tile")) {
        bottomTile.appendChild(tile);
        i += 5;
      } else if (bottomTile.classList.contains(tile.classList[1])) {
        bottomTile.classList.remove(tile.classList[1]);
        const tileValue = parseInt(bottomTile.classList[1]);
        const newValue = tileValue * 2;
        bottomTile.classList.add(`tile-${newValue}`);
        tile.remove();
      }
    }
    // 왼쪽으로 이동
    if (direction === "left") {
      for (let i = 1; i < tileElements.length; i++) {
        const tile = tileElements[i];
        const leftTile = tileElements[i - 1];
        if (i % 4 === 0) continue;

        if (!leftTile.classList.contains("tile")) {
          leftTile.appendChild(tile);
          i -= 2;
        } else if (leftTile.classList.contains(tile.classList[1])) {
          leftTile.classList.remove(tile.classList[1]);
          const tileValue = parseInt(leftTile.classList[1]);
          const newValue = tileValue * 2;
          leftTile.classList.add(`tile-${newValue}`);
          tile.remove();
        }
      }
      // 오른쪽으로 이동
      if (direction === "right") {
        for (let i = tileElements.length - 2; i >= 0; i--) {
          const tile = tileElements[i];
          const rightTile = tileElements[i + 1];
          if ((i + 1) % 4 === 0) continue;

          if (!rightTile.classList.contains("tile")) {
            rightTile.appendChild(tile);
            i += 2;
          } else if (rightTile.classList.contains(tile.classList[1])) {
            rightTile.classList.remove(tile.classList[1]);
            const tileValue = parseInt(rightTile.classList[1]);
            const newValue = tileValue * 2;
            rightTile.classList.add(`tile-${newValue}`);
            tile.remove();
          }
        }
      }

      randomTile();
    }

    // 이동 방향
    document.addEventListener("keydown", (event) => {
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

    // 게임 종료 체크
    const checkGameOver = () => {
      const tileElements = document.querySelectorAll(".tile");

      for (let i = 0; i < tileElements.length; i++) {
        const tile = tileElements[i];
        if (
          tile.classList.contains("tile-2048") ||
          (i % 4 !== 3 &&
            tile.classList.contains(tileElements[i + 1].classList[1])) ||
          (i < 12 && tile.classList.contains(tileElements[i + 4].classList[1]))
        ) {
          return false;
        }
      }

      return true;
    };

    // 게임 종료
    const endGame = () => {
      alert("게임 종료!");
    };

    // 게임 상태 체크
    setInterval(() => {
      if (checkGameOver()) {
        endGame();
      }
    }, 1000);
  }
};
