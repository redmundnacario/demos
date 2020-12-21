let LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const PawnMoves = function(chessObjBox, chessObj, pawnDoubleStepStatus) {
    let rowNumbersPMoves = []
    let {rowNumber, colNumber, colLetter, piece} = chessObjBox
    // console.log(piece, rowNumber)
    if (piece.kingdom == "white") {
        if(rowNumber == 2){
            for (let i = rowNumber + 1; i < rowNumber + 3; i++) { rowNumbersPMoves.push(i); };
        } else {
            for (let i = rowNumber + 1; i < rowNumber + 2; i++) { rowNumbersPMoves.push(i); };
        }
    } else {
        // console.log(piece, rowNumber)
        if(rowNumber == 7){
            for (let i = rowNumber - 1; i > rowNumber - 3; i--) { rowNumbersPMoves.push(i); };
        } else {
            for (let i = rowNumber - 1; i > rowNumber - 2; i--) { rowNumbersPMoves.push(i); };
        }
    }

    // Check squares in front if occupied by a chess piece, meaning the move is blocked

    rowNumbersPMoves = rowNumbersPMoves.filter((value) => {return value <= 8 } )
    rowNumbersPMoves = rowNumbersPMoves.map((value) => colLetter + value)
    
    rowNumbersPMoves = rowNumbersPMoves .map(value => {
        console.log(chessObj[value].piece)    
        if(chessObj[value].piece == null){
            return value;
        }; 
        return null;
    }).filter(Boolean);

    // scan for possible targets, used y = mx + b
    // assume selected chess piece is the origin or 0... then b is 0, use y = mx instead
    const scanXPoints = [1, -1];
    const slopeM = [1,-1];

    let rawPossibleTargets = [];
    
    for(let slope in slopeM){
        for(let scanX in scanXPoints){
            let y = slopeM[slope] * scanXPoints[scanX];
            rawPossibleTargets.push([scanXPoints[scanX], y ]);
        }
    }

    // convert to chess coordinates
    rawPossibleTargets = rawPossibleTargets.map(value => {
        return [value[0] + colNumber, value[1] + rowNumber]
    });

    // filter the possible targets, should not be behind the pawn
    rawPossibleTargets = rawPossibleTargets.map(value => {
        if(piece.kingdom == "white"){
            if (value[1] > rowNumber){
                return LETTERS[value[0] - 1] + value[1]
            } else {
                return null;
            };

        } else {
            if (value[1] < rowNumber){
                return LETTERS[value[0] - 1] + value[1]
            } else {
                return null;
            };
        };
    }).filter(Boolean);

    // check if there are chess piece in possible targets
    rawPossibleTargets = rawPossibleTargets.map(value => {
        if (chessObj[value].piece != null){
            return value
        } else {
            if (pawnDoubleStepStatus) {
                if(pawnDoubleStepStatus.colNumber - (LETTERS.indexOf(value[0]) + 1) == 0) {
                    if(pawnDoubleStepStatus.rowNumber - rowNumber == 0){
                        return value
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            } else {
                return null
            }
        }
    }).filter(Boolean);

    // en passsant


    // filter out of bounds in map

    console.log(colNumber, rowNumber)
    console.log(rawPossibleTargets)
    console.log(rowNumbersPMoves)

    return {possibleMoves : rowNumbersPMoves, possibleTargets: rawPossibleTargets}
}

const GetPossibleMoves = function (chessObjBox, chessObj, pawnDoubleStepStatus) {
    // console.log(piece.position);

    switch (chessObjBox.piece.position) {
        case "pawn":
            return PawnMoves(chessObjBox, chessObj, pawnDoubleStepStatus)
        default:
            return null
    }
}

export default GetPossibleMoves;