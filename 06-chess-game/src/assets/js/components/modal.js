import { countDownTimer } from './timer.js'
export function welcomeModal(state){   

    
    // Get the modal
    let modal = document.getElementById("welcomeModal");

    // Get the button that opens the modal
    let closeButton = document.getElementById("start");
    
    let playerRow = document.getElementById("playerRowId")
    let playerTurn = document.getElementById("playerTurnId")
    let undo = document.getElementById("undo")
    

    // When the user clicks on <span> (x), close the modal
    closeButton.onclick = (event) => {
        event.preventDefault()
        let value1 = document.getElementById("p1Name").value
        let value2 =  document.getElementById("p2Name").value
        if (value1 != "" & value2 != ""){

            if (value1 === value2){
                alert("Player names must be unique.")
            }
            // update player names
            state.players.white.name = value1;
            state.players.black.name = value2;

            modal.style.display = "none";

            let player1 = document.getElementById("player-1").children[0]
            let player2 = document.getElementById("player-2").children[0]

            player1.innerText = state.players.white.name
            player2.innerText = state.players.black.name

            playerRow.classList.toggle("hidden")
            playerTurn.classList.toggle("hidden")
            undo.classList.toggle("hidden")

        // initialize time
        countDownTimer(state);
        } else {
            alert("input missing")
        }
    }

}