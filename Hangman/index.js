// 1. 반복문으로 화면에 알파벳 버튼 만들어주기
// 2. 리스트에 랜덤으로 선택된 단어 길이에 따라 화면에 빈칸 생성
//  2-1 단어 리스트 만들기
//  2-2 리스트에 있는 단어가 랜덤으로 선택되게하기
//  2-3 랜덤으로 선택된 단어 길이에 따라 화면에 빈칸 만들어주기
// 3. 알파벳 버튼을 눌렀을 때 단어 속에 있을 경우 빈칸에 알파벳 표시
//  3-1 한번 선택했던 버튼은 더 이상 못 누르게 처리하기
//  3-2 버튼 속 알파벳과 단어 속 알파벳과 같은 것이 있는 지 비교하기
//  3-3 같은 것이 있으면 빈칸에 표시
//  3-4 같은 것이 없으면 목숨 하나 차감
// 4. 목숨 한개씩 차감될 때마다 행맨 그려짐
//  4-1

window.onload = function () {
  // 알파벳 리스트 + 버튼
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  myButtons = document.querySelector(".buttons");

  for (let i = 0; i < alphabet.length; i++) {
    button = document.createElement("button");
    button.innerHTML = alphabet[i];
    myButtons.appendChild(button);
  }
  // 알파벳 버튼

  // 랜덤 단어 리스트 + 빈칸 생성
  let wordList = [
    "LION",
    "COFFEE",
    "APPLE",
    "MOUSE",
    "PHONE",
    "MACBOOK",
    "GALAXY",
  ];
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(randomWord);
  for (let i = 0; i < randomWord.length; i++) {
    const result = document.querySelector(".result");

    const resultLi = document.createElement("li");
    result.appendChild(resultLi);
  }
  // 랜덤 단어 리스트 + 빈칸 생성

  // 버튼과 랜덤 단어 알파벳 비교
  // 버튼을 눌렀을 때 실행되야하니 이벤트리스너 사용
  button.addEventListener("click", function (e) {
    this.className = "checked";
    //   this.setAttribute("disabled", "disabled");
  });
  // 버튼과 랜덤 단어 알파벳 비교
};
