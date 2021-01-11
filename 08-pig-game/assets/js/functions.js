import { Game } from "./data/state.js";

export default function Application() {

    // State variable
    this.state;

    this.diceObject = {
        1 : "./assets/img/dice-1.png",
        2 : "./assets/img/dice-2.png",
        3 : "./assets/img/dice-3.png",
        4 : "./assets/img/dice-4.png",
        5 : "./assets/img/dice-5.png",
        6 : "./assets/img/dice-6.png"
    }

    // Buttons
    this.btnNew = document.querySelector('.btn-new');
    this.btnRoll = document.querySelector('.btn-roll');
    this.btnHold = document.querySelector('.btn-hold');

    // player panel
    this.playerOne = document.querySelector(".player-0-panel");
    this.playerTwo = document.querySelector(".player-1-panel");

    // player round score
    this.pScore1 = document.querySelector('#score-0');
    this.pScore2 = document.querySelector('#score-1');

    // player name
    this.nPlayer1 = document.querySelector('#name-0');
    this.nPlayer2 = document.querySelector('#name-1');

    // total score
    this.cPlayer1 = document.querySelector('#current-0');
    this.cPlayer2 = document.querySelector('#current-1');

    // dice image
    this.dice = document.querySelector('.dice');

    this.activePanel = document.querySelector(".active");
    // winner
    this.winnerPanel = document.querySelector(".winner");

    // winner declaration div
    this.winnerDiv = document.querySelector("#player-winner");

    // Initialize States 
    this.initialization = function() {
        let game = new Game();
        return game.state;
    }

    // Initialization of displays
    this.initializeDisplays = function() {

        // Set visibility of buttons and others
        this.btnHold.style.visibility = `visible`;
        this.btnRoll.style.visibility = `visible`;
        this.dice.style.visibility = `visible`;
        this.pScore1.style.visibility = `visible`;
        this.pScore2.style.visibility = `visible`;

        // resets the initial states
        this.state = this.initialization()

        this.pScore1.innerText = this.state.players.player1.round_score;
        this.pScore2.innerText = this.state.players.player2.round_score;

        this.nPlayer1.innerText = this.state.players.player1.name;
        this.nPlayer2.innerText = this.state.players.player2.name;

        this.cPlayer1.innerText = this.state.players.player1.total_score;
        this.cPlayer2.innerText = this.state.players.player2.total_score;

        this.updateDiceValue();

        // set player 1 as default active player
        this.playerOne.classList.add("active")
        this.playerTwo.classList.remove("active")

        // Remove winner class name
        this.winnerPanel = document.querySelector(".winner");
        if(this.winnerPanel){
            this.winnerPanel.classList.remove("winner")
        }
        // Hide winner div
        this.winnerDiv.style.visibility = `hidden`;
    }

    // changes dice value in display
    this.updateDiceValue = function(){
        this.dice.src = this.diceObject[this.state.dice_value];
    }

    // Toggle player design
    this.toggleActivePlayerDesign = function() {
        let { active_player } = this.state;

        // disable roll button first... enable later
        this.btnRoll.style.visibility = `hidden`;

        // add delay of 1 second
        setTimeout(() => {
            if (active_player === "player1"){
                this.playerOne.classList.add("active")
                this.playerTwo.classList.remove("active")
                // console.log(playerOne)
            } else if (active_player === "player2"){
                this.playerOne.classList.remove("active")
                this.playerTwo.classList.add("active")
                // console.log(playerTwo)
            }
            this.btnRoll.style.visibility = `visible`;
        }, 500)
    }

    // Get random value from 1 to 6
    this.getRandomDiceInt = function() {
        let dice_length = 6
        return 1 + Math.floor(Math.random() * Math.floor(dice_length));
    }


    
    this.rollDice = function() {
        
        let  { active_player } = this.state;
        let pScoreId = '#score-' + ( active_player == "player1" ? "0" : "1")
        var pScore = document.querySelector(pScoreId);

        let randomDiceInt = this.getRandomDiceInt()
        // console.log(randomDiceInt)

        if (randomDiceInt === 1){
            // if dice is 1 value, score round = 0, then toggle player;
            this.state.players[active_player].round_score = 0
            // update display
            pScore.innerText = 0;

            // update this.state active player and design
            this.state.active_player = active_player == "player1" ? "player2" : "player1";
            this.toggleActivePlayerDesign();

            //update dice value in state and display
            this.state.dice_value = randomDiceInt
            this.updateDiceValue()

        } else {
            // accumulate round score

            //update this.state active player score and score display
            this.state.players[active_player].round_score += randomDiceInt
            pScore.innerText = this.state.players[active_player].round_score;

            //update dice value in state and display
            this.state.dice_value = randomDiceInt
            this.updateDiceValue()
        };
    }
    
    this.checkWinner = function() {
        let  { active_player, players, target_score} = this.state;
         // Declare the winner if reaches the max score
        if (players[active_player].total_score >= target_score) {

            // hide roll and hold button and dice image
            this.btnHold.style.visibility = `hidden`;
            this.btnRoll.style.visibility = `hidden`;
            this.dice.style.visibility = `hidden`;
            this.pScore1.style.visibility = `hidden`;
            this.pScore2.style.visibility = `hidden`;

            //update state
            this.state.winner = active_player;

            // set display winner (background)
            this.activePanel = document.querySelector(".active");
            this.activePanel.classList.add("winner")

            this.winnerDiv.innerText = players[this.state.winner].name + " Wins!"
            this.winnerDiv.style.visibility = "visible"
            
        } else {
            //If no winner, toggle player
            // update this.state active player and design
            this.state.active_player = active_player == "player1" ? "player2" : "player1";
            this.toggleActivePlayerDesign();
        }
    }
    //HOLD DICE FUNCTION
    this.holdDice = function(){
        // console.log(this.state)
        //Destructuring
        let {active_player, players} = this.state;
        
        //Update Total score and RoundScoure state
        this.state.players[active_player].total_score += players[active_player].round_score;
        this.state.players[active_player].round_score = 0
        
        //Update Display of roundScore
        let pScoreId = '#score-' + ( active_player == "player1" ? "0" : "1")
        var pScore = document.querySelector(pScoreId);
        pScore.innerText = 0;

        // Update Display of Total Score
        if(active_player === "player1"){
            this.cPlayer1.innerText = this.state.players[active_player].total_score;
        } else{
            this.cPlayer2.innerText = this.state.players[active_player].total_score;
        }
        // Check if there is a winner
        this.checkWinner();
    }
}







