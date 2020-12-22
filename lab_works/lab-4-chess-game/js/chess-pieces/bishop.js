import { 
    range, 
    removeOutOfBoundsPossibleMoves,
    filterPossibleMoves,
    splitPossibleMoves
   } 
   from './utils.js'; 

const BishopMoves= (chessObjBox, chessObj, letters,
                    rangeStart = -8, rangeStop = 9, rangeInterval = 1) => {
    let {rowNumber, colNumber, colLetter, piece} = chessObjBox;
    // console.log("bishop", chessObjBox);
    
    // scan moves
    let scanXpoints = range(rangeStart, rangeStop, rangeInterval);
    let slopeM = [1, -1]
    // y = mx .. get y values
    let scanPositiveDiagonal = scanXpoints.map(value => 
                                    [value, slopeM[0] * value ])
    let scanNegativeDiagonal = scanXpoints.map(value => 
                                    [value, slopeM[1] * value])
    
    // convert to alpha-numeric and filter moves
    scanPositiveDiagonal= removeOutOfBoundsPossibleMoves(scanPositiveDiagonal,
                                                            rowNumber,
                                                            colNumber,
                                                            letters);

    scanNegativeDiagonal = removeOutOfBoundsPossibleMoves(scanNegativeDiagonal,
                                                            rowNumber,
                                                            colNumber,
                                                            letters);
    
    // Split possible moves by current selected piece 
    // (left or right direction)
    // or (up and down direction) 
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

    // console.log(possibleMoves)
    // console.log(possibleTargets)
    return { possibleMoves, possibleTargets}
};

export default BishopMoves;