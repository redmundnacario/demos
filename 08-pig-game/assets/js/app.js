/*
GAME RULES:

- The game has 2 players, playing in rounds

- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score

- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn

- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn

- The first player to reach 100 points on GLOBAL score wins the game

HTML ELEMENTS

- NEW GAME button : reset or re-initialize

- "Roll Dice" : random select 1 - 6 , 
        if 1 -> round score is 0 , next player turn (toggle active class)
        else: add dice value to round score
        
- "Hold" :
        if pressed, add round score to totol score, then next player

*/


import Application from "./functions.js";

const App = new Application();

// Initialize
App.initializeDisplays();

// Re-Initialize game if button newGame was clicked
App.btnNew.addEventListener('click', () => App.initializeDisplays());

// Roll Dice
App.btnRoll.addEventListener('click', () => App.rollDice());

App.btnHold.addEventListener('click', () => App.holdDice());






