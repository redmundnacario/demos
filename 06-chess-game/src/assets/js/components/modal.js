import { countDownTimer } from './timer.js'
export function welcomeModal(state){   
    // Get the modal
    var modal = document.getElementById("welcomeModal");

    // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];
    var closeButton = document.getElementById("start");

    // When the user clicks the button, open the modal 
    // btn.onclick = function() {
    //   modal.style.display = "block";
    // }

    // When the user clicks on <span> (x), close the modal
    closeButton.onclick = function() {
        modal.style.display = "none";
        
        // update player names
        state.players.white.name = document.getElementById("p1Name").value;
        state.players.black.name = document.getElementById("p2Name").value;

        document.getElementById("player-1").children[0].innerText = state.players.white.name
        document.getElementById("player-2").children[0].innerText = state.players.black.name

        // initialize time
        countDownTimer(state);
    }

    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // }

}