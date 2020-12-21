import PawnMoves from './pawn.js';
import KnightMoves from './knight.js';
import RookMoves from './rook.js';
import { 
         range, 
         removeOutOfBoundsPossibleMoves,
         filterPossibleMoves,
         splitPossibleMoves
        } 
        from './utils.js'; 


const BishopMoves= (chessObjBox, chessObj, letters) => {
    let {rowNumber, colNumber, colLetter, piece} = chessObjBox;
    console.log("bishop", chessObjBox);
    
    // scan moves
    let scanXpoints = range(-8, 9, 1);
    let slopeM = [1, -1]
    // y = mx
    let scanPositiveDiagonal = scanXpoints.map(value => [value, slopeM[0] * value ])
    let scanNegativeDiagonal = scanXpoints.map(value => [value, slopeM[1] * value])
    console.log(scanPositiveDiagonal)
    console.log(scanNegativeDiagonal)
    // convert to alpha-numeric and filter moves
    scanPositiveDiagonal= removeOutOfBoundsPossibleMoves(scanPositiveDiagonal,
                                                            rowNumber,
                                                            colNumber,
                                                            letters);

    scanNegativeDiagonal = removeOutOfBoundsPossibleMoves(scanNegativeDiagonal,
                                                            rowNumber,
                                                            colNumber,
                                                            letters);

    let arrayX = splitPossibleMoves(scanPositiveDiagonal, chessObjBox)
    let arrayX1 = filterPossibleMoves(arrayX[0], chessObj, chessObjBox);
    let arrayX2 = filterPossibleMoves(arrayX[1], chessObj, chessObjBox);

    let arrayY  = splitPossibleMoves(scanNegativeDiagonal, chessObjBox) 
    let arrayY1 = filterPossibleMoves(arrayY[0], chessObj, chessObjBox);
    let arrayY2 = filterPossibleMoves(arrayY[1] , chessObj, chessObjBox);

    let possibleMoves = arrayX1.possibleMoves.
                        concat(arrayX2.possibleMoves).
                        concat(arrayY1.possibleMoves).
                        concat(arrayY2.possibleMoves)

    let possibleTargets = arrayX1.possibleTargets.
                        concat(arrayX2.possibleTargets).
                        concat(arrayY1.possibleTargets).
                        concat(arrayY2.possibleTargets)

    // console.log(scanPositiveDiagonal)
    // console.log(scanNegativeDiagonal)

    console.log(possibleMoves)
    console.log(possibleTargets)
    return { possibleMoves, possibleTargets}
};

const QueenMoves= (chessObjBox, chessObj, letters) => {
    console.log("queen", chessObjBox);
};

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