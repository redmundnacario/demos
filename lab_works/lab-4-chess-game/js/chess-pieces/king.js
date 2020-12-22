import RookMoves from './rook.js';
import BishopMoves from './bishop.js';

const KingMoves= (chessObjBox, chessObj, letters) => {
    console.log("king", chessObjBox);

    const bishopMoves = BishopMoves(chessObjBox, chessObj, letters,
                                    -1, 2);
    const rookMoves = RookMoves(chessObjBox, chessObj, letters,
                                -1, 2);

    let possibleMoves = bishopMoves.possibleMoves.
                            concat(rookMoves.possibleMoves)
    let possibleTargets = bishopMoves.possibleTargets.
                        concat(rookMoves.possibleTargets)

    return { possibleMoves, possibleTargets }
};

export default KingMoves;

/*
Conditions for Castling
1.The castling must be kingside or queenside.
2.Neither the king nor the chosen rook has previously moved.
3.There are no pieces between the king and the chosen rook.
4.The king is not currently in check.
5.The king does not pass through a square that is attacked by an enemy piece.
6.The king does not end up in check. (True of any legal move.)
*/