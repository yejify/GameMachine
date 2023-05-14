// //랜덤 숫자
// console.log(Math.floor(Math.random() * 8))

// //랜덤으로 li 선택
// const liList = document.querySelectorAll("li");
// liList.item(Math.floor(Math.random() * 8))

// //이미지 넣기
// const img = document.createElement("img");
// const mole = liList.item(Math.floor(Math.random() * 8)).appendChild(img)
// mole.setAttribute("id","mole");
// mole.setAttribute("src","../assets/mole.PNG");

//랜덤으로 두더지 나오는 함수
function randomCreateMole(){
    const liList = document.querySelectorAll("li");
    const img = document.createElement("img");
    const mole = liList.item(Math.floor(Math.random() * 9)).appendChild(img)
    mole.setAttribute("id","mole");
    mole.setAttribute("src","../assets/mole.PNG");
}

//두더지 제거 함수
function removeMole(){
    const dieMole = document.getElementById('mole');
    dieMole.remove();
}

//점수
let score = 0;
let clickCount = 0;

//start 버튼 클릭 이벤트에 두더지 함수 실행
function startBtnClick(){
    randomCreateMole();

    const startBtn = document.querySelector("#startBtn");
    startBtn.classList.add("a11y-hidden");

    //이미지에 커서 포인터 css적용
    const selectImg = document.querySelectorAll("img");
    //위 이미지 각각에 전부 class 줘야 하는데 뭘 써야 하더라..

}

//게임 스타트 버튼 클릭 이벤트
document.getElementById("startBtn").addEventListener("click", startBtnClick);

//두더지 클릭하면 사라짐, 새로운 두더지 등장
function catchMole(e){
    //클릭한 요소 가져오기
    const clickTaget = e.target.getAttribute("id");

    //클릭 감지, 10번이면 결과페이지로 넘어가기
    if(clickCount === 10){
        const ground = document.querySelector('#ground');
        const gameResult = document.querySelector('#gameResult');
        ground.classList.add("a11y-hidden");
        gameResult.classList.remove("a11y-hidden");

        //score 보여주기
        const resultScore = document.querySelector('#resultScore');
        resultScore.textContent=score*10;

    };
    clickCount++

    //li에 두더지 이미지 있는지 확인
    if(clickTaget === 'mole'){
    //있으면 점수 +1
    score++
    //현재 두더지 이미지 삭제
    removeMole()
    //3초뒤 랜덤으로 두더지 생성
    randomCreateMole()
    }else{
    //현재 두더지 이미지 삭제
    removeMole()
    //3초뒤 랜덤으로 두더지 생성
    randomCreateMole()
    }
}

function reloadGame(){
    location.reload();
}


//두더지 잡기 클릭이벤트
document.querySelector("ul").addEventListener("click", catchMole);

//restart 버튼 클릭이벤트
document.querySelector("#restartBtn").addEventListener("click", reloadGame);

//home 버튼 클릭이벤트
document.querySelector("#homeBtn").addEventListener("click", );
