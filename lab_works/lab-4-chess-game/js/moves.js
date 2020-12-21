import PawnMoves from './pawn.js';
const KnightMoves= (chessObjBox, chessObj, letters) => {
    console.log("knight", chessObjBox);
    let {rowNumber, colNumber, colLetter, piece} = chessObjBox;
    console.log(rowNumber,colNumber)
    // possible moves
    const scanPoints = [[2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2], [1, 2]];
    // Convert to chess alpha numeric coordinates
    let scanPointsAlphaNum = scanPoints.map(value => {
        // Y to abc, X to 123
        value = letters[(value[1]  + colNumber) - 1] + (value[0] + rowNumber);
        // filter out of bounds
        if (value[1] < 8 & value[1] > 0){
            return value;
        }
        return null;
    }).filter(Boolean);
    console.log(scanPointsAlphaNum)

    let possibleMoves = [];
    let possibleTargets = [];

    // classify to possible moves or targets
    scanPointsAlphaNum.forEach(value => {
        if (chessObj[value].piece == null){
            possibleMoves.push(value)
        } else {
            if (chessObj[value].piece.kingdom != piece.kingdom) {
                possibleTargets.push(value)
            }
        }
    });

    return { possibleMoves, possibleTargets}
};

const RookMoves= (chessObjBox, chessObj, letters) => {
    console.log("rook", chessObjBox);
    // scan possible moves
    // set target and set unpassable behind target

    // filter out of bounds

    // filter chess targets which are allies
};
const BishopMoves= (chessObjBox, chessObj, letters) => {
    console.log("bishop", chessObjBox);
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