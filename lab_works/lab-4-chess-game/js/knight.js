
import {removeOutOfBoundsPossibleMoves } from './utils.js'; 

const KnightMoves= (chessObjBox, chessObj, letters) => {
    
    let {rowNumber, colNumber, colLetter, piece} = chessObjBox;
    
    // possible moves
    const scanPoints = [[2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2], [1, 2]];
    // Convert to chess alpha numeric coordinates
    let scanPointsAlphaNum = removeOutOfBoundsPossibleMoves(scanPoints,
                                                            rowNumber,
                                                            colNumber,
                                                            letters)

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

export default KnightMoves;