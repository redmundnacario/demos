
//non-chess
// import { welcomeModal } from './components/modal.js';
// import { showSlides } from './components/slideshow.js';
//data

// import { CHESS_DATA } from "./data/chess-pieces.js";
// import { state } from './data/state.js';

import { Application } from './main.js';

let App = new Application();
// DEEP COPY of state to initial state
App.InitializeChessMap();

// add event listeners to each chess box
let keys = Object.keys(App.state.chess_obj[0]);

for (let key in keys){
    const chessBoxSelected = document.getElementById(keys[key]);
    chessBoxSelected.addEventListener("click", () => {
        App.ToggleActivePiece(chessBoxSelected.id);
    });

    chessBoxSelected.addEventListener("click", () =>{
        App.PossibleMoveSelected(chessBoxSelected.id);
    });
};

// Add event listener to undo button
document.getElementById("undo").addEventListener("click", () => {
    App.UndoMove();
    // App.ReInitializeChessMap()
});

welcomeModal(App.state);
showSlides();