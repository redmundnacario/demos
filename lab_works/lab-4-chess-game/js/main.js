import { 
        RedrawChessPieces,
        AddClassesOfMovesOrTargetsSquares,
        RemoveClassesOfMovesOrTargetsSquares 
        } from './draw.js';
import GetPossibleMoves from "./moves.js";
import { ToggleActivePlayer } from './active-player.js';

// Undo the moves in chess
export const UndoMove = function(state){
    let {
        active_chess_obj,
        chess_obj
        } = state;
    // Disables undo button if game history length is 1 or less
    if (state.chess_obj.length <=1) {return}
    // Deep copy
    active_chess_obj = JSON.parse(JSON.stringify(chess_obj[chess_obj.length - 2]));
    // remove last element of chess_obj array
    chess_obj.pop();
    // remove classes: selected, possible moves, possible target
    RemoveClassesOfMovesOrTargetsSquares()
    // Redraw all chess pieces based on history
    RedrawChessPieces(active_chess_obj);
    // Change the active player
    ToggleActivePlayer(state);

    // update states
    state.active_chess_obj = active_chess_obj;
    state.chess_obj = chess_obj;
}

// Triggers when a move was done and updates all dynamic state values 
export const PossibleMoveSelected = function(thisId, state) {
    let {
        active_chess_box_id,
        active_chess_obj,
        pawn_double_step_status,
        chess_obj,
        active_chess_player
        } = state;

    let previousBox = active_chess_box_id;
    let nextBox = thisId;

    let hasClassPossibleMove = document.getElementById(nextBox).classList.value.includes("possible-move");
    let hasClassPossibleTarget = document.getElementById(nextBox).classList.value.includes("possible-target");
    // Check selected box id if it contains possible-move class;
    if (!(hasClassPossibleMove | hasClassPossibleTarget )){ return };

    console.log(active_chess_obj[previousBox].piece.kingdom 
                + " " + active_chess_obj[previousBox].piece.position
                + " " + previousBox + " to "+ nextBox);

    // update state.chess_obj
    
    active_chess_obj[nextBox].piece = active_chess_obj[previousBox].piece;
    active_chess_obj[previousBox].piece = null;

    // Redraw  chess pieces in the map
    document.getElementById(previousBox).children[0].innerHTML = "";
    document.getElementById(nextBox).children[0].innerHTML = active_chess_obj[nextBox].piece.htmlcode;

    let chessPieceMoved = active_chess_obj[nextBox];
    let chessPieceOriginalBox = active_chess_obj[previousBox];

    // fore en passant
    if (Boolean(pawn_double_step_status) & chessPieceMoved.piece.position == "pawn" ){
        if (chessPieceMoved.colNumber - pawn_double_step_status.colNumber == 0){
            if(pawn_double_step_status.rowNumber - chessPieceOriginalBox.rowNumber == 0) {
                let pawnEnPassant = pawn_double_step_status.colLetter +
                                    pawn_double_step_status.rowNumber;
                // update chessObject
                active_chess_obj[pawnEnPassant].piece = null;
                // update dom
                document.getElementById(pawnEnPassant).children[0].innerHTML = "";
                };
            };
    };

    // Save in History
    chess_obj.push(JSON.parse(JSON.stringify(active_chess_obj)));
    // Change Player
    ToggleActivePlayer(state);


    if (document.getElementsByClassName("selected").length > 0) {
        RemoveClassesOfMovesOrTargetsSquares() ;   
    };
    // for enpassat
    if (chessPieceMoved.piece.position == "pawn" ){
        if (Math.abs(chessPieceMoved.rowNumber - chessPieceOriginalBox.rowNumber) == 2){
            pawn_double_step_status = {
                ...chessPieceMoved
            };
        } else {
            pawn_double_step_status = null;
        };
    } else {
        pawn_double_step_status = null;
    }
    // console.log("En Passant passed the Rule 1 - status: ",
    //             pawn_double_step_status);
    
    // update states
    state.active_chess_obj = active_chess_obj;
    state.pawn_double_step_status = pawn_double_step_status;
    state.chess_obj = chess_obj;
};

// Bascically put styles to selected piece, and its possible moves and targets
export const ToggleActivePiece = function(thisId, state) {
    let{ 
        active_chess_obj, 
        active_chess_player, 
        active_chess_box_id,
        pawn_double_step_status,
        letters } = state;

    // this function is only applicable to chess box with chess piece
    if (active_chess_obj[thisId]["piece"] == null) { 
        return };

    // this function is only applicable to current active_chess_player
    if (active_chess_obj[thisId].piece.kingdom != active_chess_player) {
        return };

    active_chess_box_id  = thisId;

    // console.log("Active box/piece: " , active_chess_box_id );

    // list all classes to target element
    let classes = document.getElementById(thisId).classList;

    // Toggle On/off current selected chess piece
    if(classes.value.includes("selected")) {
        // remove other previous styles with class selected, possible moves/targets
        RemoveClassesOfMovesOrTargetsSquares();
    } else {
        // remove other previous styles with class selected, possible moves/targets
        if (document.getElementsByClassName("selected").length > 0) {
            RemoveClassesOfMovesOrTargetsSquares();
        }
        // add 'selected' in class
        classes.add("selected");

        // Determine chess piece and possible moves
        let {possibleMoves,
             possibleTargets } 
                = GetPossibleMoves(active_chess_obj[active_chess_box_id], 
                                   active_chess_obj,
                                   pawn_double_step_status,
                                   letters);
        
         // Attach some class in the possible moves squares
        AddClassesOfMovesOrTargetsSquares(possibleMoves, possibleTargets)
    };
    // update states
    state.active_chess_box_id = active_chess_box_id;
};