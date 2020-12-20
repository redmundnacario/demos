import { 
         DrawChessTiles, 
         SetChessPieces, 
         DrawChessPieces, 
         RedrawChessPieces 
        } from './draw.js';
import { CHESS_DATA } from "./chess-pieces.js";
import GetPossibleMoves from "./moves.js";
import { SetActivePlayer, ToggleActivePlayer} from './active-player.js';



// Undo the moves in chess
const UndoMove = function(){
    if (state.chess_obj.length <=1) {return}

    state.active_chess_obj = JSON.parse(JSON.stringify(state.chess_obj[state.chess_obj.length - 2]));
    state.chess_obj.pop();
    RedrawChessPieces(state.active_chess_obj);
    state.active_chess_player = ToggleActivePlayer(state.active_chess_player);
}

const PossibleMoveSelected = function() {
    let previousBox = state.active_chess_box_id;
    let nextBox = this.id;

    // Check selected box id if it contains possible-move class;
    if (document.getElementById(nextBox).classList.value.includes("possible-move") == false){ return }

    console.log(previousBox + " to "+ nextBox);

    // update state.chess_obj
    
    state.active_chess_obj[nextBox].piece = state.active_chess_obj[previousBox].piece;

    state.active_chess_obj[previousBox].piece = null;

    // Redraw  chess pieces in the map
    document.getElementById(previousBox).children[0].innerHTML = "";
    document.getElementById(nextBox).children[0].innerHTML = state.active_chess_obj[nextBox].piece.htmlcode;

    // history
    state.chess_obj.push(JSON.parse(JSON.stringify(state.active_chess_obj)))


    if (document.getElementsByClassName("selected").length > 0) {
            
        let selected = document.getElementsByClassName("selected");
        let possibleMove = document.getElementsByClassName("possible-move");

        Object.keys(selected).forEach(value => 
            {
                selected[0].classList.remove("selected")
            })
        Object.keys(possibleMove).forEach(value => 
            {
                possibleMove[0].classList.remove("possible-move")
                
            })
        state.active_chess_player = ToggleActivePlayer(state.active_chess_player); 
    }
}

const ToggleActivePiece = function() {

    // function is only applicable to chess box with chess piece
    if (state.active_chess_obj[this.id]["piece"] == null) { 
        console.log(this.id + " null");
        return };

    // function is only applicable to current state.active_chess_player
    if ( state.active_chess_obj[this.id].piece.kingdom != state.active_chess_player) { 
        console.log(this.id + " " + state.active_chess_obj[this.id].piece.kingdom)
        return };

    state.active_chess_box_id = this.id;
    console.log("Active box/piece: " , state.active_chess_box_id)
    let classes =this.classList;

    // Toggle selected chess piece
    if( classes.value.includes("selected")) {
        this.classList.remove("selected");

        let possibleMove = document.getElementsByClassName("possible-move");

        Object.keys(possibleMove).forEach(value => 
            {
                possibleMove[0].classList.remove("possible-move")
            })
    } else {
        // remove other previous chess piece with class 'selected' and remove its possible moves
        if (document.getElementsByClassName("selected").length > 0) {

            let selected = document.getElementsByClassName("selected");
            let possibleMove = document.getElementsByClassName("possible-move");

            Object.keys(selected).forEach(value => 
                {
                    selected[0].classList.remove("selected")
                })
            Object.keys(possibleMove).forEach(value => 
                {
                    possibleMove[0].classList.remove("possible-move")
                })
        }
        // add 'selected' in class
        this.classList.add("selected");

        // Determine chess piece and possible moves
        // let pieceSelected = DetermineChessPiece(state.active_chess_obj, state.active_chess_box_id)
        state.possible_moves  = GetPossibleMoves(state.active_chess_obj[state.active_chess_box_id]);

        state.possible_moves.forEach((move) => {document.getElementById(move).classList.add("possible-move")})
        console.log( "Possible Moves :", state.possible_moves)
    };
};

// state
// Initializations
let state = {
    active_chess_player : "white",
    possible_moves : [],
    active_chess_box_id : null,
    chess_obj : [], // Serves as history in the game
    active_chess_obj: null // Current chess pieces positions in the map is based on this
}

SetActivePlayer(state.active_chess_player);
let chess_obj_initial = DrawChessTiles();

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
