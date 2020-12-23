import { 
        RedrawChessPieces,
        AddClassesOfMovesOrTargetsSquares,
        RemoveClassesOfMovesOrTargetsSquares
        } from './draw.js';
import GetPossibleMoves from "./moves.js";
import { ToggleActivePlayer } from './active-player.js';
import { EnPassant, UpdateEnPassantState } from './special-rules/en-passant.js';
import { CheckIfChecked, CheckAreaIfChecked } from './special-rules/check.js';

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
    // remove classes: selected, possible moves, possible target
    RemoveClassesOfMovesOrTargetsSquares()
    // Redraw all chess pieces based on history
    RedrawChessPieces(active_chess_obj);
    // Change the active player
    ToggleActivePlayer(state);

    // update states
    state.active_chess_obj = active_chess_obj;
    state.chess_obj = chess_obj;

    findKing(state);
    CheckIfChecked(state);
    state.king_move = "legal";
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
// returns bool
const getClassListIncludes = function(ElementId, className){
    return document.getElementById(ElementId).classList.value.includes(className);
};

// set innerHTML
const setInnerHtml = function(ElementId, InputString){
    document.getElementById(ElementId).children[0].innerHTML = InputString;
};

// Triggers when a move was done and updates all dynamic state values 
export const PossibleMoveSelected = function(thisId, state) {
    let {
        active_chess_box_id,
        active_chess_obj,
        active_chess_player,
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
    
    // Check selected box id if it contains possible-move class;
    if (!(hasPossibleMove | hasPossibleTarget )){ return };

    console.log(chessPieceOriginalBox.piece.kingdom 
                + " " + chessPieceOriginalBox.piece.position
                + " " + previousBox + " to "+ nextBox);

    // Pre-checking if sorrounding area of a king is illegal
    // console.log(chessPieceMoved)
    if (chessPieceOriginalBox.piece.position == "king" ){
        // console.log(chessPieceOriginalBox, chessPieceMoved)
        CheckAreaIfChecked(previousBox,
                           nextBox,
                           state)
        if (state.king_move == "illegal"){
            UndoMove(state);
            return
        }
        
    }

    // update state.chess_obj -Swapping pieces to null and vice versa
    chessPieceMoved.piece = chessPieceOriginalBox.piece;
    chessPieceOriginalBox.piece = null;

    // Redraw the chess pieces in the DOM
    setInnerHtml(previousBox, "")
    setInnerHtml(nextBox, chessPieceMoved.piece.htmlcode)

    //

    // for En Passant : Check all rules, if all positive, pawn can do en passant
    EnPassant(state, chessPieceMoved, chessPieceOriginalBox);
    // for En Passant : Update status, fires if pawn was moved by double step
    UpdateEnPassantState(state, chessPieceMoved, chessPieceOriginalBox);
    
    // Update History
    chess_obj.push(JSON.parse(JSON.stringify(active_chess_obj)));
    // Update Player
    ToggleActivePlayer(state);
    // remove styles of possible moves, targets, and selected piece
    RemoveClassesOfMovesOrTargetsSquares() ;   
        
    // update states
    state.chess_obj = chess_obj;

    // For Castling, if king was moved. Set state of castling of kingdom to null
    if (chessPieceMoved.piece.position == "king" ){
        castling[chessPieceMoved.piece.kingdom] = null;
        console.log("King moved...");
        // console.log(castling);  

        // update king's location
        king_location[chessPieceMoved.piece.kingdom] = nextBox;
    }

    state.castling = castling;
    state.king_location = king_location;

    // console.log(state.king_location)
    // Post-Check if enemy kingdom's king was checked 
    // note that toggle active player was called before
    CheckIfChecked(state)
    
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
        // remove previous styles with class selected, possible moves/targets
        RemoveClassesOfMovesOrTargetsSquares();
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
    };
    // update states
    state.active_chess_box_id = active_chess_box_id;
};