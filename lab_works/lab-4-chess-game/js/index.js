import { InitializeChessMap,
         ReInitializeChessMap,
         ToggleActivePiece, 
         PossibleMoveSelected, 
         UndoMove } from './main.js';

import { CHESS_DATA } from "./chess-pieces.js";


// state -- initial value
let state = {
    active_chess_player : "white",
    active_chess_box_id : null,
     // Serves as history in the game
    chess_obj : [],
    // Current chess pieces positions in the map is based on this
    active_chess_obj: null, 
    // Needed for En Passant
    pawn_double_step_status: null,
    letters : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    king_location: {// Used in idenfifying check
        white: null,
        black: null
    },
    castling: {
        // set this to null if king moved RULE 1
        white : { 
            // rook in encastle must not be moved, preferred false, RULE 3 
            rook_left_moved: false,
            rook_right_moved: false,
            //  space b/w rook and king must be empty, preferred true, RULE 4
            kingside_empty: false, 
            queenside_empty: false,
            // 2 spaces lef/right of king was checked, preferred false, RULE 5
            kingside_attacked: false, 
            queenside_attacked: false, 
        },
        // set this to null if king moved RULE 1
        black : {
            // rook in encastle must not be moved, preferred false, RULE 3 
            rook_left_moved: false,
            rook_right_moved: false,
            //  space b/w rook and king must be empty, preferred true, RULE 4
            kingside_empty: false, 
            queenside_empty: false,
            // 2 spaces lef/right of king was checked, preferred false, RULE 5
            kingside_attacked: false, 
            queenside_attacked: false
            // CheckIfChecked() in check.js can be used in rule 5
        }
    },
    // also considered in castling, preferred false, RULE 2
    checked : {
        // white king being checked
        white: null,
        // black king checked 
        black: null  
    },
     // if checked = true and , all possible square to move are being attacked
    checkmate: {
         // white king being checkmate
        white: false,
        // black king checkmate
        black: false 
    },
    // if nor null, game stops, winner is declared, action done after checkmate,
    winner : null
};

// DEEP COPY of state to initial state
let init_state = JSON.parse(JSON.stringify(InitializeChessMap(state, CHESS_DATA)));

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
    // ReInitializeChessMap(init_state, state, CHESS_DATA)
});
