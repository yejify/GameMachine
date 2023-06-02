// 역할(해, 갈매기) 중 선택 
let Player = '';
let Computer = '';

const sideSun = '<img src="sun.svg" alt="sun">';
const sideSeagull = '<img src="seagull.svg" alt="seagull">';

window.onload = function () {
    let oButton = document.querySelector('.side-sun');
    let xButton = document.querySelector('.side-seagull');

    let HomeScreen = document.querySelector('#home-screen');
    let GameScreen = document.querySelector('#game-screen');

    oButton.addEventListener('click', function() {
        Player = sideSun;
        Computer = sideSeagull;

        HomeScreen.style.display = 'none';
        GameScreen.style.display = 'block';

        StartGame();
    })

    xButton.addEventListener('click', function() {
        Player = sideSeagull;
        Computer = sideSun;

        HomeScreen.style.display = 'none';
        GameScreen.style.display = 'block';

        StartGame();
    })
}

// 게임 화면
const Cells = document.querySelectorAll('.cell');
let StartCells = ["", "", "", "", "", "", "", "", ""];
let CurrentPlayer = sideSun; // 해를 선택하면 항상 게임 먼저 시작하기 
let Running = false;
let GameEnded = false;

const Turn = document.querySelector('.turn p');

function StartGame() {
    StartCells = ["", "", "", "", "", "", "", "", ""];
    CurrentPlayer = sideSun;
    Running = true;
    GameEnded = false;

    disableCellClicks();
    //컴퓨터 차례에 플레이어가 셀 선택하지 못 하게 하기

    Cells.forEach(cell => {
        cell.addEventListener('click', cellClickHandler);
    });

    // 누구 차례인지 표시
    if (CurrentPlayer === Player){
        Turn.innerHTML = 'Player\'s turn';
        enableCellClicks();
        //플레이어 차례에 플레이어가 셀 선택 가능하게 하기
    } else if (CurrentPlayer === Computer) {
        Turn.innerHTML = 'Computer\'s turn';
        setTimeout(MakeComputerMove, 1000);
    }
    
    // 누가 해고, 누가 갈매기인지 점수 위에 표시
    if (!isLabelsSet) {
        playerLabelElement.innerHTML = `${playerLabelElement.innerHTML}${Player}`;
        computerLabelElement.innerHTML = `${computerLabelElement.innerHTML}${Computer}`;
        isLabelsSet = true;
      }
}

const playerLabelElement = document.querySelector('.player span:first-child');
const computerLabelElement = document.querySelector('.computer span:first-child');
let isLabelsSet = false;

// 셀 선택시 
function cellClickHandler() {
    if (!Running || GameEnded || CurrentPlayer !== Player) return;
    //게임이 아직 진행중인지 이미 끝났는지 아니면 Player의 차례가 아닌지 체크하기

    const cell = this;
    const index = parseInt(cell.dataset.cellIndex);

    if (StartCells[index] === "") {
        StartCells[index] = Player;
        cell.innerHTML = Player;

        const winner = GameWin();
        if (winner) {
          EndGame(winner);
          return;
        }

        CurrentPlayer = Computer; // 게임 선수 교체

        // 누구 차례인지 표시
        if (CurrentPlayer === Player){
            Turn.innerHTML = 'Player\'s turn';
        } else {
            Turn.innerHTML = 'Computer\'s turn';
        }
        
        setTimeout(MakeComputerMove, 600); // 컴퓨터 차례에 자동으로 플레이하기
    }
}

// 셀클릭 이벤트 비활성화
function disableCellClicks() {
    Cells.forEach(cell => {
      cell.removeEventListener('click', cellClickHandler);
    });
  }

// 셀클릭 이벤트 활성화
  function enableCellClicks() {
    Cells.forEach(cell => {
      cell.addEventListener('click', cellClickHandler);
    });
  }

// 컴퓨터 차례에 자동으로 플레이하게 하기
const MakeComputerMove = () => {
    if (!Running || GameEnded) return;

    const emptyCells = Array.from(Cells).filter(cell => cell.innerHTML === ""); 
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cell = emptyCells[randomIndex];

    if (cell) {
        cell.innerHTML = Computer;
        StartCells[parseInt(cell.dataset.cellIndex)] = Computer;

        const winner = GameWin(); // 이긴 사람 확인하기
        if (winner) {
            EndGame(winner);
            return;
        }

        CurrentPlayer = Player; // 플레이어 차례로 교체

        // 누구 차례인지 표시
          if (CurrentPlayer === Player){
            Turn.innerHTML = 'Player\'s turn';
        } else {
            Turn.innerHTML = 'Computer\'s turn';
        }
    }
}

// 이긴 사람 확인하기
const GameWin = () => {
    const WinConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 가로
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 세로
        [0, 4, 8], [2, 4, 6] // 대각선
    ];

    let IsTie = true;

    // 게임에서 이겼을 경우
    for (const condition of WinConditions) {
        const [a, b, c] = condition;
        if (
            StartCells[a] !== "" &&
            StartCells[a] === StartCells[b] &&
            StartCells[a] === StartCells[c]
        ) {
            return StartCells[a]; // 이긴 플레이어 반환
        }
    }

    // 아무도 게임에서 이기지 않았을 경우
    for (const cell of StartCells) {
        if (cell === "") {
            IsTie = false;
            break;
        }
    }

    // 만약 모든 셀이 채워져 있으면 비긴 것으로 처리
    if (IsTie) {
        return "tie";
    }
    return ""; // 아무도 게임에서 이기지 않았을 경우
};

//게임 종료 후 처리
let PlayerScore = 0;
let ComputerScore = 0;
let TieScore = 0;

function EndGame(winner) {
    GameEnded = true;
    Cells.forEach(cell => {
      cell.removeEventListener('click', cellClickHandler);
    });
  
    if (winner === Player) {
      ShowModal("Congrats, You won!");
      PlayerScore++;
    } else if (winner === Computer) {
      ShowModal("The computer wins.");
      ComputerScore++;
    } else {
      ShowModal("It's a tie!");
      TieScore++;
    }

    updateScoreDisplay();
  }
  
  // 게임 score 표시하기 
  function updateScoreDisplay() {
    const playerScoreElement = document.querySelector('.player span:nth-child(2)');
    const tieScoreElement = document.querySelector('.tie span:nth-child(2)');
    const pcScoreElement = document.querySelector('.computer span:nth-child(2)');

    playerScoreElement.textContent = PlayerScore;
    tieScoreElement.textContent = TieScore;
    pcScoreElement.textContent = ComputerScore;
  }

// 게임 결과 메시지 모달 창
const Modal = document.getElementById('Modal');
    // 승부 결과 메시지와 함께 모달 창 띄우기
function ShowModal(message) {
    const modalText = document.getElementById('ModalText');

    modalText.textContent = message;
    Modal.style.display = 'block';
}

    // 모달창 숨기기
function hideModal() {
    Modal.style.display = 'none';
}

    // 게임 끝난 후 이 상태로 쭉 진행할 것인지, 처음부터 다시 시작할 것인지 선택하기
const ContinueBtn = document.getElementById('ContinueBtn');
const ResetBtn = document.getElementById('ResetBtn');

// continue 버튼 누를 때 
ContinueBtn.addEventListener('click', function() {
    hideModal();

    // 게임 셀 비우기
    Cells.forEach(cell => {
        cell.textContent = "";
    })

    //새로운 게임 시작
    StartGame();
})

// reset 버튼 누를 때
ResetBtn.addEventListener('click', function() {
    hideModal();

    PlayerScore = 0;
    TieScore = 0;
    ComputerScore = 0;

    updateScoreDisplay();

    // 게임 셀 비우기
    Cells.forEach(cell => {
        cell.textContent = "";
    })

    //새로운 게임 시작
    StartGame();
})

// 이전으로 돌아가서 다시 O, X 중 선택하기
const GoBackSideBtn = document.querySelector('.go-back');

GoBackSideBtn.addEventListener('click', function() {
    HomeScreen.style.display = 'block';
    GameScreen.style.display = 'none';
});
