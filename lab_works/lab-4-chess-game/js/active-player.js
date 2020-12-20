// set the active player
export const SetActivePlayer = function (ACTIVE_CHESS_PLAYER) {
    document.getElementById("activePlayer").innerHTML = ACTIVE_CHESS_PLAYER.toUpperCase(); 
}

// Update active player
export const ToggleActivePlayer = function (ACTIVE_CHESS_PLAYER) {
    if (ACTIVE_CHESS_PLAYER == 'white'){
        ACTIVE_CHESS_PLAYER = 'black';
    } else {
        ACTIVE_CHESS_PLAYER = 'white';
    }
    SetActivePlayer(ACTIVE_CHESS_PLAYER);
    return ACTIVE_CHESS_PLAYER;
}
