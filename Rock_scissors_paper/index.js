const btnWrap = document.querySelector(".btn-wrap");
btnWrap.addEventListener("click", user);
const btnWrap2 = document.querySelectorAll(".btn-wrap button"); // 개별 클릭버튼

let countNum = 10; // 남은기회 숫자
let playerNum = 0; //플레이어가 이긴숫자
let comNum = 0; //컴퓨터가 이긴숫자
let userNum = 0; // 컴퓨터가 낼 랜덤 숫자저장
let count = document.querySelector("#count");

// //리셋 함수
const resetBtn = document.querySelector("#btn-reset");
resetBtn.addEventListener("click", resetBtnFunc);

function resetBtnFunc() {
  countNum = 10; // 남은기회 숫자
  playerNum = 0; //플레이어가 이긴숫자
  comNum = 0; //컴퓨터가 이긴숫자
  userNum = 0; // 컴퓨터가 낼 랜덤 숫자저장
  count.textContent = countNum;
  winLose(() => {});
  btnWrap2.forEach((item) => {
    item.disabled = false;
    item.classList.remove("off");
    resetBtn.classList.remove("active");
  });
  const picture = (document.querySelector(".picture").innerHTML = `
  <img src="./img/move.gif" alt="" />
  <img src="./img/move.gif" alt="" />
  `);
}

// 유저가 낼 가위바위 보
function user() {
  const randomNum = comRandom();

  const eventBtn = event.target;
  const picture = document.querySelector(".picture");
  if (eventBtn.id === "button-left") {
    userNum = 1;
    picture.innerHTML = `
    <img src="./img/img${userNum}.png" alt="" />
    <img src="./img/img${randomNum}.png" alt="" />
    `;

    // 이기거나,지거나,비기거나 경우의수
    winLose(() => {
      if (userNum === randomNum) {
        console.log("비김");
      } else if (userNum < randomNum && randomNum === 3) {
        playerNum++;
      } else {
        comNum++;
      }
    });
  } else if (eventBtn.id === "button-middle") {
    userNum = 2;
    picture.innerHTML = `
    <img src="./img/img${userNum}.png" alt="" />
    <img src="./img/img${randomNum}.png" alt="" />
    `;

    // 이기거나,지거나,비기거나 경우의수
    winLose(() => {
      if (userNum === randomNum) {
        console.log("비김");
      } else if (userNum < randomNum && randomNum === 3) {
        comNum++;
      } else {
        playerNum++;
      }
    });
  } else {
    userNum = 3;
    picture.innerHTML = `
    <img src="./img/img${userNum}.png" alt="" />
    <img src="./img/img${randomNum}.png" alt="" />
    `;

    // 이기거나,지거나,비기거나 경우의수
    winLose(() => {
      if (userNum === randomNum) {
        console.log("비김");
      } else if (userNum > randomNum && randomNum === 1) {
        comNum++;
      } else {
        playerNum++;
      }
    });
  }
  countTop(eventBtn);
}

// 컴퓨터가 낼 랜덤 숫자
function comRandom() {
  const random = parseInt(Math.random() * 3 + 1);
  return random;
}

//승,패를 알 수 있는 함수
function winLose(fuc) {
  const countWrap = document.querySelector(".count-wrap");
  const playerCount = countWrap.querySelector("#player-score");
  const comCount = countWrap.querySelector("#com-score");
  fuc();
  playerCount.textContent = playerNum;
  comCount.textContent = comNum;
}

//카운트 함수
function countTop(value) {
  if (value) {
    countNum--;
    count.textContent = countNum;
    if (countNum === 0) {
      const winner =
        playerNum === comNum
          ? "비김"
          : playerNum > comNum
          ? "Player 승!"
          : "Com 승!";
      btnWrap2.forEach((item) => {
        item.disabled = true;
        item.classList.add("off");
      });

      resetBtn.classList.add("active"); //깜빡이는 애니메이션

      // resetBtnFunc();
      setTimeout(() => {
        alert(winner);
      }, 1000);
    }
  }
}
