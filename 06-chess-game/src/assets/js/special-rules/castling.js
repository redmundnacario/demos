import { CheckIfChecked, getCheckers } from './check.js';
import { getClassListIncludes, setInnerImg} from '../utils.js';

//components
import { toggleAlert } from '../components/alert.js';

/*
Perform castling when king is moved and hasCastling class exist;
*/ 
export const Castling = function(chessPieceMoved, hasCastling, state) {
    let {
        active_chess_obj,
        active_chess_player
        } = state;
    if (chessPieceMoved.piece.position == "king" & hasCastling){
        console.log("Castling!");
        let rowRook = active_chess_player == "white" ? "1" : "8";
        // console.log(chessPieceMoved.colLetter);
        if (chessPieceMoved.colLetter == "g") {
            let rookId = "h" + rowRook;
            // update state.chess_obj -Swapping pieces to null and vice versa
            active_chess_obj["f"+rowRook].piece=active_chess_obj[rookId].piece;
            active_chess_obj[rookId].piece = null;
            // Redraw the chess pieces in the DOM
            setInnerImg(rookId, "");
            setInnerImg("f"+rowRook, active_chess_obj["f"+rowRook].piece.img);

        } else {
            let rookId = "a" + rowRook;
            // update state.chess_obj -Swapping pieces to null and vice versa
            active_chess_obj["d"+rowRook].piece=active_chess_obj[rookId].piece;
            active_chess_obj[rookId].piece = null;
            // Redraw the chess pieces in the DOM
            setInnerImg(rookId, "");
            setInnerImg("d"+rowRook, active_chess_obj["d"+rowRook].piece.img);
        };
        toggleAlert("Castling!")
    };
};



export const CheckCastling = function (state) {
    let {
        active_chess_box_id,
        active_chess_player,
        active_chess_obj,
        castling,
        checked
        } = state;

    if (active_chess_obj[active_chess_box_id].piece.position == "king"){
        // console.log("king")
        if(castling[active_chess_player] != null){
            // Rule 2 check if king is being checked in its location.
            CheckIfChecked(state,  null)
            
            if (checked[active_chess_player] == null){
                // Passed rule 2
                let { 
                    king_side,
                    queen_side,
                    } = castling[active_chess_player];

                checkKingQueenSide(king_side, active_chess_obj, state)
                checkKingQueenSide(queen_side, active_chess_obj, state)
            };
        };
    };
    // console.log(state.castling)
    // console.log(active_chess_obj)
};

// Checks kingside / queenside for Rule 3, 4 and 5
const checkKingQueenSide = function(side, active_chess_obj, state){
    if (side.rook.status == false) {

        checkEmptyBoxes(side.space_empty,
                        active_chess_obj);

        if (side.space_empty.status == true) {

            checkIfBoxesBeingChecked(side, state);

            if (side.space_attacked.status == false) {
                document.getElementById(side.king_move).
                    classList.add("castling")
            };
        };
    };
};

// RULE 4 - check the space between the rook and king
const checkEmptyBoxes = function(space_empty , active_chess_obj) {
    let result = [];
    space_empty.location.forEach(value => {
        if (active_chess_obj[value].piece){
            // occupied
            result.push(false);
        } else {
            result.push(true);
        };
    });
    // reverse to convert false to true.
    space_empty.status = result[0] & result[1];
};

// RULE 5 - Terminal boxes must not be currentyl within range of eme,y
const checkIfBoxesBeingChecked = function(side, state){
    let {
        active_chess_obj,
        king_location,
        active_chess_player
        } = state;
    let locationIds = side.space_attacked.location;
    
    // Deep copy
    let chessObjSimulation = JSON.parse(JSON.stringify(active_chess_obj));

    let kingPiece = active_chess_obj[king_location[active_chess_player]].piece;
    // console.log(kingPiece)
    chessObjSimulation[locationIds[0]].piece = kingPiece;
    chessObjSimulation[locationIds[1]].piece = kingPiece;

    let checkers = [];
    locationIds.forEach(value => {
        checkers.push(getCheckers(value, chessObjSimulation, state))
    })

    checkers = [].concat.apply([], checkers);
    // console.log(checkers)
    side.space_attacked.status = checkers.length > 0 ? true : false
}