import { DrawChessTiles } from './draw.js';
import { SetChessPieces } from './draw.js';
import { DrawChessPieces } from './draw.js';
import { UndrawChessPieces } from './draw.js';
import { RedrawChessPieces } from './draw.js';
import { AddClassesOfMovesOrTargetsSquares } from './draw.js';
import { RemoveClassesOfMovesOrTargetsSquares } from './draw.js';
        
import { GetPossibleMoves } from "./chess-pieces/moves.js";
import { SetActivePlayer, ToggleActivePlayer } from './active-player.js';
import { EnPassant, UpdateEnPassantState } from './special-rules/en-passant.js';
import { CheckIfChecked, CheckAreaIfChecked } from './special-rules/check.js';
import { CheckCastling, Castling } from './special-rules/castling.js';
import { PawnPromotion } from './special-rules/promotion.js';
import { getClassListIncludes, setInnerImg} from './utils.js';
/*
Initialize chess map, chess piece in the dom and chess object
Also adds eventlisteners to chess tiles.
*/

export const InitializeChessMap = function (state, CHESS_DATA) {
    let {
            active_chess_player,
            active_chess_obj,
            letters,
            chess_obj,
        } = state;

    // set active player in the DOM
    SetActivePlayer(active_chess_player);
    // Draw chess boxes in the DOM
    let chess_obj_initial = DrawChessTiles(letters);
    // Set the chess pieces in the state object, and set initial kings' location
    chess_obj[0] = SetChessPieces(chess_obj_initial , CHESS_DATA, state);

    // DEEP COPY of chess_obj to active_chess_obj
    active_chess_obj = JSON.parse(JSON.stringify(
                                chess_obj[0]))

    // Set the chess pieces in the DOM
    DrawChessPieces(chess_obj[0]);

    state.chess_obj = chess_obj;
    state.active_chess_obj = active_chess_obj;

    return state
};



/*
RE-initialize the chess game, refreshes the states from the start.
Can be used with restart button or new game.
*/
export const ReInitializeChessMap = function(init_state, state, CHESS_DATA) {
    state = JSON.parse(JSON.stringify(init_state))
    UndrawChessPieces(state.chess_obj[0])
    InitializeChessMap(state, CHESS_DATA)
}



// Bascically put styles to selected piece, and its possible moves and targets
export const ToggleActivePiece = function(thisId, state) {

    let{ 
        active_chess_obj, 
        active_chess_player, 
        active_chess_box_id,
        pawn_double_step_status,
        letters } = state;
    // console.log(state.players)   
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
        // remove previous styles with class selected, possible moves/targets
        RemoveClassesOfMovesOrTargetsSquares();
         // update states
        state.active_chess_box_id = active_chess_box_id;
    } else {
        // removeprevious styles with class selected, possible moves/targets
        RemoveClassesOfMovesOrTargetsSquares();
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
        
        // update states
        state.active_chess_box_id = active_chess_box_id;
        // Checks if possible to Castling for a King selected
        CheckCastling(state)
    };
    
};



// Triggers when a move was done and updates all dynamic state values 
export const PossibleMoveSelected = function(thisId, state) {
    let {
        active_chess_box_id,
        active_chess_player,
        active_chess_obj,
        chess_obj,
        castling,
        king_location,
        } = state;

    let previousBox = active_chess_box_id;
    let nextBox = thisId;

    let chessPieceMoved = active_chess_obj[nextBox];
    let chessPieceOriginalBox = active_chess_obj[previousBox];

    let hasPossibleMove = getClassListIncludes(nextBox, "possible-move");
    let hasPossibleTarget = getClassListIncludes(nextBox, "possible-target");
    let hasCastling = getClassListIncludes(nextBox, "castling");
    
    // Check selected box id if it contains possible-move class;
    if (!(hasPossibleMove | hasPossibleTarget | hasCastling )){ return };

    // console.log(chessPieceOriginalBox.piece.kingdom 
    //             + " " + chessPieceOriginalBox.piece.position
    //             + " " + previousBox + " to "+ nextBox);

    // Pre-checking if kings move is illegal, or checkmate
    CheckAreaIfChecked(previousBox, nextBox, state)

    // update state.chess_obj and HTML DOM
    chessPieceMoved.piece = chessPieceOriginalBox.piece;
    chessPieceOriginalBox.piece = null;
    setInnerImg(previousBox, "")
    setInnerImg(nextBox, chessPieceMoved.piece.img)

    // if king was moved, and castled, move rook also
    Castling(chessPieceMoved, hasCastling, state)

    // for En Passant : Check all rules, and update status
    EnPassant(state, chessPieceMoved, chessPieceOriginalBox);
    UpdateEnPassantState(state, chessPieceMoved, chessPieceOriginalBox);

    // pawn promotion
    PawnPromotion(nextBox, chessPieceMoved, active_chess_player)
    
    // Update History, Player, remove styles in chess boxes
    chess_obj.push(JSON.parse(JSON.stringify(active_chess_obj)));
    ToggleActivePlayer(state);
    RemoveClassesOfMovesOrTargetsSquares() ;   
        
    // update states
    state.chess_obj = chess_obj;

    // For Castling, if king was moved. Set state of castling of kingdom to null
    if (chessPieceMoved.piece.position == "king" ){
        castling[chessPieceMoved.piece.kingdom] = null;
        // update king's location
        king_location[chessPieceMoved.piece.kingdom] = nextBox;
    }

    // For Castling, if rook was moved. Set state what side to nullify
    if (chessPieceMoved.piece.position == "rook" ){
        if (castling[chessPieceMoved.piece.kingdom] != null) {
            let side = chessPieceOriginalBox.colLetter == "h" ? "king_side" : "queen_side";
            // console.log(chessPieceOriginalBox.colLetter)
            castling[chessPieceMoved.piece.kingdom][side].rook.status = true;
        // console.log(castling);
        }
    }

    state.castling = castling;
    state.king_location = king_location;

    // Post-Check if enemy kingdom's king was checked 
    CheckIfChecked(state,  UndoMove)  
};



// Undo the moves in chess
export const UndoMove = function(state){
    let {
        active_chess_obj,
        chess_obj
        } = state;
    // Disables undo button if game history length is 1 or less
    if (state.chess_obj.length <=1) {return}
    // Deep copy
    active_chess_obj = JSON.parse(JSON.stringify(
                            chess_obj[chess_obj.length - 2]));

    // remove last element of chess_obj array
    chess_obj.pop();

    // remove classes of boxes, Redraw HTML, change player
    RemoveClassesOfMovesOrTargetsSquares()
    RedrawChessPieces(active_chess_obj);
    ToggleActivePlayer(state);

    // update states
    state.active_chess_obj = active_chess_obj;
    state.chess_obj = chess_obj;

    // Locate king's location and check if checked
    findKing(state);
    CheckIfChecked(state, null);
};



// Finds the king location in chess map
const findKing = function (state) {
    let {
        active_chess_obj,
        } = state;
    
    Object.keys(active_chess_obj).forEach(value => {
        let result = active_chess_obj[value];
        if (result.piece){
            if (result.piece.position == "king"){
                state.king_location[result.piece.kingdom] = result.colLetter +
                                                            result.rowNumber;
            };
        };
    });
};
