// O, X 선택
let suePlayer = '';
let sueComputer = '';

window.onload = function () {
    let oButton = document.querySelector('.sue-main-o');
    let xButton = document.querySelector('.sue-main-x');

    let sueHomeScreen = document.querySelector('#sue-home-screen');
    let sueGameScreen = document.querySelector('#sue-game-screen');

    oButton.addEventListener('click', function() {
        suePlayer = 'O';
        sueComputer = 'X';

        sueHomeScreen.style.display = 'none';
        sueGameScreen.style.display = 'block';
    })

    xButton.addEventListener('click', function() {
        suePlayer = 'X';
        sueComputer = 'O';

        sueHomeScreen.style.display = 'none';
        sueGameScreen.style.display = 'block';
    })
}