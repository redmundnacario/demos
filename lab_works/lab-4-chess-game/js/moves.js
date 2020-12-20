
const PawnMoves = function(chessObjBox) {
    let rowNumbers = []
    let {rowNumber, colNumber, colLetter, piece} = chessObjBox
    // console.log(piece, rowNumber)
    if (piece.kingdom == "white") {
        if(rowNumber == 2){
            for (let i = rowNumber + 1; i < rowNumber + 3; i++) { rowNumbers.push(i); };
        } else {
            for (let i = rowNumber + 1; i < rowNumber + 2; i++) { rowNumbers.push(i); };
        }
    } else {
        // console.log(piece, rowNumber)
        if(rowNumber == 7){
            for (let i = rowNumber - 1; i > rowNumber - 3; i--) { rowNumbers.push(i); };
        } else {
            for (let i = rowNumber - 1; i > rowNumber - 2; i--) { rowNumbers.push(i); };
        }
    }
    rowNumbers = rowNumbers.filter((value) => {return value <= 8 } )
    return rowNumbers.map((value) => colLetter + value)
}

const GetPossibleMoves = function (chessObjBox) {
    // console.log(piece.position);

    switch (chessObjBox.piece.position) {
        case "pawn":
            return PawnMoves(chessObjBox)
        default:
            return null
    }
}

export default GetPossibleMoves;