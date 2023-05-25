const container = document.querySelector(".container");
const btnStart = document.querySelector(".btn-start");
const timeValue = document.querySelector(".timer");

const modalContainer = document.querySelector(".modal-container");
const modalContents = modalContainer.querySelector(".modal-content");
const modalYes = modalContainer.querySelector(".modal-yes");
const modalNo = modalContainer.querySelector(".modal-no");

const winerModal = document.querySelector(".modal-winer-container");
const winerTime = winerModal.querySelector(".modal-winer-container h3");
const winerAgain = winerModal.querySelector(".modal-again");
const modalClose = winerModal.querySelector(".modal-close");

const images = [
  "alpaca.png",
  "cat.png",
  "dog.png",
  "flamingo.png",
  "flog.png",
  "lion.png",
  "owl.png",
  "parrot.png",
  "seaDog.png",
  "whale.png",
];

class Time {
  constructor() {
    this.startTime = null;
    this.timeSet = document.querySelector(".timer");
    this.timerId = null;
  }

  start() {
    this.startTime = Date.now(); // 시작 시간
    this.timerId = setInterval(() => {
      const elapsedTime = Date.now() - this.startTime; // 경과 시간

      const seconds = Math.floor((elapsedTime / 1000) % 60);
      const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
      const hours = Math.floor((elapsedTime / 1000 / 60 / 60) % 60);

      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");
      const formattedHours = hours.toString().padStart(2, "0");

      this.timeSet.innerText = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }, 1000); // 1초마다 업데이트
  }

  stop() {
    clearInterval(this.timerId);
  }
}

class CheckPair {
  constructor() {
    this.matchedPairs = 0;
    this.currentCard = null;
    this.currentCardId = null;
  }

  checkPair(card, id) {
    if (this.currentCard === card) {
      this.currentCard = null;
      return 1;
    } else {
      this.currentCard = null;
      return [-1, id];
    }
  }

  setMatchedPairs() {
    this.matchedPairs++;
  }

  isGameCompleted() {
    console.log(this.matchedPairs, images.length)
    return this.matchedPairs === images.length;
  }

  setCurrentCard(card, id) {
    this.currentCard = card;
    this.currentCardId = id;
  }

  clearCurrentCard() {
    this.currentCard = null;
    this.currentCardId = null;
  }
}

function shuffle(array) {
  // return [...array, ...array].sort(() => Math.random() - 0.5);
  return [...array, ...array].sort();
}

function createCardItem() {
  const cardItemArr = shuffle(images).map((item) => {
    const cardItem = document.createElement("li");
    cardItem.classList.add("card-item");

    const front = document.createElement("div");
    front.classList.add("card", "front");
    front.innerHTML = `<img src='../assets/card1.png' alt="">`;

    const back = document.createElement("div");
    back.classList.add("card", "back");
    back.dataset.item = item;
    back.innerHTML = `<img src="../assets/${item}" alt="">`;

    cardItem.appendChild(front);
    cardItem.appendChild(back);

    return cardItem;
  });

  container.innerHTML = "";
  container.append(...cardItemArr);
}


function flipCardForward(front, back) {
  front.style.transform = "rotateY(180deg)";
  back.style.transform = "rotateY(0deg)";
}

function flipCardBackward(front, back) {
  front.style.transform = "rotateY(0deg)";
  back.style.transform = "rotateY(180deg)";
}

function reverseAll(front, back) {
  for (let i = 0; i < front.length; i++)
    flipCardForward(front[i], back[i]);

  setTimeout(() => {
    for (let i = 0; i < front.length; i++)
      flipCardBackward(front[i], back[i]);
  }, 2000);
}

function reverse(front, back, matcher, time) {
  let isClickable = true; // 클릭 가능한 상태인지 여부를 저장하는 변수

  for (let i = 0; i < front.length; i++) {
    front[i].addEventListener("click", () => {
      if (!isClickable) return; // 클릭 불가능한 상태라면 함수 종료
        flipCardForward(front[i], back[i]);
      if (matcher.currentCard === null) {
        matcher.setCurrentCard(back[i].dataset.item, i);
      } else  {
        if (matcher.checkPair(back[i].dataset.item) === 1) {
          console.log("correct");
          matcher.setMatchedPairs();
          if (matcher.isGameCompleted()) {
            time.stop();
            winerModal.style.display = "flex";
            winerTime.textContent = timeValue.textContent;
          }
        } else {
          isClickable = false; // 클릭 불가능한 상태로 변경
          setTimeout(() => {
            flipCardBackward(front[i], back[i]);
            flipCardBackward(front[matcher.currentCardId], back[matcher.currentCardId]);

            matcher.clearCurrentCard();

            isClickable = true; // 클릭 가능한 상태로 변경
          }, 1500);
        }
      }
    });
  }
}

function startGame(checkPair, time) {
  const front = document.querySelectorAll(".card-item .front");
  const back = document.querySelectorAll(".card-item .back");

  reverseAll(front, back);
  reverse(front, back, checkPair, time);
}

btnStart.addEventListener("click", (e) => {
  const checkPair = new CheckPair();
  const time = new Time();

  if (e.target.textContent === "start") {
    startGame(checkPair, time);
    setTimeout(() => {
      time.start();
    }, 2000);

    btnStart.textContent = "GIVE UP";
  } else {
    modalContainer.style.display = "flex";
  }
});

modalYes.addEventListener("click", () => {
  location.reload();
});

modalNo.addEventListener("click", () => {
  modalContainer.style.display = "none";
});

winerAgain.addEventListener('click', () => {
  winerModal.style.display = "none";
  createCardItem();
  btnStart.click();
});

modalClose.addEventListener('click', () => {
  winerModal.style.display = "none";
});

(function App() {
  createCardItem();
})();
