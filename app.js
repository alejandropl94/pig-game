/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, currentDOM, diceDOM, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
         // random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // display the result
        diceDOM.style.display = 'block';
        diceDOM.src = "dice-" + dice + ".png";

        // check if its not a 1 to 
        if(dice !== 1){
            roundScore += dice;
            currentDOM.textContent = roundScore; 
        }else{
            // next player
            nextPlayer();
        }   
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
         // add current score to global score
        scores[activePlayer] += roundScore; 

        // update de user interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if(scores[activePlayer] >= 100){
            document.getElementById("name-" + activePlayer).innerHTML = "<b>Winner!!</b>";
            diceDOM.style.display = "none";
            document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            gamePlaying = false;

        }else{
            // next player
            nextPlayer();
        }   
    }
    
});
 
function nextPlayer(){
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    currentDOM.textContent = 0;
    currentDOM =  document.getElementById('current-' + activePlayer);
    currentDOM.textContent = 0;
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    diceDOM.style.display = 'none';
    
}

document.querySelector(".btn-new").addEventListener("click", init);

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    currentDOM = document.getElementById('current-' + activePlayer);
    diceDOM = document.querySelector('.dice');
    document.getElementById("name-0").innerHTML = "Player 1";
    document.getElementById("name-1").innerHTML = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
