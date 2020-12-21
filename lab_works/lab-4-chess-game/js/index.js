import { 
         DrawChessTiles, 
         SetChessPieces, 
         DrawChessPieces, 
         RedrawChessPieces,
         AddClassesOfMovesOrTargetsSquares,
         RemoveClassesOfMovesOrTargetsSquares 
        } from './draw.js';
import { CHESS_DATA } from "./chess-pieces.js";
import GetPossibleMoves from "./moves.js";
import { SetActivePlayer, ToggleActivePlayer} from './active-player.js';



// Undo the moves in chess
const UndoMove = function(){
    if (state.chess_obj.length <=1) {return}

    state.active_chess_obj = JSON.parse(JSON.stringify(state.chess_obj[state.chess_obj.length - 2]));
    state.chess_obj.pop();
    // remove classes: selected, possible moves, possible target
    RemoveClassesOfMovesOrTargetsSquares()
    RedrawChessPieces(state.active_chess_obj);

    state.active_chess_player = ToggleActivePlayer(state.active_chess_player);

}

const PossibleMoveSelected = function() {
    let previousBox = state.active_chess_box_id;
    let nextBox = this.id;

    let hasClassPossibleMove = document.getElementById(nextBox).classList.value.includes("possible-move");
    let hasClassPossibleTarget = document.getElementById(nextBox).classList.value.includes("possible-target");
    // Check selected box id if it contains possible-move class;
    if (!(hasClassPossibleMove | hasClassPossibleTarget )){ return }

    console.log(previousBox + " to "+ nextBox);

    // update state.chess_obj
    
    state.active_chess_obj[nextBox].piece = state.active_chess_obj[previousBox].piece;

    state.active_chess_obj[previousBox].piece = null;

    // Redraw  chess pieces in the map
    document.getElementById(previousBox).children[0].innerHTML = "";
    document.getElementById(nextBox).children[0].innerHTML = state.active_chess_obj[nextBox].piece.htmlcode;

    let chessPieceMoved = state.active_chess_obj[nextBox];
    let chessPieceOriginalBox = state.active_chess_obj[previousBox];

    // fore en passant
    if (Boolean(state.pawn_double_step_status) & chessPieceMoved.piece.position == "pawn" ){
        if (chessPieceMoved.colNumber - state.pawn_double_step_status.colNumber == 0){
            if(state.pawn_double_step_status.rowNumber - chessPieceOriginalBox.rowNumber == 0) {
                document.getElementById(state.pawn_double_step_status.colLetter +
                    state.pawn_double_step_status.rowNumber ).children[0].innerHTML = "";
                };
            };
    } 

    // Save in History
    state.chess_obj.push(JSON.parse(JSON.stringify(state.active_chess_obj)))
    // Change Player
    state.active_chess_player = ToggleActivePlayer(state.active_chess_player);


    if (document.getElementsByClassName("selected").length > 0) {
        RemoveClassesOfMovesOrTargetsSquares()    
    }
    // for enpassat
    if (chessPieceMoved.piece.position == "pawn" ){
        if (Math.abs(chessPieceMoved.rowNumber - chessPieceOriginalBox.rowNumber) == 2){
            state.pawn_double_step_status = {
                ...chessPieceMoved
            }
        } else {
            state.pawn_double_step_status = null
        }
    } else {
        state.pawn_double_step_status = null
    }
    console.log("En Passant passed the Rule 1 - status: ",state.pawn_double_step_status)
}

const ToggleActivePiece = function() {

    // this function is only applicable to chess box with chess piece
    if (state.active_chess_obj[this.id]["piece"] == null) { 
        return };

    // this function is only applicable to current state.active_chess_player
    if (state.active_chess_obj[this.id].piece.kingdom != state.active_chess_player) {
        return };

    state.active_chess_box_id = this.id;

    console.log("Active box/piece: " , state.active_chess_box_id)

    // list all classes to target element
    let classes = this.classList;

    // Toggle On/off current selected chess piece
    if(classes.value.includes("selected")) {
        // remove other previous styles with class selected, possible moves/targets
        RemoveClassesOfMovesOrTargetsSquares()
    } else {
        // remove other previous styles with class selected, possible moves/targets
        if (document.getElementsByClassName("selected").length > 0) {
            RemoveClassesOfMovesOrTargetsSquares()
        }
        // add 'selected' in class
        this.classList.add("selected");

        // Determine chess piece and possible moves
        let {possibleMoves,
             possibleTargets } 
                = GetPossibleMoves(state.active_chess_obj[state.active_chess_box_id], 
                                   state.active_chess_obj,
                                   state.pawn_double_step_status,
                                   state.letters);

        state.possible_moves = possibleMoves; 
        
         // Attach some class in the possible moves squares
        AddClassesOfMovesOrTargetsSquares(possibleMoves, possibleTargets);
    };
};

// state
// Initializations
let state = {
    active_chess_player : "white",
    possible_moves : [],
    active_chess_box_id : null,
    chess_obj : [], // Serves as history in the game
    active_chess_obj: null, // Current chess pieces positions in the map is based on this
    pawn_double_step_status: null,
    letters : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
}

SetActivePlayer(state.active_chess_player);
let chess_obj_initial = DrawChessTiles(state.letters);
// console.log(chess_obj_initial)
state.chess_obj.push(SetChessPieces(chess_obj_initial , CHESS_DATA));
state.active_chess_obj = JSON.parse(JSON.stringify(state.chess_obj[state.chess_obj.length - 1]))

// Draw initial chess pieces in the map
DrawChessPieces(state.chess_obj[0]);

// add event listener to each chess box
let keys = Object.keys(state.chess_obj[0]);
for (let key in keys){
    const chessBoxSelected = document.getElementById(keys[key]);
    chessBoxSelected.addEventListener("click", ToggleActivePiece);
    chessBoxSelected.addEventListener("click", PossibleMoveSelected );
};


document.getElementById("undo").addEventListener("click", UndoMove)
