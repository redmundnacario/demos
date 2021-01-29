
//non-chess
import { welcomeModal } from './components/modal.js';
import { showSlides , currentSlide } from './components/slideshow.js';
import { toggleAlert } from './components/alert.js'
// Application
import { Application } from './main.js';

let App = new Application();
// DEEP COPY of state to initial state
App.InitializeChessMap();

// add event listeners to each chess box
App.chessBoxIds.forEach((tile) => {
    tile.onclick = () => [
                          App.ToggleActivePiece(tile.id), 
                          App.PossibleMoveSelected(tile.id)
                         ];
});

// Add event listener to undo button
App.btnUndo.onclick = () => {
    toggleAlert("Undo!"),
    rotateUndo("undo") , 
    App.UndoMove(App.state)
};

// ReInitialize Button
App.btnRestart.onclick = () => {
    toggleAlert("Restart!"),
    rotateUndo("restart") , 
    App.ReInitializeChessMap();
    //Modal 
}

//Modal
welcomeModal(App.state);

// Slidedhow
App.dotSlide.forEach((dot, index) => {
    dot.onclick = () => currentSlide(index +1)
})
showSlides();


// Animations

let rotateUndo = function(stringIn){
    document.getElementById(stringIn).classList.toggle("syncRotate");
    setTimeout(function() {
        document.getElementById(stringIn).classList.toggle('syncRotate');
    }, 1500)
}
