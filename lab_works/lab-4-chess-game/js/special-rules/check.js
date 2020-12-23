
import PawnMoves from '../chess-pieces/pawn.js';
import KnightMoves from '../chess-pieces/knight.js';
import RookMoves from '../chess-pieces/rook.js';
import BishopMoves from '../chess-pieces/bishop.js';
import QueenMoves from '../chess-pieces/queen.js';
import KingMoves from '../chess-pieces/king.js';


const scanCheckers = function(possibleTargets, active_chess_obj,
                              positionString ) {
    if (possibleTargets.length > 0){
        let result = [];
        possibleTargets.forEach( value => {
            if (active_chess_obj[value].piece.position == positionString){
                result.push(active_chess_obj[value]);
            } 
        });
        return result.length > 0 ? result : null ;
    } else {
        return null;
    };
};

const getCheckers = function(locationId, active_chess_obj, state) {
    let {
        pawn_double_step_status,
        letters,
        } = state;

    let chessObjBox = active_chess_obj[locationId];
    // console.log("King Location Details: ", chessObjBox);

    let queenMoves = QueenMoves(chessObjBox, active_chess_obj, letters);
    let rookMoves = RookMoves(chessObjBox, active_chess_obj, letters);
    let bishopMoves = BishopMoves(chessObjBox, active_chess_obj, letters);
    let knightMoves = KnightMoves(chessObjBox, active_chess_obj, letters);
    let kingMoves = KingMoves(chessObjBox, active_chess_obj, letters);
    let pawnMoves = PawnMoves(chessObjBox, active_chess_obj,
                                pawn_double_step_status, letters)

    //Search the pressence of enemy piece with its move, if true, check is true,
    // find multiple check also,
    // get the possibe checkers
    let queenCheck = scanCheckers(queenMoves.possibleTargets,
                                active_chess_obj,'queen')
    let rookCheck = scanCheckers(rookMoves.possibleTargets,
                                active_chess_obj,'rook')
    let bishopCheck = scanCheckers(bishopMoves.possibleTargets,
                                active_chess_obj,'bishop')
    let knightCheck = scanCheckers(knightMoves.possibleTargets,
                                active_chess_obj,'knight')
    let kingCheck = scanCheckers(kingMoves.possibleTargets,
                                active_chess_obj,'king')
    let pawnCheck = scanCheckers(pawnMoves.possibleTargets,
                                active_chess_obj,'pawn')
        
    let checkers = [
                queenCheck,
                rookCheck,
                bishopCheck,
                knightCheck,
                kingCheck,
                pawnCheck,
            ].filter(Boolean);

    checkers = [].concat.apply([], checkers);

    return checkers
};

export const CheckIfChecked = function (state , UndoMove) {
    let kingdoms = ["white", "black"];

    let {
        active_chess_player,
        active_chess_obj, 
        king_location
        } = state;

    kingdoms.forEach( kingdom => {

        let kingChecked = document.getElementsByClassName("checked-"+kingdom)

        Object.keys(kingChecked).forEach(value => {
            kingChecked[0].classList.remove("checked-"+kingdom); 
        });

        // console.log(kingdom)
        let checkers = getCheckers(king_location[kingdom],
                                   active_chess_obj, state);
        
        if (checkers.length > 0) { 
            state.checked[kingdom] = checkers;
            
            document.getElementById(king_location[kingdom]).
                classList.add("checked-"+kingdom)
        } else {
            state.checked[kingdom] = null;
            let kingChecked = document.getElementsByClassName("checked-"+kingdom)

            Object.keys(kingChecked).forEach(value => {
                kingChecked[0].classList.remove("checked-"+kingdom); 
            });
        } 

    });

    if (Boolean(state.checked.white) | Boolean(state.checked.black)) {
        console.log("Checkers!",state.checked);
    };
    let currentCheckedKingdom = Boolean(state.checked.white) ? "white" : 
                                Boolean(state.checked.white) ? "black" : null;

    if (currentCheckedKingdom != null & UndoMove != null) {
        if (currentCheckedKingdom != active_chess_player) {
            console.log("Last move was illegal! King is being checked.")
            UndoMove(state);
        }
    }
    
};

export const CheckAreaIfChecked = function(previousBoxId,
                                           nextBoxId,
                                           state){
    let {
        active_chess_player,
        active_chess_obj, 
        letters,
        } = state;
    
    if (active_chess_obj[previousBoxId].piece.position == "king" ){
        let kingMoves = KingMoves(active_chess_obj[previousBoxId],
                                active_chess_obj, letters);
        let possibleMoves = kingMoves.possibleMoves.
                                concat(kingMoves.possibleTargets);
        // Deep copy
        let chessObjSimulation = JSON.parse(JSON.stringify(active_chess_obj));
        // console.log(kingMoves);

        let result = {};
        possibleMoves.forEach(value => {
            chessObjSimulation[value].piece = 
                active_chess_obj[previousBoxId].piece;
            result[value] = getCheckers(value, chessObjSimulation, state);
        });

        // Sort save from dangerous
        let safe = [];
        let dangerous = [];
        Object.keys(result).forEach(key => {
            result[key].length > 0 ? dangerous.push(key) : safe.push(key);
        });
        
        // number of safe moves == 0, checkmate
        if (safe.length == 0){

            state.checkmate[active_chess_player] = true;
            active_chess_player == "white" ? state.winner = "black" :
                                         state.winner = "white";
            console.log("Checkmate", state.checkmate[active_chess_player]);
            console.log("Winner", state.winner);

        } else {

            if (dangerous.includes(nextBoxId)) {
                //undo an return
                // console.log("King move was illegal! King is still checked.");
                return
            };
        };
    };
};
