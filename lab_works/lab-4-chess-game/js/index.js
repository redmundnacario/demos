import { 
         DrawChessTiles, 
         SetChessPieces, 
         DrawChessPieces, 
         RedrawChessPieces 
        } from './draw-tiles.js';
import { CHESS_DATA } from "./chess-pieces.js";
import GetPossibleMoves from "./moves.js";

// set the active player
const SetActivePlayer = function () {
    document.getElementById("activePlayer").innerHTML = ACTIVE_CHESS_PLAYER.toUpperCase(); 
}

// Update active player
const ToggleActivePlayer = function () {
    if (ACTIVE_CHESS_PLAYER == 'white'){
        ACTIVE_CHESS_PLAYER = 'black'
    } else (
        ACTIVE_CHESS_PLAYER = 'white'
    )
    SetActivePlayer();
}


// Undo the moves in chess
const UndoMove = function(){
    if (CHESS_OBJ.length <=1) {return}

    ACTIVE_CHESS_OBJ = JSON.parse(JSON.stringify(CHESS_OBJ[CHESS_OBJ.length - 2]));
    CHESS_OBJ.pop();
    console.log(CHESS_OBJ);
    RedrawChessPieces(ACTIVE_CHESS_OBJ);
}

const PossibleMoveSelected = function() {
    let previousBox = ACTIVE_CHESS_BOX_ID;
    let nextBox = this.id;

    // Check selected box id if it contains possible-move class;
    if (document.getElementById(nextBox).classList.value.includes("possible-move") == false){ return }

    console.log(previousBox + " to "+ nextBox);

    // update CHESS_OBJ
    
    ACTIVE_CHESS_OBJ[nextBox].piece = ACTIVE_CHESS_OBJ[previousBox].piece;
    console.log(ACTIVE_CHESS_OBJ[nextBox].piece);
    ACTIVE_CHESS_OBJ[previousBox].piece = null;

    console.log(ACTIVE_CHESS_OBJ[previousBox].piece);
    console.log(ACTIVE_CHESS_OBJ);

    // Redraw  chess pieces in the map
    console.log(document.getElementById(previousBox).children[0].innerHTML)
    document.getElementById(previousBox).children[0].innerHTML = "";
    document.getElementById(nextBox).children[0].innerHTML = ACTIVE_CHESS_OBJ[nextBox].piece.htmlcode;

    // history
    CHESS_OBJ.push(JSON.parse(JSON.stringify(ACTIVE_CHESS_OBJ)))
    console.log(CHESS_OBJ);

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
        ToggleActivePlayer(); 
    }
}

const ToggleActivePiece = function() {

    // function is only applicable to chess box with chess piece
    if (ACTIVE_CHESS_OBJ[this.id]["piece"] == null) { 
        console.log(this.id + " null");
        return };

    // function is only applicable to current ACTIVE_CHESS_PLAYER
    if ( ACTIVE_CHESS_OBJ[this.id].piece.kingdom != ACTIVE_CHESS_PLAYER) { 
        console.log(this.id + " " + ACTIVE_CHESS_OBJ[this.id].piece.kingdom)
        return };

    console.log("proceed")

    ACTIVE_CHESS_BOX_ID = this.id;
    console.log("Active box/piece: " , ACTIVE_CHESS_BOX_ID)
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
        // let pieceSelected = DetermineChessPiece(ACTIVE_CHESS_OBJ, ACTIVE_CHESS_BOX_ID)
        POSSIBLE_MOVES  = GetPossibleMoves(ACTIVE_CHESS_OBJ[ACTIVE_CHESS_BOX_ID]);

        POSSIBLE_MOVES.forEach((move) => {document.getElementById(move).classList.add("possible-move")})
        console.log( "Possible Moves :", POSSIBLE_MOVES)

        //add event listener to possible move squares
        // console.log()
        // if (movesId){
        //     let possibleBox = document.getElementsByClassName("possible-move")
        //     Object.keys(possibleBox).forEach(value =>{
        //         possibleBox[value].addEventListener("click", () => {
        //             PossibleMoveSelected(ACTIVE_CHESS_BOX_ID , possibleBox[value].id)
        //         } );
        //     })
        // }

    };
};


// Initializations
let ACTIVE_CHESS_PLAYER = "white";
let ACTIVE_CHESS_OBJ; // Current chess pieces positions in the map is based on this
let POSSIBLE_MOVES = [];
let ACTIVE_CHESS_BOX_ID;

SetActivePlayer();
let CHESS_OBJ = [] // Serves as history in the game
let CHESS_OBJ_INITIAL = DrawChessTiles();

CHESS_OBJ.push(SetChessPieces(CHESS_OBJ_INITIAL , CHESS_DATA));
ACTIVE_CHESS_OBJ = JSON.parse(JSON.stringify(CHESS_OBJ[CHESS_OBJ.length - 1]))

// Draw initial chess pieces in the map
DrawChessPieces(CHESS_OBJ[0]);
// console.log(CHESS_OBJ[CHESS_OBJ.length - 1])

// add event listener to each chess box
let keys = Object.keys(CHESS_OBJ[0]);
for (let key in keys){
    // if chessbox  piece is missing in the CHESS_OBJ... skip
    // if (CHESS_OBJ[keys[key]]["piece"] != null) {
    // console.log(keys[key])
    const chessBoxSelected = document.getElementById(keys[key]);
    chessBoxSelected.addEventListener("click", ToggleActivePiece);
    chessBoxSelected.addEventListener("click", PossibleMoveSelected );
        // console.log(keys[key]
    // }
};


document.getElementById("undo").addEventListener("click", UndoMove)
