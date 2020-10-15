/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;

init();

// 이전에 던진 주사위의 값을 저장하기 위한 변수
var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if(gamePlaying) {
        // 1. Random number: 주사위 던지는 동작을 랜덤함수+floor함수로 구현
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result: diceDOM을 받아서 none(디폴트)를 block으로 바꿔주고
        // src에 roll한 주사위의 숫자를 반영해서 image가 보이도록 함
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        
        // 3. 첫번째 주사위와 두번째 주사위가 모두 1이 아닐 경우에만 roundScore 갱신
        if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        
        /* 주사위 한 개일 경우이므로 주석 처리
        if (dice === 6 && lastDice === 6) {
            // 플레이어는 모든 점수를 잃는다
            scores[activePlayer] = 0;
            // 반영
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1) {
            //갱신
            roundScore += dice;
            //반영
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //다음 플레이어로 턴 전환
            nextPlayer();
        }
        
        lastDice = dice;
        */
    }
});


document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if (gamePlaying) {
        // CURRENT score를 GLOBAL score로
        scores[activePlayer] += roundScore;
        // UI 업데이트
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        // 이겼는 지 확인, 이겼으면 player name 대신에 winner라는 문구가 뜸
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            //winner클래스 임팩트를 줌
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            //active클래스는 제거
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            //다음 플레이어로 턴 전환
            nextPlayer();        
        }        
    }
});

function nextPlayer() {
    //다음 플레이어로 턴 전환
    activePlayer === 0 ? activePlayer=1 : activePlayer=0;
    //round score를 0으로
    roundScore = 0;
    //화면에도 초기화 반영
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    //activePlayer 토글
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //턴이 넘어가면 주사위 이미지 사라지기
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    // 초기화 해줌
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    // 모든 ROUND score와 GLOBAL score를 초기화
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    
}

//해당 activePlayer에 나온 주사위 수를 적음
//document.querySelector('#current-' + activePlayer).textContent = dice;
//var x = document.querySelector('#score-1').textContent;
//console.log(x);