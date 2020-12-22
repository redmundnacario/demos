
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

export const CheckIfChecked = function (state) {
    // let chessPeices = ["queen", "bishop","rook","knight","pawn","king"];
    let {
        king_location ,
        active_chess_obj, 
        active_chess_player,
        pawn_double_step_status,
        letters,
        } = state;

    let chessObjBox = active_chess_obj[king_location[active_chess_player]];
    // console.log("King Location Details: ", chessObjBox);

    let queenMoves = QueenMoves(chessObjBox, active_chess_obj, letters);
    let rookMoves = RookMoves(chessObjBox, active_chess_obj, letters);
    let bishopMoves = BishopMoves(chessObjBox, active_chess_obj, letters);
    let knightMoves = KnightMoves(chessObjBox, active_chess_obj, letters);
    let kingMoves = KingMoves(chessObjBox, active_chess_obj, letters);
    let pawnMoves = PawnMoves(chessObjBox, active_chess_obj, pawn_double_step_status, letters)

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

    console.log("Checked",active_chess_player, checkers);
    
};

