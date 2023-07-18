# Game Machine

## 2048

<img width="400px" src="https://github.com/yejify/GameMachine/blob/c2b991d5c29eecd416ab5afe73584ee80b580369/assets/2048_intro.png">
<details>
<summary>🏓 게임설명</summary>

이 게임은 4X4 그리드에서 진행되며, 플레이어는 화살표 키를 사용하여 그리드 위의 타일을 상,하,좌,우로 이동시킵니다. 타일이 움직이면서 같은 숫자가 있는 타일이 닿으면 합쳐져서 두 배가 됩니다.

게임의 목표는 2048 숫자를 만드는 것입니다.

</details>
<details>
<summary>🎮 게임로직</summary>

1. 4x4 그리드를 초기화합니다.
2. 빈 칸에 2 또는 4의 숫자를 넣습니다.
   - 제일 처음엔 2개의 타일 생성합니다
   - 그 이후에 1개의 타일 생성합니다
3. 플레이어가 방향 키를 눌렀을 때 다음을 수행합니다.
   - 해당 방향으로 모든 타일을 이동합니다.
   - 이동할 수 있는 타일이 있으면 같은 숫자의 타일을 합칩니다.
   - 합칠 수 있는 타일이 없으면 게임 오버입니다.
   - 빈 칸이 있으면 빈 칸에 2 또는 4의 숫자를 넣습니다.
   - 단계 3을 반복합니다.
     </details>

---

## Card match game

<img width="400px" src="https://github.com/yejify/GameMachine/blob/d293adfe3f92d912e0a0fc42b37f8b7a83b8cfa6/assets/Card_match_game_intro.png">
<details>
<summary>🏓 게임설명</summary>

</details>
<details>
<summary>🎮 게임로직</summary>

</details>

---

## Hangman

<img width="400px" src="https://github.com/yejify/GameMachine/blob/d293adfe3f92d912e0a0fc42b37f8b7a83b8cfa6/assets/Hangman_intro.png">
<details>
<summary>🏓 게임설명</summary>

행맨게임은 영어 단어 맞히기 게임입니다.

랜덤으로 설정된 단어의 글자 수만큼 밑줄이 그려지고 26개 알파벳 중 하나를 선택하면

해당 단어 안에 그 글자가 있을 경우 있는 칸에 다 적어놓고, 없을 경우 목숨을 하나 깎습니다.

총 목숨은 10이고, 목숨 하나씩 깎일 때마다 그림이 그려지고

다 깎일 경우에는 행맨이 최종적으로 그려지게 됩니다.

</details>
<details>
<summary>🎮 게임로직</summary>

- 1.  list에 있는 단어 중에서 랜덤으로 선택된 단어의 길이에 따라 화면에 빈칸 생성

           ex) 단어 길이 4면 ⇒ _ _ _ _

- 2. 누른 알파벳 키보드는 색상이 바뀌고, 클릭이 더이상 안됨
- 3. 누른 알파벳이 맞을 경우 > 빈칸(\_ \_ \_)에 알파벳이 생김
- 4. 누른 알파벳이 틀릴 경우 > 행맨 그림 선이 하나 생기고 목숨 하나 감소 (총 목숨: 10)
- 5. 마지막 결과에 따라 팝업창 띄우기
- 6. 다시 시작 버튼 누르면 게임 다시 시작
     </details>

---

## Pizza worm

<img width="400px" src="https://github.com/yejify/GameMachine/blob/d293adfe3f92d912e0a0fc42b37f8b7a83b8cfa6/assets/Pizza_worm_intro.png">
<details>
<summary>🏓 게임설명</summary>

피자 지렁이 게임은 랜덤으로 생성되는 피자를 지렁이가 먹으며 오래 살아남는 게임입니다. 이 게임에는 여러가지 규칙이 존재합니다.

1. 피자 랜덤 생성
2. 피자를 먹을때마다 지렁이의 몸 길이가 늘어남
3. 지렁이는 canvas 내부에서만 움직일 수 있고, canvas 선과 닿으면 게임 오버
4. 지렁이의 머리와 몸이 닿게 되더라도 게임 오버
5. 화살표 키와 게임 내의 up,down,left,right 버튼 사용 가능

</details>
<details>
<summary>🎮 게임로직</summary>

1. 게임 start 버튼 클릭 시 게임 시작
2. 피자와 지렁이가 canvas 내에 생성
3. 지렁이의 움직임 방향은 오른쪽으로 초기화되어 있음
4. 게임 내 버튼, 화살표 키보드 사용 모두 가능
5. 피자에 닿게 되면 지렁이의 몸 길이가 10x10만큼 더 늘어나고 피자의 위치는 또 다시 랜덤으로 생성됨
6. 벽에 닿거나 지렁이의 머리가 몸에 닿게 되면 alert 창으로 게임 오버 메시지와 현재 스코어가 출력됨
7. 스코어는 피자를 먹을 때마다 10씩
   </details>

---

## Rock scissors paper

<img width="400px" src="https://github.com/yejify/GameMachine/blob/d293adfe3f92d912e0a0fc42b37f8b7a83b8cfa6/assets/Rock_scissors_paper_intro.png">
<details>
<summary>🏓 게임설명</summary>

가위바위보 게임은 한 사람이 진행하는 게임이며

컴퓨터가 가위,바위,보중 랜덤으로 하나를 선택하면 사용자는 이기거나,비기거나,지거나

3가지의 승패를 가를수 있으며, 총 10번의 기회중 몇번을 이겼는지 score에 확인 가능합니다.

</details>
<details>
<summary>🎮 게임로직</summary>

1. 사용자가 가진 기회는 총 10회
2. 가위,바위,보 중 내고 싶은 이미지를 클릭
3. 이기거나,지거나,비기면 10회에서 횟수 -1 차감
4. 컴퓨터가 이기면 com 전광판 +1, 유저가 이기면 user 전광판 +1
5. 남은 기회가 0이 되면 누가 이겼는지 알림창이 뜹니다.
6. 기회 0이면 Reset 버튼 활성화되며 더이상 가위바위보를 낼 수 없습니다
   </details>

---

## Tic tac toe

<img width="400px" src="https://github.com/yejify/GameMachine/blob/d293adfe3f92d912e0a0fc42b37f8b7a83b8cfa6/assets/Tic_tac_toe_intro.png">
<details>
<summary>🏓 게임설명</summary>

틱택토는 3x3 그리드에서 플레이하는 게임입니다.
게임의 목표는 그리드에서 선택한 이미지의 수평, 수직 또는 대각선을 먼저 형성하는 것입니다.

</details>
<details>
<summary>🎮 게임로직</summary>
1. 순서를 정하기 위해 모양을 고릅니다.
2. 컴퓨터의 차례에는 플레이어가 셀을 선택하지 못 합니다.
3. 승자가 있을 경우, 승자에게 1점이 주어집니다.
4. 모든 셀이 채워지고 승자가 없을 경우 동점을 표시합니다.
   </details>

---

## Whack a mole

<img width="400px" src="https://github.com/yejify/GameMachine/blob/d293adfe3f92d912e0a0fc42b37f8b7a83b8cfa6/assets/Whack_a_mole_intro.png">
<details>
<summary>🏓 게임설명</summary>

9개의 구멍에서 랜덤으로 튀어나오는 두더지 잡기

총 10번의 기회 중 몇 번을 성공했는지 score로 확인 가능합니다.

</details>
<details>
<summary>🎮 게임로직</summary>

9개의 두더지 구멍이 처음 화면에 나옴

게임을 시작하는 "start" 버튼이 있음

시작되면 1초 후부터 두더지가 구멍에서 랜덤하게 나옴

두더지가 나타난 곳을 클릭할 경우, 두더지를 잡은 것으로 간주

두더지가 나타난 구멍을 사용자가 3초 내에 클릭하지 않을 경우, 두더지를 잡지 못한 것으로 간주

사용자가 두더지를 잡거나 제한 시간(3초)가 초과되었을 경우, 1초 후 랜덤으로 두더지가 나와야 함

다음 번에 두더지가 등장하는 구멍은 이전의 구멍과 다른 구멍

사용자가 두더지를 잡을 수 있는 기회는 10번으로 제한

10번의 시도가 끝난 후→**(잡은 두더지 숫자 /10) X 100** 으로 계산하여 사용자의 점수를 화면에 표기

점수가 표기된 후, 사용자에게는 "restart" 버튼 나타나게 함

"restart" 버튼을 누를 경우, 다시 게임이 시작됨

"main" 버튼을 누를 경우, 메인 페이지로 이동

</details>

---
