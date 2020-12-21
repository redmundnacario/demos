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