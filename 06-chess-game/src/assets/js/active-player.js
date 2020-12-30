// set the active player in dom
export const SetActivePlayer = function (ACTIVE_CHESS_PLAYER) {
    document.getElementById("activePlayer").innerHTML = ACTIVE_CHESS_PLAYER.toUpperCase(); 
}

// Update active player
export const ToggleActivePlayer = function (state) {
    //update active player in states
    if (state.active_chess_player == 'white'){
        state.active_chess_player = 'black';
    } else {
        state.active_chess_player = 'white';
    }
    SetActivePlayer(state.active_chess_player);
}
