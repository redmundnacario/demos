import { InitializeChessMap } from './main.js';
import { ReInitializeChessMap } from './main.js';
import { ToggleActivePiece } from './main.js';
import { PossibleMoveSelected } from './main.js';
import { UndoMove } from './main.js';

//non-chess
import { welcomeModal } from './modal.js';
import { showSlides } from './slideshow.js';
//data

import { CHESS_DATA } from "./data/chess-pieces.js";
import { state } from './data/state.js';


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

welcomeModal(state);
let slideIndex = 1;
showSlides(slideIndex);