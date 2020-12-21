import PawnMoves from './pawn.js';
import KnightMoves from './knight.js';
import RookMoves from './rook.js';
import BishopMoves from './bishop.js';
import QueenMoves from './queen.js';

import { 
         range, 
         removeOutOfBoundsPossibleMoves,
         filterPossibleMoves,
         splitPossibleMoves
        } 
        from './utils.js'; 

const KingMoves= (chessObjBox, chessObj, letters) => {
    console.log("king", chessObjBox);
};

const GetPossibleMoves = function (chessObjBox, chessObj, pawnDoubleStepStatus , letters) {
    // console.log(piece.position);

    switch (chessObjBox.piece.position) {
        case "pawn":
            return PawnMoves(chessObjBox, chessObj, pawnDoubleStepStatus, letters);
        case "knight":
            return KnightMoves(chessObjBox, chessObj, letters);
        case "rook":
            return RookMoves(chessObjBox, chessObj, letters);
        case "bishop":
            return BishopMoves(chessObjBox, chessObj, letters);
        case "queen":
            return QueenMoves(chessObjBox, chessObj, letters);
        case "king":
            return KingMoves(chessObjBox, chessObj, letters);
        default:
            return null;
    }
}

export default GetPossibleMoves;