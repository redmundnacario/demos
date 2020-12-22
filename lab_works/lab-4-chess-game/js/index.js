import { 
         DrawChessTiles, 
         SetChessPieces, 
         DrawChessPieces
        } from './draw.js';
import { 
         ToggleActivePiece,
         PossibleMoveSelected, 
         UndoMove
        } from './main.js';
import { SetActivePlayer } from './active-player.js';
import { CHESS_DATA } from "./chess-pieces.js";

// state -- initial values
let state = {
    active_chess_player : "white",
    active_chess_box_id : null,
    chess_obj : [], // Serves as history in the game
    active_chess_obj: null, // Current chess pieces positions in the map is based on this
    pawn_double_step_status: null,
    letters : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
}

// set active player in the DOM
SetActivePlayer(state.active_chess_player);
// Draw chess boxes in the DOM
let chess_obj_initial = DrawChessTiles(state.letters);
// Set the chess pieces in the state object
state.chess_obj.push(SetChessPieces(chess_obj_initial , CHESS_DATA));
// DEEP COPY of chess_obj to active_chess_obj to create game history
state.active_chess_obj = JSON.parse(JSON.stringify(state.chess_obj[state.chess_obj.length - 1]))

// Set the chess pieces in the DOM
DrawChessPieces(state.chess_obj[0]);

// add event listeners to each chess box
let keys = Object.keys(state.chess_obj[0]);

for (let key in keys){

    const chessBoxSelected = document.getElementById(keys[key]);

    chessBoxSelected.addEventListener("click", () => {
        ToggleActivePiece(chessBoxSelected.id, state);
    });

    chessBoxSelected.addEventListener("click", () =>{
        PossibleMoveSelected(chessBoxSelected.id, state);
    });
};

// Add event listener to undo button
document.getElementById("undo").addEventListener("click", () => {
    UndoMove(state);
})
