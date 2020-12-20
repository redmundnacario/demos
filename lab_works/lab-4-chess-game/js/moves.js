import { DrawChessTiles , setChessPieces, drawChessPieces} from './draw-tiles.js';
import { CHESS_DATA } from "./chess-pieces.js";


// Initializations
let activeChessPlayer = "white";
document.getElementById("activePlayer").innerHTML = activeChessPlayer.toUpperCase();
let chessObj = DrawChessTiles();
chessObj = setChessPieces(chessObj, CHESS_DATA);

// Draw initial chess pieces in the map
drawChessPieces(chessObj);
// console.log(chessObj)

// 
const PawnMoves = function(chessObjBox) {
    let rowNumbers = []
    let {rowNumber, colNumber, colLetter} = chessObjBox
    console.log(activeChessPlayer, rowNumber)
    if (activeChessPlayer == "white") {
        if(rowNumber == 2){
            for (let i = rowNumber + 1; i < rowNumber + 3; i++) { rowNumbers.push(i); };
        } else {
            for (let i = rowNumber + 1; i < rowNumber + 2; i++) { rowNumbers.push(i); };
        }
    } else {
        if(rowNumber == 7){
            for (let i = rowNumber - 1; i < rowNumber - 3; i--) { rowNumbers.push(i); };
        } else {
            for (let i = rowNumber - 1; i < rowNumber - 2; i--) { rowNumbers.push(i); };
        }
    }
    
    return rowNumbers.map((value) => colLetter + value)
}

const PossibleMoves = function (piece, chessObjBox) {
    // console.log(piece.position);

    switch (piece.position) {
        case "pawn":
            return PawnMoves(chessObjBox)
        default:
            return null
    }
}

const DetermineChessPiece = function(chessObj, chessBoxSelId){
    let pieceSelected = chessObj[chessBoxSelId].piece;
    const moves = PossibleMoves(pieceSelected, chessObj[chessBoxSelId]);
    // console.log(moves);
    return moves
}

const PossibleMoveSelected = function(previousBox, nextBox) {
    // let chessBoxSelId = this.id;
    // let classes =this.classList;
    
    console.log(previousBox + " to "+ nextBox);

    // update chessObj
    chessObj[nextBox].piece = chessObj[previousBox].piece;
    console.log(chessObj[nextBox].piece);
    chessObj[previousBox].piece = null;

    console.log(chessObj[previousBox].piece);
    console.log(chessObj);

    // Redraw  chess pieces in the map
    console.log(document.getElementById(previousBox).children[0].innerHTML)
    document.getElementById(previousBox).children[0].innerHTML = "";
    document.getElementById(nextBox).children[0].innerHTML = chessObj[nextBox].piece.htmlcode;

    if (document.getElementsByClassName("selected").length > 0) {
            
        Object.keys(document.getElementsByClassName("selected")).forEach(value => 
            {
                document.getElementsByClassName("selected")[0].classList.remove("selected")
            })
        Object.keys(document.getElementsByClassName("possible-move")).forEach(value => 
            {
                document.getElementsByClassName("possible-move")[0].classList.remove("possible-move")
            })
    }

}

const ToggleActivePiece = function() {
    let chessBoxSelId = this.id;
    let classes =this.classList;

    // Toggle selected chess piece
    if( classes.value.includes("selected")) {
        this.classList.remove("selected");

        Object.keys(document.getElementsByClassName("possible-move")).forEach(value => 
            {
                document.getElementsByClassName("possible-move")[0].classList.remove("possible-move")
            })
    } else {
        // remove other chess piece with class 'selected'
        if (document.getElementsByClassName("selected").length > 0) {
            
            Object.keys(document.getElementsByClassName("selected")).forEach(value => 
                {
                    document.getElementsByClassName("selected")[0].classList.remove("selected")
                })
            Object.keys(document.getElementsByClassName("possible-move")).forEach(value => 
                {
                    document.getElementsByClassName("possible-move")[0].classList.remove("possible-move")
                })
        }
        // add 'selected' in class
        this.classList.add("selected");

        // Determine chess piece and possible moves
        let moves = DetermineChessPiece(chessObj, chessBoxSelId)
        moves.forEach((move) => {document.getElementById(move).classList.add("possible-move")})

        //add event listener to possible move squares
        // console.log()
        if (moves){
            let possibleBox = document.getElementsByClassName("possible-move")
            Object.keys(possibleBox).forEach(value =>{
                possibleBox[value].addEventListener("click", () => {
                    PossibleMoveSelected(chessBoxSelId , possibleBox[value].id)
                } );
            })
        }
    };
};

// White or Black? determine first 'who's turn'


// add event listener to each chess box
let keys = Object.keys(chessObj);
for (let key in keys){
    // if chessbox  piece is missing in the chessObj... skip
    if (chessObj[keys[key]]["piece"] != null) {
        if ( chessObj[keys[key]].piece.kingdom == activeChessPlayer){
            const chessBoxSelected = document.getElementById(keys[key]);
            chessBoxSelected.addEventListener("click", ToggleActivePiece);
            // console.log(keys[key])
        }
    }
};


