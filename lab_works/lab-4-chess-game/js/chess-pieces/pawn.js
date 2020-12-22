
const PawnMoves = function(chessObjBox, chessObj,
                           pawnDoubleStepStatus, letters) {
    let rowNumbersPMoves = [];
    let {rowNumber, colNumber, colLetter, piece} = chessObjBox;
    // console.log(piece, rowNumber)
    if (piece.kingdom == "white") {
        if(rowNumber == 2){
            for (let i = rowNumber + 1; i < rowNumber + 3; i++) { rowNumbersPMoves.push(i); };
        } else {
            for (let i = rowNumber + 1; i < rowNumber + 2; i++) { rowNumbersPMoves.push(i); };
        };
    } else {
        // console.log(piece, rowNumber)
        if(rowNumber == 7){
            for (let i = rowNumber - 1; i > rowNumber - 3; i--) { rowNumbersPMoves.push(i); };
        } else {
            for (let i = rowNumber - 1; i > rowNumber - 2; i--) { rowNumbersPMoves.push(i); };
        };
    };

    // check square if within row boundaries
    rowNumbersPMoves = rowNumbersPMoves.filter((value) => {return value <= 8 });
    // convert to alpha numeric chess coordinates
    rowNumbersPMoves = rowNumbersPMoves.map((value) => colLetter + value);
    
    // Check squares in front if occupied by a chess piece, meaning the move is blocked
    let passable = true;
    rowNumbersPMoves = rowNumbersPMoves .map(value => {
          
        if(chessObj[value].piece == null & passable == true){
            return value;
        }else{
            passable = false;
            return null;
        }; 
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
        return [value[0] + colNumber, value[1] + rowNumber];
    });

    // filter the possible targets, should not be behind the pawn
    rawPossibleTargets = rawPossibleTargets.map(value => {
        if(piece.kingdom == "white"){
            if (value[1] > rowNumber){
                return letters[value[0] - 1] + value[1];
            } else {
                return null;
            };

        } else {
            if (value[1] < rowNumber){
                return letters[value[0] - 1] + value[1];
            } else {
                return null;
            };
        };
    }).filter(Boolean);

    // check if there are chess piece in possible target squares
    rawPossibleTargets = rawPossibleTargets.map(value => {
        if (chessObj[value].piece != null){
            // Check if the target chess piece is ally , else return null
            if (chessObj[value].piece.kingdom == piece.kingdom){
                return null;
            } else {
                return value;
            };
        } else {
            // if enpassant rule 1 passed
            if (pawnDoubleStepStatus) {
                // En passant rule 2: if possible target has same column with target squares
                if(pawnDoubleStepStatus.colNumber - (letters.indexOf(value[0]) + 1) == 0) {
                    // En passant rule 3: if possible target has same row with the selected/active pawn
                    if(pawnDoubleStepStatus.rowNumber - rowNumber == 0){
                        // Check if the target chess piece is ally , else return null
                        if (pawnDoubleStepStatus.piece.kingdom == piece.kingdom){
                            return null;
                        } else {
                            return value;
                        };
                    } else {
                        return null;
                    };
                } else {
                    return null;
                };
            } else {
                return null;
            };
        };
    }).filter(Boolean);

    return {possibleMoves : rowNumbersPMoves, possibleTargets: rawPossibleTargets}
}

export default PawnMoves;