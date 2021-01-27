import { countDownTimer } from './timer.js'
export function welcomeModal(state){   

    
    // Get the modal
    var modal = document.getElementById("welcomeModal");

    // Get the button that opens the modal

    var closeButton = document.getElementById("start");

    

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

        // initialize time
        countDownTimer(state);
        } else {
            alert("input missing")
        }
    }

}