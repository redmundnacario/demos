import PawnMoves from './chess-pieces/pawn.js';
import KnightMoves from './chess-pieces/knight.js';
import RookMoves from './chess-pieces/rook.js';
import BishopMoves from './chess-pieces/bishop.js';
import QueenMoves from './chess-pieces/queen.js';
import KingMoves from './chess-pieces/king.js';

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