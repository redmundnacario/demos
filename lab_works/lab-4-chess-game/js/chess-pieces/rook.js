
import { 
    range, 
    removeOutOfBoundsPossibleMoves,
    filterPossibleMoves,
    splitPossibleMoves
   } 
   from './utils.js'; 

const RookMoves= (chessObjBox, chessObj, letters,
                  rangeStart = -8, rangeStop = 9, rangeInterval = 1) => {

    let {rowNumber, colNumber, colLetter, piece} = chessObjBox;

    // console.log("rook", chessObjBox);
    
    // scan possible moves
    // horizontal: y = 0
    let scanXpoints = range( rangeStart, rangeStop, rangeInterval );
    let scanPointsHorizontal = scanXpoints.map(value => [value, 0])

    // vertical : x = 0
    let scanYpoints = range( rangeStart, rangeStop, rangeInterval );
    let scanPointsVertical = scanYpoints.map(value => [0, value])


    // Convert to alpha numeric chess coordinates
    // filter out of bounds
    let scanPointsAlphaNumX = removeOutOfBoundsPossibleMoves(
                                    scanPointsHorizontal,
                                    rowNumber,
                                    colNumber,
                                    letters);

    let scanPointsAlphaNumY = removeOutOfBoundsPossibleMoves(
                                    scanPointsVertical,
                                    rowNumber,
                                    colNumber,
                                    letters);

    // console.log(scanPointsAlphaNumX)
    // console.log(scanPointsAlphaNumY)
                                                        
    // Split possible moves by current selected piece 
    // (left or right direction)
    // or (up and down direction)                                                       
    let arrayX = splitPossibleMoves(scanPointsAlphaNumX, chessObjBox)
    let arrayX1 = filterPossibleMoves(arrayX[0], chessObj, chessObjBox);
    let arrayX2 = filterPossibleMoves(arrayX[1], chessObj, chessObjBox);
    
    // Split possible moves by current selecte piece 
    // (left or right direction)
    // or (up and down direction) 
    let arrayY  = splitPossibleMoves(scanPointsAlphaNumY, chessObjBox) 
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
    // console.log(possibleMoves)
    // console.log(possibleTargets)
    return { possibleMoves, possibleTargets}
};

export default RookMoves;