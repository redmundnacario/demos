import { RookMoves } from './rook.js';
import { BishopMoves } from './bishop.js';

export const QueenMoves = (chessObjBox, chessObj, letters) => {
    // console.log("queen", chessObjBox);
    //combine bishop and rook moves
    const bishopMoves = BishopMoves(chessObjBox, chessObj, letters);
    const rookMoves = RookMoves(chessObjBox, chessObj, letters);

    let possibleMoves = bishopMoves.possibleMoves.
                            concat(rookMoves.possibleMoves)
    let possibleTargets = bishopMoves.possibleTargets.
                        concat(rookMoves.possibleTargets)

    return { possibleMoves, possibleTargets }
};